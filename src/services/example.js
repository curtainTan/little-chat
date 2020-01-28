import { notification, Modal } from "antd"
const { confirm } = Modal;

// 群消息申请
function showApply( io, data ){
  confirm({
    title: "群申请通知：",
    content: data.userData.name + "申请加入房间：" + data.roomData.name,
    okText: "同意",
    cancelText: "拒绝",
    onOk: () => {
      io.emit( "apply", {
        type: "allow",
        roomData: data.roomData,
        userData: data.userData
      })
    },
    onCancel: () => {
      io.emit( "apply", {
        type: "reject",
        roomData: data.roomData,
        userData: data.userData
      })
    }
  })
}


/**
 * 
 * @param {*} initData name  header  history dispatch
 * @param {*} socket 
 */
export function listenData( initData, socket ){

  console.log( "开始执行连接----" )
  // if( initData.reconn ){
  //   socket.emit( "re-connect", {
  //     name: initData.name,
  //     header: initData.header
  //   })
  // } else {
  //   socket.emit( "firstConn", {
  //     name: initData.name,
  //     header: initData.header
  //   })
  // }

  socket.emit( "firstConn", {
    name: initData.name,
    header: initData.header
  })


  // 连接成功
  socket.on( "connect-suc", ( data ) => {
    console.log( "连接成功-----" )
    initData.dispatch({
      type: "me/setData",
      data: {
        name: data.userData.name,
        header: data.userData.header,
        io: socket,
      }
    })
    initData.dispatch({
      type: "rooms/initialData",
      roomList: data.roomList
    })
    // 登陆后把信息存到本地
    // var userData = {
    //   user: {
    //     name: data.userData.name,
    //     header: data.userData.header
    //   },
    //   time: Date.now()
    // }
    // localStorage.setItem( "userData", JSON.stringify( userData ) )
    initData.history.push( "/" )
  })

  // 接收到消息
  socket.on( "rec-msg", data => {
    initData.dispatch({
      type: "rooms/addMsg",
      data
    })
  })

  // 所有的系统消息   连接出错（名字重复）   成功创建房间
  socket.on( "msg-system", ( data ) => {
    console.log( "接收到消息---", data )
    // 用户登录，用户名重复
    if( data.type === "err-login" ){
      initData.dispatch({
        type: "me/setLoading",
        setLoading: false
      })
      notification.open({
        message: data.msg
      })
    }
    // 成功创建房间
    if( data.type === "suc-createRoom" ){
      notification.open({
        message: data.msg
      })
    }
    // 群主删除房间的信息
    if( data.type === "delete-room" ){
      console.log( "删除房间的信息：", data )
      let msg = {
        msg: {
          msg: "群主已经删群跑路了，15分钟后将删除此房间...",
          type: "system",
          time: data.deleteRoom.time,
        },
        id: data.deleteRoom.id
      }
      initData.dispatch({
        type: "rooms/addMsg",
        data: msg
      })
      notification.warning({
        message: "请注意：",
        description: "房间：" + data.deleteRoom.name + "已经被删除，15分钟后将正式删除。"
      })
    }
    // 新成员入群通知
    if( data.type === "join-room" ){
      var msg = {
        msg: {
          msg: data.userData + "已经加入群聊...",
          type: "system",
        },
        id: data.roomData.id
      }
      initData.dispatch({
        type: "rooms/addMsg",
        data: msg
      })
    }
  })

  // update  更新房间信息(增加和删除)  更新用户信息
  socket.on( "update", ( data ) => {
    console.log( "接收到update的信息", data )
    // 添加房间  如果是自己  like添加  不是自己  加到nojoin里面
    if( data.type === "createRoom" ){
      if( data.roomData.owner === initData.name ){
        initData.dispatch({
          type: "rooms/addRoom",
          data: {
            joined: true,
            roomData: data.roomData
          }
        })
      } else {
        initData.dispatch({
          type: "rooms/addRoom",
          data: {
            joined: false,
            roomData: data.roomData
          }
        })
      }
    }
    // 删除房间   使用房间id删除房间
    // 收到消息，证明肯定是自己的，立刻删除房间，其他人15分钟后删除房间
    if( data.type === "deleteRoom" ){
      initData.dispatch({
        type: "rooms/deleteRoom",
        roomData: data.deleteRoom
      })
      if( data.deleteRoom.owner === initData.name ){
        // 15分钟后
        if( data.after ){
          
        } else {
          notification.open({
            message: "房间删除成功...房间将在15分钟后正式删除！"
          })
        }
      }
    }
  })

  // apply  加群
  socket.on( "apply", ( data ) => {
    console.log( "加群的消息", data )
    if( data.type === "join-room" ){
      showApply( socket, data )
    }
    if( data.type === "join-reject" ){
      notification.open({
        message: "群主拒绝你加入群：" + data.roomData.name
      })
    }
    if( data.type === "join-allow" ){
      console.log( "成功加入群聊：数据是", data )
      socket.emit( "apply", {
        type: "yes",
        roomData: data.roomData
      })
    }
    if( data.type === "join-yes" ){
      notification.open({
        message: "你已经成功加入房间：" + data.roomData.name
      })
      initData.dispatch({
        type: "rooms/joinRoom",
        roomData: data.roomData
      })
    }
  })


}


