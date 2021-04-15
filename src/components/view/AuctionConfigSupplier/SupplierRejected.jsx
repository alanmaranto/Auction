import React from "react";
import { Message, Image, Grid } from "semantic-ui-react";
import Rejected from "../../../assets/Bidanna-08.svg";

const AuctionRejected = () => {
  return (
    <Grid.Row>
      <Grid.Column
        mobile={16}
        tablet={16}
        computer={16}
        largeScreen={16}
        widescreen={16}
      >
        <Message
          error
          header="El comprador terminó tu participación en la subasta"
          list={[
            "Esta subasta se quitará automáticamente cuando haya finalizado",
          ]}
        />
        <Image src={Rejected} size="large" centered style={{ paddingTop: 40}} />
      </Grid.Column>
    </Grid.Row>
  );
};

export default AuctionRejected;
