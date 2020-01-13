
function addRoom( room ){
    return {
        type: "ADD_ROOM",
        room
    }
}

function removeRoom( payload ){
    return {
        type: "REMOVE_ROOM",
        payload
    }
}

module.exports = {
    addRoom,
    removeRoom
}

