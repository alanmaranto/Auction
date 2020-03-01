import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Dashboard from "../components/view/Dashboard/Dashboard";
import NotFound from "../core/404/404NotFound";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Settings from '../components/user/Settings';

import "semantic-ui-css/semantic.min.css";

const Routes = () => (
  <Router>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/user/settings" component={Settings} />
        <Route component={NotFound} />
      </Switch>
  </Router>
);

export default Routes;
