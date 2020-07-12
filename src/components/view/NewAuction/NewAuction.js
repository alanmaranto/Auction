import React, { Fragment, useEffect, useState } from "react";
import {
  Card,
  Button,
  Form,
  Input,
  Grid,
  Header,
  Segment,
  GridColumn,
  GridRow,
} from "semantic-ui-react";
import DatePicker from "react-datepicker";
import moment from "moment";
import { Link } from "react-router-dom";
import history from "../../../modules/history/history";

import Sidebar from "../../../core/Sidebar/Sidebar";
import Navbar from "../../../core/Navbar/Navbar";

import { isAuthenticated } from "../../../helpers/authenticate";
import { createAuction } from "../../../api";

import "./style.css";
import "react-datepicker/dist/react-datepicker.css";

const NewAuction = () => {
  const [openingAuction, setOpeningAuction] = useState("");
  const [endingAuction, setEndingAuction] = useState("");
  const [values, setValues] = useState({
    title: "",
    description: "",
    minimunPrice: null,
    minimumBid: null,
    finalized: false,
    error: "",
    loading: false,
    redirectToAuction: false,
    createdAuction: "",
  });

  const {
    title,
    description,
    minimumBid,
    minimunPrice,
    finalized,
    redirectToAuction,
    createdAuction,
    error,
    loading,
  } = values;

  const { user, token } = isAuthenticated();

  const auction = {
    ...values,
    openingAuction,
    endingAuction,
    user: user._id,
  };

  const onChange = (name) => (e) => {
    setValues({
      ...values,
      error: false,
      [name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: "", loading: true });

    createAuction(user._id, token, auction).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          title: "",
          description: "",
          minimumBid: null,
          minimunPrice: null,
          finalized: false,
          redirectToAuction: true,
          createdAuction: data.title,
        });
        history.push(`/`);
      }
    });
  };

  const newAuctionForm = () => (
    <Fragment>
      <div className="app">
        <div className="generalContainer">
          <Sidebar />
          <div className="content-components">
            <Navbar />
            <div className="content-dynamic">
              <Grid verticalAlign="top" container centered columns={1}>
                <Grid.Column>
                  <Header
                    textAlign="center"
                    style={{ color: "#142850", fontSize: "4em" }}
                  >
                    Crear Nueva Subasta
                    <Header.Subheader
                      style={{ fontSize: "0.5em", marginBottom: "30px" }}
                    >
                      Configura la información de la nueva subasta
                    </Header.Subheader>
                  </Header>
                  <Form size="large" onSubmit={onSubmit}>
                    <Segment>
                      <Form.Field label="Titulo de la subasta" />
                      <Form.Input
                        placeholder="Introduzca un nombre para la subasta"
                        type="text"
                        value={title}
                        name="title"
                        onChange={onChange("title")}
                      />
                      <Form.Field label="Descripción de la subasta (Opcional)" />
                      <Form.TextArea
                        placeholder="Descripción (Opcional)"
                        type="textarea"
                        value={description}
                        name="title"
                        onChange={onChange("description")}
                      />
                      <Form.Field label="Precio base" />
                      <Form.Input
                        placeholder="Es el precio con el que iniciará la subasta"
                        type="number"
                        value={minimunPrice}
                        name="minimumPrice"
                        onChange={onChange("minimumPrice")}
                      />
                      <Form.Field label="Puja mínima recomendada" />
                      <Form.Input
                        placeholder="Es la puja que recomiendas que hagan los proveedores"
                        type="number"
                        value={minimumBid}
                        name="minimumBid"
                        onChange={onChange("minimumBid")}
                      />
                      <Form.Field label="Fecha de comienzo de la subasta" />
                      <DatePicker
                        placeholderText="Introduzca la fecha de comienzo para la subasta"
                        selected={openingAuction}
                        onChange={(date) => setOpeningAuction(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={30}
                        timeCaption="time"
                        dateFormat="MMMM d, yyyy h:mm aa"
                      />
                      <Form.Field
                        style={{ paddingTop: "20px" }}
                        label="Fecha de finalización de la subasta"
                      />
                      <DatePicker
                        placeholderText="Introduzca la fecha de finalización para la subasta"
                        selected={endingAuction}
                        onChange={(date) => setEndingAuction(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={30}
                        timeCaption="time"
                        dateFormat="MMMM d, yyyy h:mm aa"
                      />
                      <Grid
                        style={{ paddingTop: "20px" }}
                        textAlign="center"
                        columns={2}
                      >
                        <GridRow>
                          <GridColumn>
                            <Link to="/">
                              <Button
                                fluid
                                compact
                                className="button-cancel-new-auction"
                                fluid
                                size="medium"
                              >
                                Cancelar
                              </Button>
                            </Link>
                          </GridColumn>
                          <GridColumn>
                            <Button
                              fluid
                              compact
                              className="button-submit-new-auction"
                              fluid
                              size="medium"
                            >
                              Enviar
                            </Button>
                          </GridColumn>
                        </GridRow>
                      </Grid>
                    </Segment>
                  </Form>
                </Grid.Column>
              </Grid>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );

  return <div>{newAuctionForm()}</div>;
};

export default NewAuction;
