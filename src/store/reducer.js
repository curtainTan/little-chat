import { combineReducers } from "redux"
import { userState } from "./userInfo/index"
import { roomState } from "./roomData/index"
import { msgState } from "./message/index"

export default combineReducers({
    userState,
    roomState,
    msgState
})

