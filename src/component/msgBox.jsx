import React, { memo, useCallback, useEffect, useRef } from "react"
import { Layout, Button, Avatar, notification } from "antd"
import { connect } from "react-redux"

const AMsg = memo(({ data, name }) => {

    return (
        <div className={ data.name === name ? "msg-item is-me" : "msg-item" }>
            <div className="msg-left">
                <Avatar src={ data.header } size="large" />
            </div>
            <div className="msg-right">
                <div className="info">
                    <div className="name">{ data.name }</div>
                    <div className="time">{ data.time }</div>
                </div>
                <div className="msg-content">
                    {
                        data.type === "img" ? <img className="msg-img" src={ data.content } alt="图片" /> : (
                            <pre>
                                { data.content }
                            </pre>
                        )
                    }
                </div>
            </div>
        </div>
    )
})

const MsgSystem = memo( ({ data }) => {
    return (
        <div className="msg-system">
            <div className="msg-system-time" >{ data.time }</div>
            <div className="msg-system-con" >{ data.msg }</div>
        </div>
    )
})

function MsgBox({ selected, roomData, userData, msg }){

    console.log( "msg的信息：--",msg )

    const box = useRef()
    useEffect( ()=> {
        box.current.scrollTop = box.current.scrollHeight
    }, [ msg ] )

    const addRoom = useCallback(() => {
        let newroomData = {
            name: roomData.name,
            owner: roomData.owner,
            id: roomData.id,
            header: roomData.header
        }
        let user = {
            name: userData.name,
            header: userData.header,
            id: userData.io.id
        }
        notification.open({
            message: "已经发出申请，请等待..."
        })
        userData.io.emit( "apply", {
            type: "apply",
            roomData: newroomData,
            userData: user
        })
    }, [selected])

    return (
        <Layout.Content >
            <div className="msg-main-box" ref={ box } >
            {
                selected.type !== "noJoin" ? 
                (
                    msg.length > 0 ? 
                    (
                        msg.map( ( item, index ) => {
                            return item.type === "system" ? 
                            <MsgSystem data={ item } key={ index } /> :
                            <AMsg data={ item } name={ userData.name } key={ index } />
                        })
                    ) : (
                        <div style={{ textAlign: "center", marker: 30 }} >暂时还没有消息</div>
                    )
                ) : (
                    <div className="no-joined-box">你还没有加入群聊...<Button type="primary" onClick={ addRoom } >申请加入群聊</Button></div>
                )
            }
            </div>
        </Layout.Content>
    )
}

function mapState( state ){

    var selected = state.roomState.get( "selected" )
    var roomData = state.roomState.getIn([ selected.type, selected.index ])
    var msg = (state.msgState.get( roomData.id ) && 
               state.msgState.get( roomData.id ).toArray()) || []

    return {
        userData: state.userState.toObject(),
        selected,
        roomData,
        msg
    }
}

export default connect( mapState )( MsgBox )

