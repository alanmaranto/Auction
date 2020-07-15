import React, { useState, Fragment } from "react";
import { Redirect, Link } from "react-router-dom";
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Icon,
  Label,
  Message,
} from "semantic-ui-react";
import { signin } from "../../api";
import { authenticate, isAuthenticated } from "../../helpers/authenticate";
import { registerUserIOToken } from "../../socket";
import { useToasts } from "react-toast-notifications";
import "./App.css";

const Login = () => {
  const [visible, setVisible] = useState(false)
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    redirectToReferrer: false,
  });

  const { email, password, loading, error, redirectToReferrer } = values;
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
      loading: true,
    });
    signin({ email, password }).then((data) => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          loading: false,
        });
      } else {
        registerUserIOToken(data.token);
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
      if (user.isApproved && user && user.role === 0) {
        return <Redirect to="/" />;
      } else if (user.isApproved && user && user.role == 1) {
        return <Redirect to="/provider-dashboard" />;
      } else {
        return <Redirect to="/not-approved" />
      }
    }
  };

  const signInForm = () => (
    <Grid textAlign="center" verticalAlign="middle" className="register">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Segment>
          <Header as="h2" icon color="violet" textAlign="center">
            <Icon name="id badge" color="violet"></Icon>
            Bienvenido
          </Header>
          <Form size="large">
            <Segment stacked>
              <Form.Field
                style={{ textAlign: "left" }}
                label="Nombre de usuario"
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
              <Button onClick={onSubmit} color="violet" fluid size="large">
                Iniciar Sesión
              </Button>
              <Message>
                ¿Aún no tienes cuenta? <Link to="/register">Regístrate</Link>
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
