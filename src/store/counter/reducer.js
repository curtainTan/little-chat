import { Map } from "immutable"


const countState = Map({
    count: 0
})


export default ( state = countState, action ) => {
    switch( action.type ){
        case "add":
            return state.set( "count", state.get("count") + 1 )
        case "minu":
            return state.set( "count", state.get("count") - 1 )
        default: return state
    }
}


