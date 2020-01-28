import { routerRedux } from "dva/router"
import io from "socket.io-client"
import * as req from "../services/example"


export default {

    namespace: 'me',
  
    state: {
      isLoading: false,
      name: "",
      header: "",
      io: null
    },

    subscriptions: {
      setup({ dispatch, history }) {  // eslint-disable-line
        history.listen( (data) => {
          if( data.pathname === "/" ){
            dispatch({
              type: "toLogin",
              data: {
                dispatch: dispatch,
                history: history
              }
            })
          }
        })
      }
    },
  
    effects: {
        // 两种情况   一种15分钟内重新连接  一种通过登录连接
        // payload 中一定有 history
      *initialData( payload , { call, put } ){
        var socket = yield io("ws://132.232.45.108:7788")
        // var socket = yield io("ws://127.0.0.1:7788")
        console.log( payload )

        yield put({
          type: "setLoading",
          isLoading: true
        })

        req.listenData( payload.payload, socket )
        
        // var localData = localStorage.getItem("userData")
        // if( payload.payload && payload.payload.fromLogin ){
        //   // 登录连接
        //   yield put({
        //     type: "setLoading",
        //     isLoading: true
        //   })
          
        //   req.listenData( payload.payload, socket )

        // } else {
        //     // 本地连接
        //   if( localData ){
        //     var dataObj = JSON.parse( localData )
        //     console.log( "保存下来的data", dataObj )
        //     // 如果时间超过15分钟，跳转到login
        //     if( (dataObj.time - Date.now) > ( 1000 * 60 * 15 ) ){
        //       payload.data.dispatch( routerRedux.push( "/login" ) )
        //       localStorage.removeItem( "userData" )
        //     } else {
        //       req.listenData( {
        //         name: dataObj.user.name,
        //         header: dataObj.user.header,
        //         history: payload.data.history,
        //         dispatch: put,
        //         reconn: true
        //       }, socket )
        //     }
        //   } else {
        //     console.log( "传进来的数据", payload )
        //     payload.data.dispatch( routerRedux.push( "/login" ) )
        //   }
        // }
      }
    },

    reducers: {
      setData( state, action ){
        console.log( "设置用户信息成功---" )
        return {
          ...state,
          name: action.data.name,
          header: action.data.header,
          io: action.data.io,
          isLoading: false
        }
      },
      toLogin( state, action ){
        if( state.name === "" ){
          action.data.dispatch(routerRedux.push( "/login" ))
        }
        return state
      },
      setLoading( state, action ){
        return { ...state, isLoading: action.isLoading }
      }
    },
  
  };
  