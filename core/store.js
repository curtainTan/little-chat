const redux = require("redux")
const coreReducer = require("./reducer")
const imm = require("immutable")

const DEFAULT_STATE = imm.fromJS({
    rooms: [{
        name: "公开房间", id: 0
    }]
})

function makeStore( state = DEFAULT_STATE ){
    return redux.createStore( coreReducer, state )
}


module.exports = {
    DEFAULT_STATE,
    makeStore
}
