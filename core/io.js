
// 在每个socket对象上绑定一个userName
// 用于下线删除房间

/**
 * 
 *     功能一览
 * 
 * 连接成功  ------- 设置用户名
 *                  加入默认房间
 *        返回----- 在线用户列表、房间列表、个人用户信息
 *        广播用户上线信息
 * 
 * 发送消息   ------- 系统消息/群聊消息
 * 
 * 申请加入群聊
 * 
 * 重新连接
 *                  
 */

const handleFunc = require("./func")

function listenIO( IO, store ){
    IO.on( "connection", function( socket ){
        
        // 第一次登陆
        socket.on( "firstConn", handleFunc.firstConn( IO, socket, store ) )
        // 发送消息
        socket.on( "send-msg", handleFunc.sendMsg( IO, socket, store ) )
        // 下线
        socket.on( "disconnect", handleFunc.disconnect( IO, socket, store ) )
        // 申请加入群聊
        socket.on( "apply-join", handleFunc.applyJoin( IO, socket, store ) )
        // 创建房间
        socket.on( "create-room", handleFunc.createRoom( IO, socket, store ) )
        // 申请加入房间
        socket.on( "apply", handleFunc.applyJoin( IO, socket, store ) )
        // 删除房间
        socket.on( "delete-room", handleFunc.deleteRoom( IO, socket, store ) )

    })
}

module.exports = listenIO
