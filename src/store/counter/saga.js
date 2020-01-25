import { takeEvery, put, delay } from "redux-saga/effects"


function* addCounter(){
    yield delay(1000)
    yield put({ type: "add" })
}

export function* watchAdd(){
    yield takeEvery( "addSaga", addCounter )
}
