import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import Rewards from "./components/pages/Rewards";
import ShoppingList from "./components/pages/ShoppingList";

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
              </Switch>
            </div>
          </Fragment>
        </Router>
      </TaskState>
    </RewardsState>
  );
};

export default App;
