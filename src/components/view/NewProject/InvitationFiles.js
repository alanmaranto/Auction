import React from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  GridColumn,
  GridRow,
} from "semantic-ui-react";
import DatePicker, { registerLocale } from "react-datepicker";
import { Link } from "react-router-dom";

const InvitationFiles = ({
  values,
  onSubmit,
  onChange,
  openingAuction,
  setOpeningAuction,
  endingAuction,
  setEndingAuction,
}) => {
  console.log(values);
  return (
    <>
      <div>InvitationFiles</div>
      <Grid verticalAlign="top" container centered columns={1}>
        <Grid.Column>
          <Header
            textAlign="center"
            style={{ color: "#142850", fontSize: "3em" }}
          >
            Crear Nueva Subasta
            <Header.Subheader
              style={{ fontSize: "0.45em", marginBottom: "30px" }}
            >
              Configura la información de la nueva subasta
            </Header.Subheader>
          </Header>
          <Form size="large" onSubmit={onSubmit}>
            <Segment>
              <Form.Field label="Titulo de la subasta" required />
              <Form.Input
                placeholder="Introduzca un nombre para la subasta"
                type="text"
                value={values.title}
                name="title"
                onChange={onChange("title")}
              />
              <Form.Field label="Descripción de la subasta (Opcional)" />
              <Form.TextArea
                placeholder="Descripción (Opcional)"
                type="textarea"
                value={values.description}
                name="title"
                onChange={onChange("description")}
              />
              <Form.Field label="Precio base" required />
              {/*               <Form.Input
                  placeholder="Es el precio con el que iniciará la subasta"
                  type="number"
                  value={minimunPrice}
                  name="minimumPrice"
                  onChange={onChange("minimumPrice")}
                /> */}
              <Form.Field label="Puja mínima recomendada" required />
              <Form.Input
                placeholder="Es la puja que recomiendas que hagan los proveedores"
                type="number"
                value={values.minimumBid}
                name="minimumBid"
                onChange={onChange("minimumBid")}
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
                timeIntervals={15}
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"
                minDate={new Date()}
                locale="es"
                className="selected-date"
                style={{ width: "-webkit-fill-available" }}
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
    </>
  );
};

export default InvitationFiles;
