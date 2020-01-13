import React, { useState, useCallback } from "react"
import { Layout, Input, Button, Popover, notification, Icon } from "antd"
import { connect } from "dva"
import "emoji-mart/css/emoji-mart.css"

import { Picker } from "emoji-mart"

const i18n = {
    search: '搜索表情',
    categories: { 
        search: '最近搜索', 
        recent: '最近使用',
        people: '表情',
        nature: '自然',
        foods: '食物',
        activity: '活动',
        places: '地点',
        objects: '对象',
        symbols: '标志',
        flags: 'Flags',
        custom: 'Custom'
    },
    categorieslabel: 'Emoji类别'
}


function MyFooter( data ){

    function getEmoji( e, p ){
        var ss = inputValue  + e.native
        setValue( ss )
    }

    const [ inputValue, setValue ] = useState("")
    const handleInput = useCallback( ( e ) => {
        setValue( e.target.value )
    }, [ setValue ] )

    const send = useCallback(
        () => {
            if( inputValue !== "" ){
                console.log( "input的值：", inputValue )
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
                    <Popover trigger="click"
                    content={(
                        <Picker set='emojione' 
                            i18n={ i18n }
                            onSelect={ ( e, p ) => { getEmoji( e, p ) } }
                            title="选择你的表情" include={[ "people", "foods", "nature" ]} native={ true } />
                    )} >
                        <div className="emoji">
                            <Icon type="smile" style={{ fontSize: '20px' }} />
                        </div>
                    </Popover>
                    <Input.TextArea autoSize={{ minRows: 1, maxRows: 3 }} onChange={ handleInput } value={ inputValue } />
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
