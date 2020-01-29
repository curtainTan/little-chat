import React, { useEffect, useState } from "react"
import { Link, withRouter } from "react-router-dom"
import "../assets/404.css"

function NotFound({ history }){

    const [ num, setNum ] = useState( 5 )
    useEffect( () => {
        if( num < 0 ){ history.push("/") }
        var timer = setInterval( () => {
            setNum( num - 1 )
        }, 1000 )
        return () => {
            clearInterval( timer )
        }
    }, [ num ])

    return(
        <div className="page-404">
            <div>
                <div className="text-404" >页面没找到...</div>
                <div className="num-404">404</div>
                <div className="info-404">
                    { num } 秒后将跳转到主页.
                </div>
            </div>
        </div>
    )
}

export default withRouter( NotFound )
