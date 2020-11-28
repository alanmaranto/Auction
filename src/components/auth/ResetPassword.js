import React, { useState, useEffect } from "react";
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
import jwt from "jsonwebtoken";
import { resetPassword } from "../../api/api";
import { useToasts } from "react-toast-notifications";
import "./App.css";

const ResetPassword = ({ match }) => {
  const { addToast } = useToasts();
  const [values, setValues] = useState({
    name: "",
    token: "",
    newPassword: "",
    buttonText: "Cambiar contraseña",
  });

  useEffect(() => {
    let token = match.params.token;
    let { name } = jwt.decode(token);

    if (token) {
      setValues({ ...values, name, token });
    }
  }, []);

  const { name, token, newPassword, buttonText } = values;

  const onChange = (event) => {
    setValues({
      ...values,
      newPassword: event.target.value,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setValues({
      ...values,
      buttonText: "Enviando...",
    });

    const data = {
      newPassword,
      resetPasswordLink: token,
    };
    const response = await resetPassword(data);

    if (response && response.status === 200) {
      addToast("Genial. Ahora puedes iniciar sesión con tu nueva contraseña", {
        appearance: "success",
        autoDismiss: true,
      });
      setValues({ ...values, buttonText: "Listo" });
    } else {
      addToast("El link expiró o la contraseña no tiene más de 8 caractéres", {
        appearance: "error",
        autoDismiss: true,
      });
      setValues({ ...values, buttonText: "Resetear contraseña" });
    }
  };

  const resetPasswordForm = () => (
    <Grid textAlign="center" verticalAlign="middle" className="register">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Segment>
          <Header as="h2" icon color="green" textAlign="center">
            <Icon name="id badge" color="green"></Icon>
            Hola {name}, escribe tu nueva contraseña
          </Header>
          <Form size="large">
            <Segment stacked>
              <Form.Field style={{ textAlign: "left" }} label="Contraseña" />
              <Form.Input
                fluid
                required
                name="newPassword"
                icon="mail"
                iconPosition="left"
                placeholder="Introduce tu nueva contraseña"
                type="password"
                value={newPassword}
                onChange={onChange}
              />
              <Button onClick={onSubmit} color="violet" fluid size="large">
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

  return <div>{resetPasswordForm()}</div>;
};

export default ResetPassword;
