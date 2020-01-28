import { takeEvery, put, select } from "redux-saga/effects"
import * as req from "../../service/io"


function* initialData( data ){
    console.log( "初始化的数据：", data )
    yield put({
        type: "setLoading",
        data: {
            Loading: true
        }
    })
    var userIO = yield select( state => state.userState.get( "io" ) )
    req.listenData( data.payload ,userIO )
}

export function* watchUserData(){
    yield takeEvery( "initialData", initialData )
}
