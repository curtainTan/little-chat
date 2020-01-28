import React, { useState, useCallback, useRef, useEffect } from "react"
import { Layout, Input, Button, Popover, notification, Icon } from "antd"
import { connect } from "dva"

import Loadable from "react-loadable"

const EmojiPick = Loadable({
    loader: () => import("./emoji"),
    loading: <div>加载中...</div>
})


function MyFooter( data ){

    const inputImg = useRef()
    const [ inputValue, setValue ] = useState("")

    useEffect(()=>{
        EmojiPick.preload()
    }, [])


    const handleInput = useCallback( ( e ) => {
        setValue( e.target.value )
    }, [ setValue ] )

    const getEmoji = useCallback( ( e, p ) => {
        var ss = inputValue  + e.native
        setValue( ss )
    }, [ inputValue ] )

    const pickHandle = () => {
        if( inputImg.current.files[0].size > 1024 * 1024 ){
            notification.warning({
                message: "警告！",
                description: "请选择1m以内的图片...."
            })
        } else {
            var reader = new FileReader()
            reader.onloadend = function(){
                var time = new Date().toTimeString()
                time = time.replace( /(.*)?\sGMT(.*)/, function( a, b ){
                    return b
                })
                console.log( "最后的结果：", reader )
                data.user.io.emit( "send-msg", {
                    id: data.roomData.id,
                    msg: {
                        name: data.user.name,
                        header: data.user.header,
                        content: reader.result,
                        time: time,
                        type: "img"
                    }
                })
            }
            reader.readAsDataURL( inputImg.current.files[0] )
        }
    }

    const showPic = useCallback( () => {
        inputImg.current.click()
    }, [inputImg] )

    const send = useCallback(
        ( e ) => {
            if( inputValue !== "" ){
                var time = new Date().toTimeString()
                time = time.replace( /(.*)?\sGMT(.*)/, function( a, b ){
                    return b
                })
                setValue("")
                data.user.io.emit( "send-msg", {
                    id: data.roomData.id,
                    msg: {
                        name: data.user.name,
                        header: data.user.header,
                        content: inputValue,
                        time: time
                    }
                })
            } else {
                notification.open({
                    message: "不能发送空消息--"
                })
            }
        },
        [inputValue],
    )

    return data.joined ? 
                (<Layout.Footer className="my-footer">
                    <div className="pick-img">
                        <Icon type="picture" onClick={ showPic } theme="filled" style={{ fontSize: '20px' }} />
                        <input type="file" onChange={ pickHandle } ref={ inputImg } style={{ display: "none" }} accept="image/*" />
                    </div>
                    <Popover trigger="click"
                    content={ <EmojiPick getEmoji={ getEmoji } /> } >
                        <div className="emoji">
                            <Icon type="smile" style={{ fontSize: '20px' }} />
                        </div>
                    </Popover>
                    <Input.TextArea autoSize={{ minRows: 1, maxRows: 3, autoSize: true }} onPressEnter={ send } onChange={ handleInput } value={ inputValue } />
                    <Button onClick={ send } >发送</Button>
                </Layout.Footer>
                )  : null
}

function mapState( state ){
    var selectedData = state.rooms.selected
    if( selectedData.joined ){
        return {
            user: state.me,
            joined: selectedData.joined,
            roomData: {
                id: state.rooms.joined[ selectedData.index ].id
            }
        }
    } else {
        return {
            user: state.me,
            joined: selectedData.joined
        }
    }
}


export default connect( mapState )( MyFooter )
