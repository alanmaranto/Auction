import React, { Suspense, Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import Content from "../core/Content/Content";
import { generalRoutes, buyerRoutes, suppliersRoutes } from "./routes";
import { Dimmer, Loader, Image, Segment } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

const Routes = ({ history }) => {
  const LoaderExampleLoader = () => (
    <Segment>
      <Dimmer active>
        <Loader />
      </Dimmer>
      <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
    </Segment>
  );
  return (
    <Fragment>
      <Suspense fallback={LoaderExampleLoader()}>
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
