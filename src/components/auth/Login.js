import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Icon,
  Message,
} from "semantic-ui-react";
import { signin } from "../../api/auth";
import { authenticate, isAuthenticated } from "../../helpers/authenticate";
import { roles } from "../../helpers/roles";
import "./App.css";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    redirectToReferrer: false,
  });

  const { email, password, error, redirectToReferrer } = values;
  const { user } = isAuthenticated();

  const onChange = (name) => (event) => {
    setValues({
      ...values,
      error: false,
      [name]: event.target.value,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setValues({
      ...values,
      error: false,
    });
    signin({ email, password }).then((data) => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
        });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferrer: true,
          });
        });
      }
    });
  };

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user.isApproved && user.role === roles.BUYER) {
        return <Redirect to="/" />;
      } else if (user.isApproved && user.role === roles.PROVIDER) {
        return <Redirect to="/provider-dashboard" />;
      } else {
        return <Redirect to="/not-approved" />;
      }
    }
  };

  const signInForm = () => (
    <Grid textAlign="center" verticalAlign="middle" className="register">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Segment>
          <Header as="h2" icon color="blue" textAlign="center">
            <Icon name="id badge" color="blue"></Icon>
            Bienvenido
          </Header>
          <Form size="large">
            <Segment stacked>
              <Form.Field
                style={{ textAlign: "left" }}
                label="Correo electrónico"
              />
              <Form.Input
                fluid
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="Introduzca tu correo Electrónico"
                type="email"
                value={email}
                onChange={onChange("email")}
              />
              <Form.Field style={{ textAlign: "left" }} label="Contraseña" />
              <Form.Input
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Introduce tu contraseña"
                type="password"
                value={password}
                onChange={onChange("password")}
              />
              <Button onClick={onSubmit} color="blue" fluid size="large">
                Iniciar Sesión
              </Button>
              <Message>
                <Link to="/auth/forgot-password">
                  ¿Olvidaste tu contraseña?
                </Link>
              </Message>
              <Message>
                ¿Aún no tienes cuenta?
                <br />
                <Link to="/register">Regístrate</Link>
              </Message>
            </Segment>
          </Form>
          {error.length > 0 ? showError() : redirectUser()}
        </Segment>
      </Grid.Column>
    </Grid>
  );

  return <div>{signInForm()}</div>;
};

export default Login;
