import React, { Fragment } from "react";
import { Grid, Segment, Divider, Header } from "semantic-ui-react";
import { displayAuction } from "../BuyerDashboard/helpers";
import NoData from "../../../core/500/NoData";
import TotalAuctions from "../Reports/TotalAuctions";
import { AuctionFilter } from '../../../core/AuctionTable/AuctionFilter'
import { AuctionTable } from '../../../core/AuctionTable/AuctionTable'
import NativeClock from "../../../core/Clock/NativeClock";
import { getTableSettingsProviderActiveAuctions } from "../FinalizedAuctions/helper";
import { Row, Column } from "../../../core/indexSemanticUi";

import "./style.css";

const ProvidersDashboard = ({
  activeInvitedProviderAuctions,
  user,
  totalCount,
  totalPages,
  currentPage,
  onChangeLimit,
  onChangePage,
  onChangeValue,
  limit,
  buttonAction,
  loading,
}) => {
  const { name } = user || {};
  return (
    <Fragment>
      <div className="dashboard-view">
        <div className="card-graphics">
          <Grid verticalAlign="middle" textAlign="left" padded columns={1}>
            <Row className="dashboard-header">
              <Column width={13}>
                <Header className="dashboard-name" as="h1">
                  Hola {(name || "").toUpperCase()}, Bienvenido
                </Header>
              </Column>
              <Column width={3}>
                <div>
                  Hora del sistema
                  <NativeClock />
                </div>
              </Column>
            </Row>
            <Row>
              <Column width={13}>
                {/*                 <Segment>
                  <TotalAuctions />
                </Segment>
 */}{" "}
              </Column>
            </Row>
          </Grid>
          <AuctionFilter
            totalCount={totalCount}
            onChangeValue={onChangeValue}
            loading={loading}
          />
          <Divider />
          {activeInvitedProviderAuctions && activeInvitedProviderAuctions.length > 0 ? (
            <AuctionTable
              columns={getTableSettingsProviderActiveAuctions()}
              dataSource={activeInvitedProviderAuctions}
              totalCount={totalCount}
              totalPages={totalPages}
              currentPage={currentPage}
              onChangePage={onChangePage}
              onChangeLimit={onChangeLimit}
              limit={limit}
              buttonAction={buttonAction}
              buttonTitle="Ir a la subasta"
              color="blue"
              colorTable="blue"
              // handleSort={this.handleSort}
              // column={this.state._sort}
            />
          ) : (
            <NoData
              size="medium"
              title="Aquí aparecerán tus subastas activas"
            />
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProvidersDashboard;
