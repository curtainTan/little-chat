import React, { Component } from 'react'
import { connect } from "react-redux"
import io from "socket.io-client"
// import { Picker } from "emoji-mart"
// import 'emoji-mart/css/emoji-mart.css'

class Home extends Component {
    addHandle = () => {
        this.props.add()
    }
    minuHandle = () => {
        this.props.minu()
    }
    sagaAdd = () => {
        this.props.asyncAdd()
    }
    initSocket = () => {
        var so = io("ws://132.232.45.108:7788")
        console.log( so )
    }
    render() {
        return (
            <div>
                <h1>我是Home页面</h1>
                <h1> { this.props.counter } </h1>
                <button onClick={ this.addHandle } >加1</button>
                <br />
                <button onClick={ this.minuHandle } >j减1</button>
                <br />
                <button onClick={ this.sagaAdd } >saga加1</button>
                <br />
                <button onClick={ this.initSocket } >初始化socket</button>
                {/* <div className="emoji-box" >
                    <Picker title='Pick your emoji…' emoji='point_up' />
                </div> */}
            </div>
        )
    }
}

function mapstate( state ){
    return {
        counter: state.counterReducer.get( "count" )
    }
}

function mapAction( dispach ){
    return {
        add(){
            dispach({ type: "add" })
        },
        minu(){
            dispach({ type: "minu" })
        },
        asyncAdd(){
            dispach({ type: "addSaga" })
        }
    }
}

export default connect( mapstate, mapAction )( Home )
