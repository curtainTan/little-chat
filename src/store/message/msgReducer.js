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
            if( state.has( actions.data.id ) ){
                console.log( "已经有找到id：", actions.data )
                var newMsg = state.get( actions.data.id )
                newMsg = newMsg.push( actions.data.msg )
                return state.set( actions.data.id, newMsg )
            } else {
                console.log( "没有找到id：", actions.data )
                return state.set( actions.data.id, List([ actions.data.msg ]) )
            }
            
        default: return state
    }
}
