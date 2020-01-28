import React, { useState } from 'react';
import { Layout } from "antd"


import MyDrawer from '../component/myDrawer'
import MyContent from "../component/content"
import MySider from "../component/mySider"

import "../assets/content.css"

function Indexpage() {

  const [ showDrawer, setShower ] = useState( false )

  return (
    <div className="main-box" >
      <MyDrawer showDrawer={ showDrawer } setShower = { setShower } />
      <Layout className="my-layout" >
        <MySider />
        <MyContent setShower={ setShower } />
      </Layout>
    </div>
  )
}

export default Indexpage
