import React, { Suspense, Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import Content from "../core/Content/Content";
import { generalRoutes } from "./routes";
import "semantic-ui-css/semantic.min.css";
import Loader from "../core/Loader";
const Routes = ({ history }) => {

  return (
    <Fragment>
      <Suspense fallback={<Loader />}>
        <Switch>
          {Object.keys(generalRoutes)
            .filter((key) => !generalRoutes[key].showSidebar)
            .map((key) => (
              <Route
                exact
                key={generalRoutes[key].path}
                path={generalRoutes[key].path}
                component={generalRoutes[key].component}
              />
            ))}
          <Content history={history} />
        </Switch>
      </Suspense>
    </Fragment>
  );
};

export default Routes;
