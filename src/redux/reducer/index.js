import {combineReducers} from 'redux';
import { connectRouter } from 'connected-react-router'
import history from "../../history";
import tasks from "./tasks";
import auth from "./auth";
import task from "./task"


export default combineReducers({
  router: connectRouter(history),
  auth,
  tasks,
  task
})
