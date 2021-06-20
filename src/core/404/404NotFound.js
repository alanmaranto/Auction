import React from "react";
import { Image, Header, Button } from "semantic-ui-react";
import Error from "../../assets/404.jpg";

import "./style.css";

const NotFound = ({ history }) => {
  return (
    <div>
      <Image centered size="big" src={Error} />
      <Header as="h2" textAlign="center" color="blue">
        <Header.Content>Pagina No Encontrada</Header.Content>
      </Header>
      <div className="button-send">
        <Button size="large" primary onClick={() => history.goBack()}>
          Volver
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
