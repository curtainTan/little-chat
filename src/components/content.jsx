import React, { useState } from "react"
import { Layout, Button, notification, Modal, Icon } from "antd"
import { connect } from "dva"

import MyFooter from "./footer"
import MsgBox from "./msgBox"

const { Header } = Layout

function MyContent( { setShower, title, owner, userName, io, roomId } ){
    const [ vi, setVi ] = useState( false )
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
            <MsgBox />
            <MyFooter />
        </Layout>
    )
}

function mapState( state ){
    var selected = state.rooms.selected
    if( selected.joined ){
        return {
            title: state.rooms.joined[ selected.index ].name,
            owner: state.rooms.joined[ selected.index ].owner,
            userName: state.me.name,
            io: state.me.io,
            roomId: state.rooms.joined[ selected.index ].id
        }
    } else {
        return {
            title: state.rooms.noJoin[ selected.index ].name,
            owner: state.rooms.noJoin[ selected.index ].owner,
            userName: state.me.name
        }
    }
}

export default connect( mapState )(MyContent)

