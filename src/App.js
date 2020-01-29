import React from 'react';
import { HashRouter, Switch, Route, Redirect } from "react-router-dom"
import { connect } from "react-redux"
import Loadable from "react-loadable"
import Loading from "./component/loading"
import "./App.css"

const Home = Loadable({
  loader: () => import("./pages/home"),
  loading: Loading
})

const LoginPage = Loadable({
  loader: () => import("./pages/login"),
  loading: Loading
})

const NotFound = Loadable({
  loader: () => import("./pages/404"),
  loading: Loading
})

function App({ isLogin }) {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" exact>
          { isLogin ? <Home /> : <Redirect to="/login" /> }
        </Route>
        <Route path="/login" component={ LoginPage } />
        <Route component={ NotFound } />
      </Switch>
    </HashRouter>
  );
}

function mapState( state ){
  return {
    isLogin: state.userState.get( "name" )
  }
}

export default connect( mapState )(App);
