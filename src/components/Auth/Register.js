import React, { useState } from "react";
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { signup } from "../../api";
import "./App.css";

const Register = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    businessName: "",
    error: "",
    success: false,
  });

  const {
    email,
    password,
    confirmPassword,
    name,
    businessName,
    error,
    success,
  } = values;

  const onChange = (name) => (e) => {
    setValues({
      ...values,
      error: false,
      [name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setValues({
      ...values,
      error: false,
    });
    if (password === confirmPassword) {
      signup({ email, password, name, businessName }).then((data) => {
        if (data.error) {
          setValues({
            ...values,
            error: data.error,
            success: false,
          });
        } else {
          setValues({
            ...values,
            email: "",
            password: "",
            confirmPassword: "",
            name: "",
            businessName: "",
            error: "",
            success: true,
          });
        }
      });
    } else {
      return false;
    }
  };

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      Su cuenta ha sido creada, sin embargo aún la estamos autorizando, le
      haremos llegar un correo cuando esté lista{" "}
      <Link to="/login">Iniciar Sesión</Link>
    </div>
  );

  const signUpForm = () => (
    <Grid textAlign="center" verticalAlign="middle" className="register">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Segment stacked>
          <Header as="h2" icon color="blue" textAlign="center">
            <Icon name="id badge" color="blue"></Icon>
            Registrarse
          </Header>
          <Form size="large">
            <Segment stacked>
              <Form.Field
                style={{ textAlign: "left" }}
                label="Nombre de usuario"
              />
              <Form.Input
                fluid
                name="name"
                icon="user"
                iconPosition="left"
                placeholder="Introduzca un nombre de usuario"
                type="text"
                value={name}
                onChange={onChange("name")}
              />
              <Form.Field
                style={{ textAlign: "left" }}
                label="Correo electrónico"
              />
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
              <Form.Field style={{ textAlign: "left" }} label="Contraseña" />
              <Form.Input
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Debe ser mayor a 8 caractéres"
                type="password"
                value={password}
                onChange={onChange("password")}
              />
              <Form.Field
                style={{ textAlign: "left" }}
                label="Confirmar contraseña"
              />
              <Form.Input
                fluid
                name="passwordConfirmation"
                icon="repeat"
                iconPosition="left"
                placeholder="Confirmar contraseña"
                type="password"
                value={confirmPassword}
                onChange={onChange("confirmPassword")}
              />

              <Button onClick={onSubmit} color="blue" fluid size="large">
                Enviar
              </Button>
              <Message>
                ¿Ya eres un usuario? <Link to="/login">Inicia Sesión</Link>
              </Message>
            </Segment>
          </Form>
          {error.length > 0 ? showError() : showSuccess()}
        </Segment>
      </Grid.Column>
    </Grid>
  );
  return <div>{signUpForm()}</div>;
};

export default Register;
