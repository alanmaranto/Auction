import React from "react";
import { Grid, Header, Message, Divider } from "semantic-ui-react";
import { AuctionTable } from "../../../core/AuctionTable/AuctionTable";
import { AuctionFilter } from "../../../core/AuctionTable/AuctionFilter";
import getTableAuctions from "./helper";
import NoData from "../../../core/500/NoData";

const Admin = ({
  totalCount,
  onFilterChangeValue,
  onSubmitFilter,
  currentPage,
  loading,
  onChangePage,
  onChangeLimit,
  limit,
  sendToAuctionInformation,
  user,
  elementsByPage
}) => {
  const { dataSource, dataSourceSize } = onSubmitFilter();

  return (
    <Grid textAlign="left" padded columns={16}>
      <Grid.Row>
        <Grid.Column
          mobile={16}
          tablet={16}
          computer={16}
          largeScreen={16}
          widescreen={16}
        >
          <Header as="h2">
            <Header.Content>Subastas</Header.Content>
          </Header>
          <Message color="blue">
            Aquí encontrarás el listado de todas las subastas que se han
            registrado en Biddana
          </Message>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column
          mobile={16}
          tablet={16}
          computer={16}
          largeScreen={16}
          widescreen={16}
        >
          <AuctionFilter
            totalCount={totalCount}
            onChangeValue={onFilterChangeValue}
            loading={loading}
          />
          <Divider />
          {dataSource && dataSource.length > 0 ? (
            <AuctionTable
              role={user.role}
              dataSource={dataSource}
              columns={getTableAuctions}
              totalCount={dataSourceSize}
              totalPages={Math.ceil(dataSourceSize / elementsByPage)}
              currentPage={currentPage}
              onChangePage={onChangePage}
              onChangeLimit={onChangeLimit}
              limit={limit}
              buttonAction={sendToAuctionInformation}
              buttonTitle="Detalles"
              color="blue"
              colorTable="blue"
            />
          ) : (
            <NoData
              size="medium"
              title="Aún no existen subastas"
              isFetching={loading}
            />
          )}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Admin;
