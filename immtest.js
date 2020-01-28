const immu = require("immutable")

const data = immu.Map({
    selected: {
        type: "joined",             // joined noJoin self(私聊)
        selectKey: "0",
        index: 0
    },
    joined: immu.List([
        {
            id: 11,
            name: "群聊一",
            owner: "tan",
            header: "img",
            msgCount: 0
        },
        {
            id: 333,
            name: "你好",
            owner: "tan----",
            header: "img-----",
            msgCount: 67
        }
    ])
})


var arr = [ 1, 2, 3, 4 ]
var obj = {
    a: 1234,
    tan: "7777"
}

console.log( arr.slice( 1 ) )
console.log( arr.slice( 2 ) )

var newData = data.mergeIn( ["joined"], arr[3] )
console.log( newData.get("joined").toArray() )

// var newData1 = data.mergeIn( ["joined"], arr.slice( 2 ) )
// console.log( newData1.get("joined").toArray() )

// find测试
// var find = data.get( "joined" )
// var res = find.findIndex( ( val, index ) => {
//     if( val.id === 333 ){
//         return true
//     } else {
//         return false
//     }
// })
// console.log( " finde arr ",res )

// mergeObj

var newData = data.mergeIn( ["joined"], obj )
console.log( newData.get("joined").toArray() )

console.log( data.getIn([ "selected", "type" ]) )

