import React from "react"
import { Layout } from "antd"
import { connect } from "react-redux"
import "../assets/my-space.css"

function MeBox({ userData }){
    return (
        <Layout.Content>
            <div className="mySpace">
                <div className="me-header">
                    <img src={ userData.header || "https://518test.curtaintan.club/liuyan/uploadImage" } alt="加载错误..."/>
                </div>
                <h1>朋友你好：</h1>
                <p>很高兴你体验我开发的小小聊天室。</p>
                <p>如果你觉得体验不错，可以给我个start</p>
                <p>github地址：<a href="https://github.com/curtainTan/little-chat" target="_blank" rel="noopener noreferrer">点击直达</a> </p>
            </div>
        </Layout.Content>
    )
}

function mapState( state ){
    return {
        userData: state.userState.toObject(),
    }
}

export default connect( mapState )( MeBox )
