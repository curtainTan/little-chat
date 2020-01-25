import { fork } from "redux-saga/effects"
import { watchAdd } from "./counter/saga"

export default function* rootSaga(){
    yield fork( watchAdd )
}

