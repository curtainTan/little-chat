var a = new Set()

a.add({
    name: "tan",
    a: "00"
})

a.add({
    name: "yu",
    a: "44"
})

a.add({
    name: "ss",
    a: "56600"
})

for( let item of a.keys() ){
    console.log( item )
}

for( let item of a.values() ){
    if( item.name === "tan" && item.a === "00" ){
        a.delete( item )
    }
}

console.log( a )
