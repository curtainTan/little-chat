import { List, Map } from "immutable"


const msgState = Map({
    // 键是用户id或者是群id
    test: List([
        {
            name: "tan",
            content: "msg ----",
            time: "7788"
        }
    ])
})


export default ( state = msgState, actions ) => {
    switch ( actions.type ) {
        case "addMsg":
            // console.log( "已经有找到id：", actions.data )
            if( state.has( actions.data.id ) || state.has( actions.data.fromId ) ){
                if( actions.data.type === "user" ){
                    let newMsg = state.get( actions.data.fromId )
                    newMsg = newMsg.push( actions.data.msg )
                    return state.set( actions.data.fromId, newMsg )
                }
                let newMsg = state.get( actions.data.id )
                newMsg = newMsg.push( actions.data.msg )
                return state.set( actions.data.id, newMsg )
            } else {
                // console.log( "没有找到id：", actions.data )
                if( actions.data.type === "user" ){
                    return state.set( actions.data.fromId, List([ actions.data.msg ]) )
                }
                return state.set( actions.data.id, List([ actions.data.msg ]) )
            }
            
        default: return state
    }
}
