import React from "react"
import { Picker } from "emoji-mart"
import "emoji-mart/css/emoji-mart.css"

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


export default function emojiPicker({ getEmoji }){
    return (
        <div className="emoj-box">
            <Picker set='emojione' 
                i18n={ i18n }
                onSelect={ ( e, p ) => { getEmoji( e, p ) } }
                title="选择你的表情" include={[ "people", "foods", "nature" ]} native={ true } />
        </div>
    )
}

