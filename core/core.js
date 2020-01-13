const immu = require("immutable")
const uuid = require( "uuid" )

const INITIAL_STATE = immu.fromJS({
    rooms: []
})


function addRoom( state = INITIAL_STATE, room ){

    if( !room || !room.owner ) return state

    return state.update( "rooms", rooms => rooms.push( immu.Map({
        id: room.id || uuid.v1(),
        name: room.name || "no name",
        owner: room.owner
    }) ) )
}

function removeRoom( state, { id, user } ){
    const rooms = state.get( "rooms" )
    var index = rooms.findIndex( r => r.get("id") === id )
    if( index == -1 || rooms.getIn([ index, "owner" ]) !== user ){
        return state
    }
    return state.update("rooms", rooms => rooms.splice( index, 1 ))

}

module.exports = {
    INITIAL_STATE,
    addRoom,
    removeRoom
}

