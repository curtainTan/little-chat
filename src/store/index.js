import { createStore, applyMiddleware } from "redux"
import sagaMidleware from "redux-saga"
import reducer from "./reducer"
import rootSaga from "./saga"

const sagaMidle = sagaMidleware()

const store = createStore(
    reducer,
    applyMiddleware( sagaMidle )
)

sagaMidle.run( rootSaga )

export default store
