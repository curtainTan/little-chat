const mo = require("./core")
const uuid = require("uuid")

var s = new Set()
var tan = { name : "ii", u : 1 }
s.add( tan )
console.log( s.has( tan ) )


var firstRoom = {
    id: "9999",
    name: "f", 
    owner: "tan"
}
const next = mo.addRoom( undefined, firstRoom )
console.log( firstRoom )
const rooms = next
console.log( rooms.has( firstRoom ) )

