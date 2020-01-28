

// 侧边栏选中  消除msgCount的消息数
export function setSelected( state, action ){
    if( action.data.type === "joined" ){
        state.roomState.get( "selected" )
    }
}







