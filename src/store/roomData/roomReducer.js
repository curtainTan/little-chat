import { Map, List } from "immutable"

const initSelect = {
    type: "joined",             // joined noJoin user(私聊)
    selectKey: "joined-0",
    index: 0
}

const roomData = Map({
    selected: initSelect,
    joined: List([]),
    noJoin: List([]),
    user: List([])
})

/**
 *   侧边栏选中  消除msgCount的消息数
 * @param { 整体数据 } state 
 * @param {*} data   type  index  selectKey
 */
function setSelected( state, data ){
    // console.log( "选择侧边栏的数据：", data )
    let newData = state.setIn([ data.selected.type, data.selected.index, "msgCount" ], 0 )
    return newData.set( "selected", data.selected )
}

function initialData( state, data ){
    let newData = state.mergeIn( [ "joined" ], data.roomList[0] )
                       .mergeIn( [ "noJoin" ], data.roomList.slice( 1 ) )
                       .mergeIn( [ "user" ], data.userList )
    return newData
}

function addRoom( state, data ){
    if( data.joined ){
        return state.mergeIn( [ "joined" ], data.roomData )
    } else {
        return state.mergeIn( [ "noJoin" ], data.roomData )
    }
}

function joinRoom( state, action ){
    var noJoinList = state.get( "noJoin" )
    var sele = {
        type: "joined",             // joined noJoin user(私聊)
        selectKey: "joined-" + (state.get( "joined" ).size ),
        index: state.get( "joined" ).size
    }
    var addIndex = noJoinList.findIndex( ( val ) => val.id === action.roomData.id )
    var newData = state.deleteIn( [ "noJoin", addIndex ] )
                       .mergeIn( ["joined"], action.roomData )
                       .set( "selected", sele )
    // 后期再添加select的功能
    return newData
}

function deleteRoom( state, roomData ){
    var joinedList = state.get( "joined" )
    var noJoinList = state.get( "noJoin" )
    var newState
    var getIndex = joinedList.findIndex( ( val ) => val.id === roomData.id  )
    if( getIndex !== -1 ){
        newState = state.deleteIn( [ "joined", getIndex ] )
        if( state.getIn([ "selected", "type" ]) === "joined" && 
            state.getIn([ "selected", "index" ]) === getIndex ){
                return newState.set( "selected", initSelect )
        }
        return newState
    }
    getIndex = noJoinList.findIndex( ( val ) => val.id === roomData.id  )
    if( getIndex !== -1 ){
        newState = state.deleteIn( [ "noJoin", getIndex ] )
        if( state.getIn([ "selected", "type" ]) === "noJoin" && 
            state.getIn([ "selected", "index" ]) === getIndex ){
                return newState.set( "selected", initSelect )
        }
        return newState
    }
    return state
}

function reciveMsg( state, data ){
    // 加入房间的系统消息
    if( data.type !== "user" ){
        var joineList = state.get("joined")
        var index = joineList.findIndex( val => val.id === data.id )
        // 寻找房间
        if( index !== -1 ){
            var count = state.getIn([ "joined", index, "msgCount" ]) || 0
            // 判断是否是当前选中房间
            if( state.getIn([ "selected", "type" ]) === "joined" &&
            state.getIn([ "selected", "index" ]) === index ){
                return state
            } else {
                return state.setIn([ "joined", index, "msgCount" ], count+1 )
            }
        }
    } else {
        // 来自用户的消息
        var joineList = state.get("user")
        var index = joineList.findIndex( val => val.id === data.fromId )
        if( index !== -1 ){
            var count = state.getIn([ "user", index, "msgCount" ]) || 0
            // 判断是否是当前选中房间
            if( state.getIn([ "selected", "type" ]) === "user" &&  
            state.getIn([ "selected", "index" ]) === index ){
                return state
            } else {
                return state.setIn([ "user", index, "msgCount" ], count + 1 )
            }
        }
    }
    return state
}

function addUser( state, data ){
    return state.mergeIn( [ "user" ], data )
}

function deleteUser( state, data ){
    var index = state.get( "user" ).findIndex( val => val.id === data.id)
    if( index !== -1 ){
        if( state.getIn([ "selected", "type" ]) === "user" &&
        state.getIn([ "selected", "index" ]) === index ){
            return state.set( "selected", initSelect )
                        .deleteIn([ "user", index ])
        }
        return state.deleteIn([ "user", index ])
    }
    return state
}

export default ( state = roomData, action ) => {
    switch ( action.type ){
        // 选中侧边栏
        case "setSelected":
            return setSelected( state, action.data )
        // 初始化房间信息和用户信息
        case "initialRoomData": 
            // console.log( "初始化信息：", action )
            return initialData( state, action.data )
        // 添加房间
        case "addRoom":
            // console.log( "添加房间信息：", action )
            return addRoom( state, action.data )
        // 加入到别人的房间
        case "joinRoom":
            // console.log( "join别人房间信息：", action )
            return joinRoom( state, action )
        // 删除房间
        case "deleteRoom":
            // console.log( "删除房间信息：", action )
            return deleteRoom( state, action.roomData )
        // 接收消息
        case "reciveMsg":
            // console.log( "reciveMsg房间信息：", action )
            return reciveMsg( state, action.data )
        // 用户上线
        case "addUser":
            // console.log( "收到用户上线信息：", action )
            return addUser( state, action.data )
        // 用户下线
        case "deleteUser":
            // console.log( "收到用户下线信息：", action )
            return deleteUser( state, action.data )
        default: return state
    }
}
