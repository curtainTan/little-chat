import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import Loadable from 'react-loadable'

const Indexpage = Loadable({
  loader: () => import( "./routes/IndexPage" ),
  loading() {
    return <div>Loading...</div>
  }
})
const Loginpage = Loadable({
  loader: () => import( "./routes/Login" ),
  loading() {
    return <div>Loading...</div>
  }
})


function RouterConfig({ history }) {
  return (
    <Router history={history}>
        <Switch>
          <Route path="/" exact component={Indexpage} />
          <Route path="/login" component={ Loginpage } />
        </Switch>
    </Router>
  );
}

export default RouterConfig;
