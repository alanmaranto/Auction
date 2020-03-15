import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Dashboard from "../components/view/Dashboard/DashboardContainer";
import NotFound from "../core/404/404NotFound";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Settings from '../components/user/Settings';
import NewAuction from '../components/view/NewAuction/NewAuction'
import AuctionView from '../components/view/AuctionView/Auction'

import "semantic-ui-css/semantic.min.css";

const Routes = () => (
  <Router>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/user/settings" component={Settings} />
        <Route path="/create/auction" component={NewAuction} />
        <Route path="/auctionid" component={AuctionView} />
        <Route component={NotFound} />
      </Switch>
  </Router>
);

export default Routes;
