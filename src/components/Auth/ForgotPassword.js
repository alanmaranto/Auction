import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Icon,
  Message,
} from "semantic-ui-react";
import { forgotPassword } from "../../api";
import { isAuthenticated } from "../../helpers/authenticate";
import { useToasts } from "react-toast-notifications";
import "./App.css";

const ForgotPassword = () => {
  const { addToast } = useToasts();
  const [values, setValues] = useState({
    email: "",
    buttonText: "Recuperar Contraseña",
  });

  const { email, buttonText } = values;

  const onChange = (name) => (event) => {
    setValues({
      ...values,
      [name]: event.target.value,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setValues({
      ...values,
      buttonText: "Enviando...",
    });
    const response = await forgotPassword({ email });

    if (response && response.status === 200) {
      addToast(
        `Un email ha sido enviado a ${email}. Siga las instrucciones para restablecer su contraseña`,
        {
          appearance: "success",
          autoDismiss: true,
        }
      );
      setValues({ ...values, buttonText: "Email enviado" });
    } else {
      addToast("El usuario con ese correo no existe", {
        appearance: "error",
        autoDismiss: true,
      });
      setValues({ ...values, buttonText: "Recuperar contraseña" });
    }
  };

  const forgotPasswordForm = () => (
    <Grid textAlign="center" verticalAlign="middle" className="register">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Segment>
          <Header as="h2" icon color="grey" textAlign="center">
            <Icon name="info" color="grey"></Icon>
            Recuperar contraseña
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
                placeholder="Introduce tu correo electrónico"
                type="email"
                value={email}
                onChange={onChange("email")}
              />
              <Button onClick={onSubmit} color="grey" fluid size="large">
                {buttonText}
              </Button>
              <Message>
                 Volver a <br />
                <Link to="/login">Iniciar Sesión</Link>
              </Message>
            </Segment>
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  );

  return <div>{forgotPasswordForm()}</div>;
};

export default ForgotPassword;
