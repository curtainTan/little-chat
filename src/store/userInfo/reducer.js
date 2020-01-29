import { Map } from "immutable"
import io from "socket.io-client"


const userInfo = Map({
    isLoading: false,
    name: "",
    header: "",
    // io: io("ws://127.0.0.1:7788")
    io: io("ws://132.232.45.108:7788")
})

export default ( state = userInfo, action ) => {
    switch( action.type ){
        case "setUserData":
            var newData = state.set("name", action.data.name)
                               .set( "header", action.data.header )
                               .set( "isLoading", false )
            return newData
        case "setLoading":
            return state.set("isLoading", action.Loading )
        default: return state
    }
}
