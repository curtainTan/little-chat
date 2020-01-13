import React, { useState } from 'react';
import { connect } from 'dva';
import { Layout } from "antd"


import MyDrawer from '../components/myDrawer'
import MyContent from "../components/content"
import MySider from "../components/mySider"

import "../components/list.css"

function IndexPage() {

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

export default connect()(IndexPage);
