import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducer';
import { routerMiddleware } from 'connected-react-router'
import history from "../history";

const enhancer = applyMiddleware(
  thunk,
  routerMiddleware(history),
);

export default createStore(reducer, composeWithDevTools(enhancer));
