import React, { Suspense } from "react";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import { Route, Redirect } from "react-router-dom";
import Error404 from "../404/404NotFound";
import { matchPath } from "react-router";
import { generalRoutes } from "../../routes/routes";
import { isAuthenticated } from "../../helpers/authenticate";
import Loader from "../Loader";
import "../../App.css";

const Content = ({ children, history, location }) => {
  const validateRoute = () => {
    let isValid = false;
    const routes = Object.values(generalRoutes);

    routes.forEach((route) => {
      if (
        matchPath(location.pathname, {
          path: `${route.path}`,
          exact: true,
        })
      ) {
        isValid = true;
      }
    });

    return isValid;
  };
  if (!validateRoute()) return <Error404 history={history} />;

  const { user } = isAuthenticated();

  return (
    <div className="app">
      <div className="generalContainer">
        <Sidebar history={history} />
        <div className="content-components">
          <Navbar history={history} />
          <div className="content-dynamic">
            {children}
            <Suspense fallback={<Loader />}>
              {isAuthenticated() ? (
                Object.keys(generalRoutes)
                  .filter((key) => generalRoutes[key].showSidebar)
                  .map((key) => (
                    <Route
                      exact
                      key={generalRoutes[key].path}
                      path={generalRoutes[key].path}
                      component={generalRoutes[key].component}
                    />
                  ))
              ) : (
                <Redirect to={{ pathname: "/login" }} />
              )}
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
