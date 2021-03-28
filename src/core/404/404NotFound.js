import React from "react";
import { Image, Header, Button } from "semantic-ui-react";
import Error from "../../assets/404.jpg";
import { roles } from "../../helpers/roles";
import { isAuthenticated } from "../../helpers/authenticate";

import "./style.css";

const NotFound = ({ history }) => {
  // const { user } = isAuthenticated();
  return (
    <div>
      <Image centered size="big" src={Error} />
      <Header as="h2" textAlign="center" color="blue">
        <Header.Content>Pagina No Encontrada</Header.Content>
      </Header>
      <div className="button-send">
        <Button
          size="large"
          primary
          onClick={
            () => history.push("/")
/*             user.role === roles.BUYER
              ? () => {
                  history.push("/");
                }
              : () => {
                  history.push("/provider-dashboard");
                } */
          }
        >
          Ir a Dashboard
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
