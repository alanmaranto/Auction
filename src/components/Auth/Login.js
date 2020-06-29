import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Icon,
} from "semantic-ui-react";
import { signin } from "../../api";
import { authenticate, isAuthenticated } from "../../helpers/authenticate";
import { registerUserIOToken } from '../../socket';
import "./App.css";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    redirectToReferrer: false
  });

  const { email, password, loading, error, redirectToReferrer } = values;
  const { user } = isAuthenticated()

  const onChange = name => event => {
    setValues({
      ...values,
      error: false,
      [name]: event.target.value
    });
  };

  const onSubmit = async event => {
    event.preventDefault();
    setValues({
      ...values,
      error: false,
      loading: true
    });
    signin({ email, password }).then(data => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          loading: false
        });
      } else {
        registerUserIOToken(data.token);
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferrer: true
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

  const showLoading = () =>
    loading && (
      <div className="alert alert-info">
        <h2>Loading...</h2>
      </div>
    );

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user && user.role === 0) {
        return <Redirect to="/" />;
      } else if (user && user.role == 1) {
        return <Redirect to="/provider-dashboard" />
      } else {
        return <Redirect to ="/" />
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />
    }
  };

  const signInForm = () => (
    <Grid textAlign="center" verticalAlign="middle" className="register">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Segment>
          <Header as="h2" icon color="violet" textAlign="center">
            <Icon name="id badge" color="violet"></Icon>
            Iniciar Sesión
          </Header>
          <Form size="large">
            <Segment stacked>
              <Form.Input
                fluid
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="Introduzca un correo Electrónico"
                type="email"
                value={email}
                onChange={onChange("email")}
              />
              <Form.Input
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Introduce una contraseña (Debe ser mayor a 8 caractéres)"
                type="password"
                value={password}
                onChange={onChange("password")}
              />
              <Button onClick={onSubmit} color="violet" fluid size="large">
                Enviar
              </Button>
            </Segment>
          </Form>
          {error.length > 0 ? showError() : redirectUser()}
        </Segment>
      </Grid.Column>
    </Grid>
  );

  return (
    <div>
      {/* {showLoading()} */}
      {signInForm()}
    </div>
  );
};

export default Login;
