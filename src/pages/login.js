import React, { memo, useState, useCallback } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { Avatar, Popover, Input, Row, Col, Button } from "antd"

import "../assets/login.css"

const imgList = [
    "https://image.gslb.dawnlab.me/74e87854fa8c6bfc1f2065e756f2d7cc.jpg",
    "https://image.gslb.dawnlab.me/66e72208e2eb30b6f55695d142b60272.jpg",
    "https://image.gslb.dawnlab.me/abcefa40ffee53b9d4d9b15a77b4b5c1.png",
    "https://image.gslb.dawnlab.me/664ab76b5b825f0a63b75557c1e4ae72.jpg",
    "https://image.gslb.dawnlab.me/78e6eaef157442f33bb563b23e3fcf0b.jpg",
    "https://image.gslb.dawnlab.me/84e05ea2c9eb1e9b97e771c6d785fe4e.jpg",
    "https://image.gslb.dawnlab.me/3e96253fb0d97d6ce97926c395ff143c.jpg",
    "https://image.gslb.dawnlab.me/4d6eefc256ed300338cdd97f8f3415c8.jpg",
]

const Headerlist = memo(({ setHeader }) => {
    return (
        <Row gutter={[ 12, 12 ]} >
            { imgList.map( (item, index) => (
                <Col style={{ textAlign: "center" }} span={ 6 } key={index}>
                    <Avatar onClick={ () => { setHeader( item ) } } style={{ cursor: "pointer" }} src={item} shape="circle" size="large" />
                </Col>))
             }
        </Row>
    )
})


function Loginpage({ dispatch, history, isLoading }){

    const [ name, setName ] = useState("")
    const [ header, setHeader ] = useState( imgList[0] )
    const [ disableBtn, setAble ] = useState( true )
    const handleInput = useCallback( ( e ) => {
        setName( e.target.value )
        setAble( e.target.value ? false : true )
    }, [name] )

    const btnHandle = useCallback(() => {
        console.log( "name:", name )
        dispatch({
            type: "initialData",
            payload: {
                name,
                header,
                history,
                dispatch
            }
        })
    }, [ name ] )

    return (
        <div className="login">
            <div className="login-box">
                <h1 style={{ textAlign: "center" }} >小小聊天室</h1>
                <div className="login-header">
                    <Popover
                        placement="bottom"
                        title="选择你的头像"
                        trigger="hover"
                        content={
                            <Headerlist setHeader={ setHeader } />
                        }
                    >
                        <Avatar 
                            src={ header }
                            shape="circle"
                            size="large"
                        />
                    </Popover>
                </div>
                <Row type="flex" align="middle" >
                    <Col style={{ textAlign: "center" }} sm={{ offset:2, span: 5 }} xs={{ span: 5, offset: 0 }} >昵称：</Col>
                    <Col sm={{ span: 15 }} xs={{ span: 18 }} ><Input value={name} onChange={ handleInput } placeholder="请输入你的名字" /></Col>
                </Row>
                <Row style={{ marginTop: 30 }} >
                    <Col span={ 12 } offset={6} >
                        <Button disabled={ disableBtn } loading={ isLoading } type="primary" onClick={ btnHandle } block >进入聊天</Button>
                    </Col>
                </Row>
            </div>
        </div>
    )
}


function mapState( state ){
    console.log( state.userState.toObject() )
    return {
        isLoading: state.userState.get("isLoading")
    }
}

function mapDispatch( dispatch ){
    return {
        dispatch
    }
}


export default connect( mapState, mapDispatch )( withRouter( Loginpage ))
