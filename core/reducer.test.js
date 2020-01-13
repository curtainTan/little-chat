const immu = require("immutable")
const uuid = require( "uuid" )
const coreReducer = require("./reducer")
const actionCreater = require("./actionCreater")

describe('server核心Reducer', () => {
    it('可以当做一个reducer', () => {
        var id = uuid.v1()
        var actions = [
            { type: "ADD_ROOM", room: { id: "333333", name: "tan", owner: "tan" } },
            { type: "ADD_ROOM", room: { id, name: "44", owner: "44" } },
            { type: "ADD_ROOM", room: { id: "333333", name: "55", owner: "55" } },
            { type: "REMOVE_ROOM", payload: { id, user: "44" } },
            { type: "ADD_ROOM", room: { id, name: "666", owner: "666" } },
        ]
        const finalState = actions.reduce( coreReducer, undefined )

        expect( finalState.get("rooms").size ).toEqual( 3 )
        expect( finalState.getIn([ "rooms", 0, "owner" ]) ).toEqual( "tan" )

    });

    test('使用actionCreacter', () => {
        var id = uuid.v1()
        var actions = [
            actionCreater.addRoom({ id: "333333", name: "tan", owner: "tan" }),
            actionCreater.addRoom({ id: id, name: "33", owner: "33" }),
            actionCreater.addRoom({ id: "333333", name: "44", owner: "44" }),
            actionCreater.addRoom({ id: "333333", name: "55", owner: "55" }),
            actionCreater.removeRoom( { id, user: "33" } )
        ]
        const finalState = actions.reduce( coreReducer, undefined )

        expect( finalState.get("rooms").size ).toEqual( 3 )
        expect( finalState.getIn([ "rooms", 0, "owner" ]) ).toEqual( "tan" )
    });
});

