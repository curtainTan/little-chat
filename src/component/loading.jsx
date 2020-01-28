import { Spin } from "antd"
import React from "react"

function Loading(){
    return (
        <div style={{ bottom: 0 }} >
            <Spin delay={ 1000 } />
        </div>
    )
}

export default Loading
