import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { signout } from "../../api/auth";
import history from "../../modules/history/history";

import {
  Grid,
  Segment,
  Header,
  Icon,
  Message,
} from "semantic-ui-react";

const NotApproved = () => {

  useEffect(() => {
      signout(() => {
        history.push("/not-approved");
      })
  }, []);

  return (
    <Grid textAlign="center" verticalAlign="middle" className="register">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Segment>
          <Header as="h2" icon color="red" textAlign="center">
            <Icon name="ban" color="red"></Icon>
            Sin autorización
          </Header>
          <Message>
            <Message.Header>Usuario inactivo</Message.Header>
            <p>
              Hola, estamos aprobando tu cuenta, este proceso puede demorar
              hasta un par de horas. Serás notificado cuando puedas utilizar tu
              cuenta.
            </p>
          </Message>
          <Message>
            <Link to="/login">Regresar a iniciar sesión</Link>
          </Message>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default NotApproved;
