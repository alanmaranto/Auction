import React, { useState, Fragment } from "react";
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Dropdown,
  Icon,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { signup } from "../../api";
import "./App.css";

const Register = () => {
  const { addToast } = useToasts();

  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    businessName: "",
    error: "",
    success: false,
    role: "",
  });

  const {
    email,
    password,
    confirmPassword,
    name,
    businessName,
    error,
    role
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
      signup({ email, password, name, businessName, role }).then((data) => {
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
            role: "",
            businessName: "",
            error: "",
            success: true,
          });
          addToast(
            showSuccess,
            {
              appearance: "info",
              autoDismiss: false,
            }
          );
        }
      });
    } else {
      addToast("Las contraseñas no coinciden", {
        appearance: "error",
        autoDismiss: true,
      });
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

  const showSuccess = (
      <Fragment>
        <span>
          Su cuenta ha sido creada, sin embargo estamos comprobando el estado de
          su suscripción, espere unos minutos e inicie sesión
        </span>
        <br />
        <Link to="/login">Ir a iniciar sesión</Link>
      </Fragment>
  )

    /*     <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      Su cuenta ha sido creada, sin embargo estamos comprobando el estado de su
      suscripción, le haremos llegar un correo cuando esté lista{" "}
      <Link to="/login">Iniciar Sesión</Link>
    </div> */


  const roleOptions = [
    { key: "buyer", text: "Comprador", value: "buyer" },
    { key: "provider", text: "Proveedor", value: "provider" },
  ];

  const onChangeDropdown = (event, result) => {
    const { name, value } = result || event.target;
    setValues({ ...values, [name]: value });
  };

  const signUpForm = () => (
    <Grid textAlign="center" verticalAlign="middle" className="register">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Segment stacked>
          <Header as="h2" icon color="violet" textAlign="center">
            <Icon name="add user" color="violet"></Icon>
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
              <Form.Field
                style={{ textAlign: "left" }}
                label="¿Eres comprador o proveedor?"
              />
              <Dropdown
                placeholder="Selecciona una opción"
                fluid
                selection
                options={roleOptions}
                value={role}
                name="role"
                onChange={onChangeDropdown}
              />
              <Form.Field
                style={{ textAlign: "left", paddingTop: "15px" }}
                label="Contraseña"
              />
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
          {error.length > 0 ? showError() : null }
        </Segment>
      </Grid.Column>
    </Grid>
  );
  return <div>{signUpForm()}</div>;
};

export default Register;
