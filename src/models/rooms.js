
export default {

    namespace: 'rooms',
  
    state: {
      selected: {
        joined: true,
        selectKey: "0",
        index: 0,
      },
      joined: [
          {
              id: 11,
              name: "群聊一",
              owner: "tan",
              header: "img",
              msgCount: 0,
              msg: [
                  {
                      name: "tan",
                      content: "msg",
                      time: "1234567"
                  },
                  {
                      name: "tan",
                      content: "msg",
                      time: "1234567"
                  },
                  {
                      name: "tan666",
                      content: "msg",
                      time: "1234567"
                  }
              ]
          },
      ],
      noJoin: [],
    },
  
    subscriptions: {
    },
  
    effects: {},
  
    reducers: {
      // 侧边栏选择房间
      setSelected( state, action ) {
        console.log( "选择房间的reducer", action )
        if( action.data.selected.joined ){
          var newData = JSON.parse( JSON.stringify( state ) )
          newData.joined[ action.data.selected.index ].msgCount = 0
          return { ...newData, ...action.data }
        } else {
          return { ...state, ...action.data }
        }
      },
      // 初始化房间信息
      initialData( state, action ){
        console.log( "开始执行初始化房间", action )
        for( let i = 0; i < action.roomList.length; i ++ ){
          action.roomList[i].msg = []
          action.roomList[i].msgCount = 0
        }
        var nojoined = [ ...action.roomList ]
        nojoined.shift()
        return {
          ...state,
          joined: [ action.roomList[0] ],
          noJoin: nojoined
        }
      },
      // 添加信息
      addMsg( state, action ){
        var newData = JSON.parse( JSON.stringify( state ) )
        for( let i = 0; i < newData.joined.length; i ++ ){
          if( newData.joined[i].id === action.data.id ){
            newData.joined[i].msg.push( action.data.msg )
            // 添加未读消息count数量
            if( state.selected.joined && state.selected.index === i ){
            } else {
              newData.joined[i].msgCount ++
            }
            break
          }
        }
        return {
          ...newData,
        }
      },
      // 自己添加房间
      addRoom( state, action ){
        console.log( "action中的信息", action )
        var newData = JSON.parse( JSON.stringify( state ) )
        if( action.data.joined ){
          action.data.roomData.msg = []
          action.data.roomData.msgCount = 0
          newData.joined.push( action.data.roomData )
        } else {
          newData.noJoin.push( action.data.roomData )
        }
        return newData
      },
      // 申请加入到别人的房间成功
      joinRoom( state, action ){
        var newData = JSON.parse( JSON.stringify( state ) )
        for( let i = 0; i < newData.noJoin.length; i ++ ){
          if( newData.noJoin[i].id === action.roomData.id ){
            let aroom = newData.noJoin.splice( i, 1 )[0]
            aroom.msg = []
            aroom.msgCount = 0
            newData.joined.push( aroom )
            break
          }
        }
        return {
          ...newData,
          selected: {
            joined: true,
            selectKey: "" + (newData.joined.length - 1),
            index: "" + (newData.joined.length - 1)
          }
        }
      },
      // 删除房间  不管是否已经加入 全部遍历一次 如果在此房间内 初始化selected
      deleteRoom( state, action ){
        var newData = JSON.parse( JSON.stringify( state ) )
        for( let i = 0; i < state.joined.length; i ++ ){
          if( action.roomData.id === state.joined[i].id ){
            if( state.selected.joined && state.selected.index === i ){
              newData.selected = {
                joined: true,
                selectKey: "0",
                index: 0
              }
            }
            newData.joined.splice( i, 1 )
          }
        }
        for( let j = 0; j < state.noJoin.length; j ++ ){
          if( action.roomData.id === state.noJoin[j].id ){
            if( state.selected.joined === false && state.selected.index === j ){
              newData.selected = {
                joined: true,
                selectKey: "0",
                index: 0
              }
            }
            newData.noJoin.splice( j, 1 )
          }
        }

        return {
          ...newData
        }
      }
    }
};
