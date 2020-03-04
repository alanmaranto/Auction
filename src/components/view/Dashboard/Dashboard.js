import React, { Fragment } from "react";
import { Card } from "semantic-ui-react";

import "./style.css";

const description = "Aqui van los reportes y graficos";

const description1 = " Aqui van las subastas activas";

  const description2 = "Aqui van las subastas finalizadas";

const Dashboard = () => {
  return (
    <Fragment>
      <div className="dashboard-view">
        <div className="card-graphics">
          <Card>
            <Card.Content header="Reporte de Subastas" />
            <Card.Content description={description} />
            <Card.Content extra></Card.Content>
          </Card>
        </div>
        <div className="card-auctions">
          <Card>
            <Card.Content header="Subastas Activas" />
            <Card.Content description={description1} />
            <Card.Content extra></Card.Content>
          </Card>
          <Card>
            <Card.Content header="Subastas Finalizadas" />
            <Card.Content description={description2} />
            <Card.Content extra></Card.Content>
          </Card>
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
