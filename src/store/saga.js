import { fork } from "redux-saga/effects"
import { watchUserData } from "./userInfo/saga"

export default function* rootSaga(){
    yield fork( watchUserData )
}

