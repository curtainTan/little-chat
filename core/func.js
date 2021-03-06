
/**
 * 第一次连接
 * @param {socket} socket 
 * @param {store} store 
 * socket设置username
 * 设置socket的id到data
 */
function firstConn( IO, socket, store ){
    return function( data ){
        console.log( "用户第一次连接-----" )
        data.id = socket.id
        if( store.addUser( data ) ){
            // 创建成功----加入默认房间---返回用户信息
            socket.userName = data.name
            console.log( "用户列表：", store.users )
            socket.join( "0", () => {
                socket.emit( "connect-suc", {
                    userData: data,
                    userList: store.users.slice( 0, store.users.length - 1 ),
                    roomList: store.rooms
                })
                IO.sockets.in( "0" ).emit( "msg-system", {
                    type: "join-room",
                    userData: socket.userName,
                    roomData: store.rooms[0]
                })
            })
            // 通知所有用户----用户上线
            socket.broadcast.emit( "update", {
                type: "userConnect",
                userData: data
            })
        } else {
            socket.emit( "msg-system", {
                type: "err-login",
                msg: "抱歉！此用户名已存在，请重新输入用户名..."
            })
        }
    }
}

/**
 * 发送消息       群消息   私发消息
 */
function sendMsg( IO, socket, store ){
    return function( data ){
        // console.log( "查看发送信息：", data )
        if( data.type === "user" ){
            data.fromId = socket.id
            socket.to( data.id ).emit('rec-msg', data)
            data.fromId = data.id
            socket.emit('rec-msg', data)
        } else {
            IO.sockets.in( data.id ).emit( "rec-msg", data )
        }
    }
}

// 创建房间
function createRoom( IO, socket, store ){
    return function( data ){
        console.log( "上传数据：", data )
        var roomData = store.addRoom({
            name: data.name,
            owner: socket.userName,
            header: data.header
        })
        socket.join( roomData.id, () => {
            socket.emit( "msg-system", {
                type: "suc-createRoom",
                msg: "恭喜你，房间创建成功！"
            })
            IO.emit( "update", {
                type: "createRoom",
                roomData
            })
        })
    }
}

// 删除房间
function deleteRoom( IO, socket, store ){
    return function( data ){
        console.log( "删除房间：", data )
        var deleteRoom = store.deleteRoom({
            owner: socket.userName,
            roomId: data.roomId
        })
        deleteRoom.time = data.time
        socket.leave( data.roomId, () => {
            // 通知自己，马上删群
            socket.emit( "update", {
                type: "deleteRoom",
                deleteRoom
            })
            // 通知群里用户，群主删群跑路了
            IO.sockets.in( data.roomId ).emit( "msg-system", {
                type: "delete-room",
                deleteRoom
            })
            // 15分钟后删除房间  并通知用户
            setTimeout(() => {
                store.deleteHandle([ deleteRoom ])
                IO.emit( "update", {
                    type: "deleteRoom",
                    after: true,
                    deleteRoom
                })
            }, 1000 * 60 * 15 )
        })
    }
}


// 失去连接
// 通知所有用户下线
// 15分钟后删除房间
function disconnect( IO, socket, store ){
    return function(){
        if( socket.userName ){
            var userData = store.disconnect( socket.userName )
            // 通知创建的群聊，群主下线
            for( let i = 0; i < userData.roomList.length; i ++ ){
                IO.sockets.in(userData.roomList[i].id).emit( "msg-system", {
                    type: "delete-room",
                    deleteRoom: userData.roomList[i]
                })
                // 15分钟后删除房间  并通知用户删除房间
                setTimeout( () => {
                    store.deleteHandle( userData.roomList )
                    IO.emit( "update", {
                        type: "deleteRoom",
                        deleteRoom: userData.roomList[i]
                    })
                }, 1000 * 60 * 15 )
            }
            // 通知所有用户，此用户下线
            IO.emit( "update", {
                type: "disconnect",
                userData: userData.userData
            })
        }
    }
}

// 申请加群
// roomdata 房间信息
// userData 用户信息

function applyJoin( IO, socket, store ){
    return function( data ){
        console.log( "收到加群的消息", data )
        // 第一次申请
        if( data.type === "apply" ){ 
            console.log( "查找到的用户信息" )
            for( let i = 0; i < store.users.length; i ++ ){
                if( store.users[i].name === (data.roomData && data.roomData.owner )){
                    console.log( "查找到的用户信息", store.users[i] )
                    socket.to( store.users[i].id ).emit("apply", {
                        type: "join-room",
                        roomData: data.roomData,
                        userData: data.userData
                    })
                }
            }
        }
        // 接到允许加群
        if( data.type === "allow" ){
            if( data.userData && data.userData.id ){
                socket.to( data.userData.id ).emit( "apply", {
                    type: "join-allow",
                    roomData: data.roomData
                })
            }
        }
        // 拒绝加群
        if( data.type === "reject" ){
            if( data.userData && data.userData.id ){
                socket.to( data.userData.id ).emit( "apply", {
                    type: "join-reject",
                    roomData: data.roomData
                })
            }
        }
        // 加入群聊
        if( data.type === "yes" ){
            console.log("加入房间：", data)
            socket.join( data.roomData.id, () => {
                socket.emit( "apply", {
                    type: "join-yes",
                    roomData: data.roomData
                })
                IO.sockets.in( data.roomData.id ).emit( "msg-system", {
                    type: "join-room",
                    userData: socket.userName,
                    roomData: data.roomData
                })
            })
        }
    }
}


module.exports = {
    firstConn,
    sendMsg,
    createRoom,
    deleteRoom,
    disconnect,
    applyJoin
}
