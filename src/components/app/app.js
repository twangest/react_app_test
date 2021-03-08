import React from "react";
import Header from '../header'
import StartPage from "../start-page";
import Login from '../login-form'
import {Switch, Route, Redirect} from "react-router-dom";
import TaskForm from "../tasks/task-form";
import {TASKS_URL} from "../../redux/constants";

function App() {
  return (
    <div>
      <Header/>
      <div className="container">
        <Switch>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/create" component={TaskForm}/>
          <Route exact path="/edit/:id" component={TaskForm}/>
          <Route path={TASKS_URL} component={StartPage}/>
          <Route><Redirect to={TASKS_URL} /></Route>
        </Switch>
      </div>
    </div>);
}
export default App;
