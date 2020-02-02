import React, { useState, useEffect, Fragment } from "react"
import { Layout, Button, notification, Modal, Icon } from "antd"
import { connect } from "react-redux"
import Loadable from "react-loadable"
import Loading from "./loading"

import MyFooter from "./footer"
import MsgBox from "./msgBox"

const MeBox = Loadable({
    loader: () => import("./me"),
    loading: Loading
})

const { Header } = Layout

function MyContent( { setShower, title, owner, userName, io, roomId } ){
    const [ vi, setVi ] = useState( false )
    useEffect( () => {
        MeBox.preload()
    }, [] )
    const deleteHandle = () => {
        var time = new Date().toTimeString()
        time = time.replace( /(.*)?\sGMT(.*)/, function( a, b ){
            return b
        })
        io.emit( "delete-room", {
            roomId,
            time: time
        })
        setVi( false )
        notification.open({
            message: "删除操作中，请稍后...."
        })
    }
    return (
        <Layout>
            <Header className="content-header" >
                <div className="drawer-btn">
                    <Icon onClick={ () => { setShower( true ) } } type="unordered-list" />
                </div>
                <div className="chat-name">
                    { title }
                </div>
                <div className="clean-btn">
                    {
                        owner === userName ? <Button onClick={ () => {setVi( true )} } >删除群聊</Button> : null
                    }
                </div>
                <Modal title="提示：" visible={ vi } onCancel={ () => {setVi( false )} } onOk={ deleteHandle } >
                    <p>你确定要删除此房间吗？？</p>
                </Modal>
            </Header>
            {
                io.id === roomId ? <MeBox /> :
                <Fragment>
                    <MsgBox />
                    <MyFooter />
                </Fragment>
            }
        </Layout>
    )
}

function mapState( state ){
    var selected = state.roomState.get("selected")
    return {
        title: state.roomState.getIn([ selected.type, selected.index, "name" ]),
        owner: state.roomState.getIn([ selected.type, selected.index, "owner" ]),
        userName: state.userState.get("name"),
        io: state.userState.get("io"),
        roomId: state.roomState.getIn([ selected.type, selected.index, "id" ])
    }
}

export default connect( mapState )(MyContent)
