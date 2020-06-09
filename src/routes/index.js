import React from "react";
import { Switch, Route } from "react-router-dom";

import Dashboard from "../components/view/Dashboard/DashboardContainer";
import NotFound from "../core/404/404NotFound";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import Settings from "../components/user/Settings";
import NewAuction from "../components/view/NewAuction/NewAuction";
import AuctionView from "../components/view/AuctionView/AuctionContainer";
import RealTimeAuctionView from '../components/view/RealTimeAuction/RealTimeAuctionView';
import RunningAuctionView from "../components/view/RunningAuctionView";

import "semantic-ui-css/semantic.min.css";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Dashboard} />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    <Route path="/user/settings" component={Settings} />
    <Route path="/create/auction" component={NewAuction} />
    <Route path="/auction/:id" component={AuctionView} />
    <Route path="/runningAuction/:id" component={RunningAuctionView} />
    <Route path="/real-time/:id" component={RealTimeAuctionView} />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
