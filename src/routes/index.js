import React from 'react';
import Dashboard from '../components/view/Dashboard/Dashboard';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';

import 'semantic-ui-css/semantic.min.css'

const Routes = () => (
    <Router>
        <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        </Switch>
    </Router>
)

export default Routes;