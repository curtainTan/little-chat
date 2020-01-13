const core = require("./core")


function reducer( state, action ){
    switch ( action.type ){
        case "ADD_ROOM":
            return core.addRoom( state, action.room )
        case "REMOVE_ROOM":
            return core.removeRoom( state, action.payload )
    }
}



module.exports = reducer
