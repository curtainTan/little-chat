
/**
 * 一个房间的信息
 * name           可以重复
 * owner
 * header
 * id    uuid.v1  唯一标识   用于用户主动删除房间
 */

/**
 * 保存用户列表
 * 用户名             name     用户名不能重复  防止同用户名（在下线时删除房间出错）
 * 用户的 socket的    id     可以实现单发消息
 * 用户的头像         header
 */


/**
 * 功能
 * 删除和添加房间
 * 申请加入房间
 */

/**
 * 用户下线
 * 15分钟后删除房间
 * 定一个定时器数组    保存用户名
 * 15分钟内连接        不删除信息，并重新加入房间
 */


const uuid = require("uuid")

class store {
    constructor(){
        this.rooms = []
        this.users = []
        this.timers = []
        this.rooms.push({
            name: "公共房间",
            id: "0"
        })
    }
    /**
     * 增加房间
     * @param {*} roomData 
     */
    addRoom( roomData ){
        var data = {
            id: roomData.id || uuid.v1(),
            name: roomData.name,
            owner: roomData.owner,
            header: roomData.header
        }
        this.rooms.push( data )
        return data
    }
    /**
     * 删除房间
     * @param { 删除房间的信息 } data 
     * 房间id    房间拥有者name
     */

    deleteRoom( data ){
        for( let i = 0; i < this.rooms.length; i ++ ){
            if( data.roomId === this.rooms[i].id ){
                if( data.owner === this.rooms[i].owner ){
                    var roomData = this.rooms.splice( i, 1 )
                    return roomData[0]
                }
            }
        }
    }

    /**
     * 用户下线
     * @param {*} owner
     * 先立刻移除用户状态，15分钟后，移除房间
     */
    disconnect( owner ){
        // 通知此用户下线
        var userData = {}
        for( let i = 0; i < this.users.length; i ++ ){
            if( owner === this.users[i].name ){
                userData = this.users[i]
                this.users.splice( i, 1 )
                break
            }
        }
        var roomList = []
        for( let j = 0; j < this.rooms.length; j ++ ){
            if( this.rooms[j].owner === userData.name ){
                roomList.push( this.rooms[j] )
            }
        }
        // 15分钟后
        // var timer = setTimeout( () => {
        //     // 直接删除房间
        //     for( let j = this.rooms.length - 1; j >= 0; j -- ){
        //         if( this.rooms[j].owner === owner ){
        //             this.rooms.splice( j, 1 )
        //         }
        //     }
        // }, 1000 * 60 * 15 )
        // timer.name = userData.name
        // this.timers.push( timer )
        return {
            userData,
            roomList
        }
    }
    /**
     * 15分钟内重新连接
     * @param {*} ip 
     * 通知上线，删除定时器
     */
    reconn( name ){
        for( let i = 0; i < this.timers.length; i ++ ){
            if( this.timers[i].name === name ){
                clearTimeout( this.timers[i] )
                break
            }
        }
    }
    /**
     * 添加用户
     * @param {用户信息} data 
     * name， socket id, header
     * 判断用户名是否重复，再添加
     */
    addUser( data ){
        
        if( data.name === "" ) return false

        for( let i = 0; i < this.users.length; i ++ ){
            if( this.users[i].name === data.name ){
                return false
            }
        }
        this.users.push(data)
        return true
    }
}



module.exports = store

