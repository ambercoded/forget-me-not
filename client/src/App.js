import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import Rewards from "./components/rewards/Rewards";
import ShoppingList from "./components/pages/ShoppingList";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

import TaskState from "./context/task/TaskState";
import RewardsState from "./context/rewards/RewardsState";

const App = () => {
  return (
    <RewardsState>
      <TaskState>
        <Router>
          <Fragment>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/rewards" component={Rewards} />
                <Route exact path="/shopping-list" component={ShoppingList} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
              </Switch>
            </div>
          </Fragment>
        </Router>
      </TaskState>
    </RewardsState>
  );
};

export default App;
