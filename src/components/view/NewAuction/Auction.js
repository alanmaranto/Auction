import React, { Fragment } from "react";
import { Card } from "semantic-ui-react";
import Timer from "react-compound-timer";
import RealTimeAuction from "../RealTimeAuction/RealTimeAuctionView";

import Sidebar from "../../../core/Sidebar/Sidebar";
import Navbar from "../../../core/Navbar/Navbar";

const sendToRealTimeAuction = () => {
  console.log("Enviando a la subasta en tiempo real");
};

const timeToAuction = [
  {
    time: 0,
    callback: () => sendToRealTimeAuction()
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
              <Card>
                <Timer
                  initialTime={5555}
                  direction="backward"
                  lastUnit="d"
                  checkpoints={timeToAuction}
                >
                  {() => (
                    <Fragment>
                      <Timer.Days /> Días
                      <Timer.Hours /> Horas
                      <Timer.Minutes /> Minutos
                      <Timer.Seconds /> Segundos
                    </Fragment>
                  )}
                </Timer>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AuctionView;
