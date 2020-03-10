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
  GridRow
} from "semantic-ui-react";
import DatePicker from "react-datepicker";
import moment from 'moment'
import { Link } from "react-router-dom";

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
    finalized: false,
    error: "",
    loading: false,
    redirectToAuction: false,
    createdAuction: ""
  });

  const {
    title,
    finalized,
    redirectToAuction,
    createdAuction,
    error,
    loading
  } = values;

  const auction = {
    ...values,
    openingAuction,
    endingAuction,
  };

  console.log("jola", auction);

  const { user, token } = isAuthenticated();
  console.log("user", user);
  console.log("token", token);

/*   useEffect(() => {
    setValues({ ...values });
  }, []); */

  const onChange = name => e => {
    setValues({
      ...values,
      error: false,
      [name]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    setValues({ ...values, error: "", loading: true });
    console.log("ss", setValues({ ...values, error: "", loading: true }));

    createAuction(user._id, token, auction).then(data => {
      console.log("data", data);
      if (data.error) {
        console.log("dataerror", data.error);
        setValues({ ...values, error: data.error });
      } else {
        console.log("herepass");
        setValues({
          ...values,
          title: "",
          openingAuction: "",
          endingAuction: "",
          finalized: false,
          createdAuction: data.title
        });
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
                  <Header textAlign="center" as="h1">
                    Crear Nueva Subasta
                    <Header.Subheader>
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
                      <Form.Field label="Fecha de comienzo de la subasta" />
                      <DatePicker
                        placeholderText="Introduzca la fecha de comienzo para la subasta"
                        selected={openingAuction}
                        onChange={date => setOpeningAuction(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={30}
                        timeCaption="time"
                        dateFormat="MMMM d, yyyy h:mm aa"
                      />
                      <Form.Field label="Fecha de finalización de la subasta" />
                      <DatePicker
                        placeholderText="Introduzca la fecha de finalización para la subasta"
                        selected={endingAuction}
                        onChange={date => setEndingAuction(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={30}
                        timeCaption="time"
                        dateFormat="MMMM d, yyyy h:mm aa"
                      />
                      <Grid textAlign="center" columns={2}>
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
                          <Link to="/auctionid">
                              <Button
                                fluid
                                compact
                                className="button-cancel-new-auction"
                                fluid
                                size="medium"
                              >
                                Ir a vista AuctionId
                              </Button>
                            </Link>
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
