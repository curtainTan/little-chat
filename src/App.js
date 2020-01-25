import React from 'react';
import './App.css';
import { Provider } from "react-redux"
import store from "./store/index"
import Home from "./pages/home"


function App() {
  return (
    <Provider store={ store } >
      <Home />
    </Provider>
  );
}

export default App;
