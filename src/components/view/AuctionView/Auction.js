import React, { Fragment } from "react";
import {
  Card,
  Header,
  Grid,
  Segment,
  Icon,
  Button,
  Container,
  CardContent
} from "semantic-ui-react";
import Timer from "react-compound-timer";
import RealTimeAuction from "../RealTimeAuction/RealTimeAuctionView";

import Sidebar from "../../../core/Sidebar/Sidebar";
import Navbar from "../../../core/Navbar/Navbar";
import { timerStyle } from './style';

const sendToRealTimeAuction = () => {
  console.log("Enviando a la subasta en tiempo real");
};

const timeToAuction = [
  {
    time: 0,
    callback: () => sendToRealTimeAuction()
  }
];

const items = [
  {
    header: "showinfo",
    description: "Inofauction",
    meta: "Info"
  }
];

const AuctionView = () => {
  return (
    <Fragment>
      <div className="app">
        <div className="generalContainer">
          <Sidebar />
          <div className="content-components">
            <Navbar />
            <div className="content-dynamic">
              <Grid>
                <Grid.Row>
                  <Grid.Column>
                    <Header textAlign="left" style={{ color: '#142850', fontSize: '4em' }}>
                      AQUI SE MUESTRA EL TITULO DE LA SUBASTA
                    </Header>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2}>
                  <Grid.Column>
                    <Card style={{ height:'400px', width: '500px'}}>
                      <p>Aqui se mostrará la información de la subasta</p>
                    </Card>
                  </Grid.Column>
                  <Grid.Column>
                    <Card style={timerStyle}>
                      <div style={{ textAlign: "center" }}>
                        <h2>Tiempo para iniciar la subasta</h2>
                      </div>
{/*                       <Timer
                        initialTime={5555}
                        direction="backward"
                        lastUnit="d"
                        checkpoints={timeToAuction}
                      >
                        {() => (
                          <Fragment>
                            <div>
                            <Timer.Days /> 
                            <span>Días</span>
                            </div>
                            <Timer.Hours /> Horas
                            <Timer.Minutes /> Minutos
                            <Timer.Seconds /> Segundos
                          </Fragment>
                        )}
                      </Timer> */}
                    </Card>
                    <Segment>
                      <Header icon>
                        <Icon name="pdf file outline" />
                        No se han agregado documentos aún
                      </Header>
                      <Button primary>Agregar Documento</Button>
                    </Segment>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AuctionView;
