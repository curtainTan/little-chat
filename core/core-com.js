const uuid = require( "uuid" )

const INITIAL_STATE = new Set()


function addRoom( state = INITIAL_STATE, room ){
    if( !room || !room.owner ) return state
    return state.add(room)
}

function removeRoom( state, { user, id } ){
    for( let item of state.keys() ){
        if( item.id === id && item.owner === user ){
            state.delete( item )
            return state
        }
    }
    return state
}

module.exports = {
    INITIAL_STATE,
    addRoom,
    removeRoom
}
