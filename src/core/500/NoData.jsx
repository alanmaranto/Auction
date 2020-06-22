import React, { Fragment } from "react";
import { Grid, Header, Image } from "semantic-ui-react";
import { Row, Column, HContent } from "../indexSemanticUi";
import NoAuctions from "../../assets/humaaans.png";

const NoData = ({ title }) => {
  return (
    <Fragment>
      <Grid className="no-data" container>
        <Row>
          <Column>
            <Header as="h3" textAlign="center" color="blue">
              <HContent>{title}</HContent>
            </Header>
            <Image
              className="no-data__image"
              centered
              size="large"
              src={NoAuctions}
            />
          </Column>
        </Row>
      </Grid>
    </Fragment>
  );
};

export default NoData;
