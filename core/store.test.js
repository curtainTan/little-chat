const immu = require("immutable")
const uuid = require( "uuid" )

const ac = require("./actionCreater")
const store = require("./store")

describe('测试server Stroe', () => {
    test('测试dispatch action', ( done ) => {
        const mockState = immu.fromJS({
            rooms: []
        })
        const astore = store.makeStore( mockState )

        astore.subscribe( () => {
            const state = astore.getState()
            expect( state.get("rooms").size ).toEqual( 1 )
            done()
        })

        astore.dispatch( ac.addRoom({ name: "聊天室", owner: "tan" }) )

    });
});

