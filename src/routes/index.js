import React from "react";
import { Switch, Route } from "react-router-dom";
import BuyerDashboard from "../components/view/BuyerDashboard/DashboardContainer";
import NotFound from "../core/404/404NotFound";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
// import Settings from "../components/user/Settings";
import NewAuction from "../components/view/NewAuction/NewAuction";
import AuctionView from "../components/view/AuctionView/AuctionContainer";
import RunningAuctionView from "../components/view/RunningAuctionView";
// import AdminRoutes from "./AdminRoutes";
import BuyersRoutes from "./BuyersRoutes";
import ProvidersRoutes from "./ProvidersRoutes";
import FinalizedAuction from '../components/view/FinalizedAuctions/FinalizedAuction';
import ProviderDashboard from '../components/view/ProviderDashboard/ProviderDashboardView';
// import WonAuctionsView from '../components/view/WonAuctions/WonAuctionsView'
import ChooseWinnerView from '../components/view/ChooseWinner/ChooseWinnerView';
import NotApproved from '../components/auth/NotApprove';
import ForgotPassword from '../components/auth/ForgotPassword';
import ResetPassword from '../components/auth/ResetPassword';
import "semantic-ui-css/semantic.min.css";

const Routes = () => (
  <Switch>
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    {/* <Route path="/user/settings" component={Settings} /> */}
    <Route path="/create/auction" component={NewAuction} />
    <Route path="/auction/:id" component={AuctionView} />
    <Route path="/runningAuction/:id" component={RunningAuctionView} />
    <Route path="/not-approved" component={NotApproved} />
    <Route path="/auth/forgot-password" component={ForgotPassword} />
    <Route path="/auth/password/reset/:token" component={ResetPassword} />
    <BuyersRoutes exact path="/" component={BuyerDashboard} />
    <BuyersRoutes path="/finalized" exact component={FinalizedAuction} />
    <BuyersRoutes exact path="/winner/auction/:id" component={ChooseWinnerView} />
    <ProvidersRoutes path="/provider-dashboard" exact component={ProviderDashboard} />
    {/* <ProvidersRoutes path="/wons" exact component={WonAuctionsView} /> */}
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
