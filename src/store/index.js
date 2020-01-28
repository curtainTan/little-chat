import { createStore, applyMiddleware } from "redux"
import sagaMidleware from "redux-saga"
import reducer from "./reducer"
import rootSaga from "./saga"
import { composeWithDevTools } from "redux-devtools-extension"

const sagaMidle = sagaMidleware()

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware( sagaMidle ))
)

sagaMidle.run( rootSaga )

export default store
