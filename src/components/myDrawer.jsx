import React, { useCallback, useState, useMemo } from "react"
import { connect } from "dva"
import {Menu, Icon, Modal,Drawer,Upload, message, Input, notification, Badge, Avatar } from "antd"


function MyDrawer({ 
    noJoin, 
    joined, 
    showDrawer, 
    setShower, 
    myselected, 
    sele, 
    io, 
    name }){

    const [ visible, setVisible ] = useState( false )
    const [ loading, setLoading ] = useState( false )
    const [ headImg, setHeader ] = useState( "https://518test.curtaintan.club/formimg/1578805038170.jpg" )
    const [ qunName, setName ] = useState("")

    const uploadBtn = useMemo( () => {
        return (
            <div>
                <Icon type={ loading ? "loading" : "plus" } />
                <div>上传群头像</div>
            </div>
        )
    }, [ loading ] )

    const onCancel = useCallback(() => {
        setVisible( false )
    }, [visible] )

    // 创建房间
    const onOk = useCallback(() => {
        if( qunName === "" && headImg === "" ){
            message.warning({
                content: "请输入群昵称并上传群头像."
            })
        } else {
            io.emit( "create-room", {
                name: qunName,
                header: headImg
            })
            notification.open({
                message: "创建中，请等待..."
            })
            setHeader("")
            setName("")
            setVisible( false )
        }
    }, [qunName, headImg] )

    const changeName = useCallback(
        ( e ) => {
            setName( e.target.value )
        },
        [ qunName ],
    )

    const changePic = ( data ) => {
        if( data.file.status === "done" ){
            setLoading( false )
            setHeader( data.file.response.imgUrl )
        }
        if( data.file.status === "uploading" ){
            setLoading( true )
            return
        }
    }
    // 上传前，控制上传文件的大小
    const beforeUpload = ( file ) => {
        if( file.size < 1024 * 1024 ){
            console.log( "文件是小于1m的" )
            return true
        } else {
            message.warning({
                message: "请上传1m以下的图片...."
            })
            return false
        }
    }

    const selectHandle = useCallback( ( data ) => {
        if( data.key === "add-room" ){
            setVisible( true )
            return
        }
        var arr = data.key.split("-")
        sele({
            type: "rooms/setSelected",
            data: {
                selected: {
                    joined: arr.length === 1,
                    index: arr.length === 2 ? arr[1] : arr[0],
                    selectKey: data.key
                }
            }
        })
    }, [] )

    return (
        <Drawer
            title={ "你好！" + name } 
            placement="left"
            visible={ showDrawer }
            onClose={ () => { setShower( false ) } }
        >
            <Menu 
                theme="light" 
                mode="inline" 
                defaultSelectedKeys={[ "0" ]}
                selectedKeys={ [ myselected.selectKey ] }
                onSelect={ selectHandle  }
            >
                <Menu.SubMenu
                    key="myjoin"
                    title={
                        <span>
                            <Icon type="user" />
                            <span>我加入的群聊</span>
                        </span>
                    }
                >
                    {
                        joined.map(( item, index ) => {
                            return (
                                <Menu.Item key={ index }>
                                    {/* <Icon type="user" /> */}
                                    <Badge count={ item.msgCount } offset={ [-1, 2] } >
                                        <Avatar shape="square" src={ item.header || "https://518test.curtaintan.club/formimg/1578805038170.jpg" } />
                                    </Badge>
                                    <span>{ item.name }</span>
                                </Menu.Item>
                            )
                        })
                    }
                </Menu.SubMenu>
                <Menu.SubMenu
                    key="nojoin"
                    title={
                        <span>
                            <Icon type="message" />
                            <span>其他聊天室</span>
                        </span>
                    }
                >
                    {
                        noJoin.map(( item, index ) => {
                            return (
                                <Menu.Item key={ "n-" + index }>
                                    {/* <Icon type="user" /> */}
                                    <Avatar shape="square" src={ item.header || "https://518test.curtaintan.club/formimg/1578805038170.jpg" } />
                                    <span>{ item.name }</span>
                                </Menu.Item>
                            )
                        })
                    }
                </Menu.SubMenu>
                <Menu.Item key="add-room" >
                    <Icon type="plus" />
                    <span>创建群聊</span>
                </Menu.Item>
                <Modal title="创建房间" okText="创建" cancelText="取消" onCancel={ onCancel } onOk={ onOk } visible={ visible } >
                    <Upload
                        accept="image/*"
                        action="https://518test.curtaintan.club/liuyan/uploadImage"
                        name="header"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={ false }
                        onChange={ changePic }
                        beforeUpload={ beforeUpload }
                    >
                        { headImg ? <img alt="显示出错了" src={ headImg } /> : uploadBtn }
                    </Upload>
                    <div className="qun-name">
                        <span>房间名称：</span>
                        <Input value={ qunName } placeholder="请输入群昵称" onChange={ changeName } />
                    </div>
                </Modal>
            </Menu>
        </Drawer>
    )
}

function mapState( state ){
    return {
        joined: state.rooms.joined,
        noJoin: state.rooms.noJoin,
        myselected: state.rooms.selected,
        io: state.me.io,
        name: state.me.name
    }
}

function mapDispach( dispatch ){
    return {
        sele( data ){
            dispatch( data )
        }
    }
}

export default connect( mapState, mapDispach )(MyDrawer)

