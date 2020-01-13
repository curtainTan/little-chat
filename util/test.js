const store = require("./store")
const uuid = require("uuid")

const mystore = new store()

var id = uuid.v1()

// 增加房间
mystore.addRoom({
    name: "tan",
    owner: "sss",
    header: "uuuu",
    id: uuid.v1()
})

mystore.addRoom({
    name: "tan",
    owner: "222",
    header: "uuuu",
    id: uuid.v1()
})

mystore.addRoom({
    name: "yu",
    owner: "yu",
    header: "yu",
    id: id
})

console.log( mystore.rooms )

mystore.deleteRoom( {
    roomId: id,
    owner: "yu"
} )

console.log( "删除房间后" )
console.log( mystore.rooms )

mystore.addUser({
    name: "tan",
    id: "111",
    userHeader: "444",
    ip: "1234"
})

mystore.addUser({
    name: "666",
    id: "111",
    userHeader: "444",
    ip: "1234"
})

mystore.addUser({
    name: "222",
    id: "111",
    userHeader: "444",
    ip: "555"
})

console.log( "断开连接前" )
console.log( mystore.users )

// 断开连接
mystore.disconnect( "222" )
console.log( "断开连接后" )
console.log( mystore.users )

// 查看房间
console.log( "删除前查看房间" )
console.log( mystore.rooms )
console.log( "删除前定时器" )
console.log( mystore.timers )

// 超时后，查看房间
setTimeout( () => {
    console.log( "超时后查看房间" )
    console.log( mystore.rooms )
}, 1000 * 5 )

// 重连
// setTimeout( () => {
//     mystore.reconn( "555" )
//     console.log( "重连后----" )
//     console.log( mystore.rooms )
// }, 1000 * 2 )


