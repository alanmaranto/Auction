import React, { Fragment } from "react";
import { Grid, Header, Image } from "semantic-ui-react";
import { Row, Column, HContent } from "../indexSemanticUi";
import NoAuctions from "../../assets/humaaans.png";

const NoData = ({ title, size }) => {
  return (
    <Fragment>
      <Grid className="no-data" container>
        <Row>
          <Column>
            <Header as="h3" textAlign="center" color="blue">
              <HContent>{title}</HContent>
            </Header>
            <Image
              centered
              size={size}
              src={NoAuctions}
            />
          </Column>
        </Row>
      </Grid>
    </Fragment>
  );
};

export default NoData;
