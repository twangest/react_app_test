import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux'
import App from "./components/app";
import store from './redux/store'
import {ConnectedRouter} from 'connected-react-router';
import history from "./history";
import 'bootstrap/dist/css/bootstrap.css';
import './index.css'

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App/>
    </ConnectedRouter>
  </Provider>
  ,
  document.getElementById("root")
);

