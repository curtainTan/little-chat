// import { v1 } from "uuid"
// import { fromJS, Map, List } from "immutable"
// import { addRoom } from "./core"


const immu = require("immutable")
const uuid = require( "uuid" )
const mo = require("./core")
const comm = require("./core-com")


describe('rooms', () => {
    test( "添加房间", () => {
        var firstRoom = { name: "f", id: uuid.v1(), owner: "tan" }
        const next = mo.addRoom( undefined, firstRoom )
        const rooms = next.get( "rooms" )
        expect( rooms.get( 0 )).toEqual( immu.Map( firstRoom ) )

        const nextState = mo.addRoom( next, { name: "yu", owner: "yuyuy" } )
        expect( nextState.getIn( [ "rooms", 1, "name" ]) ).toBe( "yu" )
    })

    test('测试用set创建的函数', () => {
        var firstRoom = { name: "f", id: uuid.v1(), owner: "tan" }
        const next = comm.addRoom( undefined, firstRoom )
        var rooms = next
        expect( rooms.has( firstRoom ) ).toBeTruthy()

        const nextState = comm.addRoom( next, { name: "yu", owner: "yuyuy" } )
        expect( nextState.size ).toBe( 2 )
    });

    const mockState = immu.fromJS({
        rooms: [{ name: "f", id: uuid.v1(), owner: "tan" }]
    })

    test('能被创建者删除', () => {
        const state = mo.removeRoom( mockState, {
            id: mockState.getIn(["rooms", 0, "id"]),
            user: "tan"
        })
        expect( state.get( "rooms" ).size ).toEqual( 0 )
    });

    test('不能被其他用户删除', () => {
        const state = mo.removeRoom( mockState, {
            id: mockState.getIn(["rooms", 0, "id"]),
            user: "tanwww"
        })
        expect( state.get( "rooms" ).size ).toEqual( 1 )
    });

    var id = uuid.v1()
    var setState = new Set()
    setState.add({ id: id, owner: "tan", name: "uuuu" })
    test('set中的删除', () => {
        var newState = comm.removeRoom( setState, { id: id, user: "tan" } )
        expect( newState.size ).toBe( 0 )
    });

    var setState1 = new Set()
    setState1.add({ id: id, owner: "tan", name: "uuuu" })
    test('set中的不删除', () => {
        var newState = comm.removeRoom( setState1, { id: id, user: "tanww" } )
        expect( newState.size ).toBe( 1 )
    });
});

