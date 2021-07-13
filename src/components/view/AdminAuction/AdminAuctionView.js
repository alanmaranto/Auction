import React, { useState } from "react";
import {
  Grid,
  Header,
  Message,
  Accordion,
  Icon,
  Dimmer,
  Loader,
} from "semantic-ui-react";
import NoData from "../../../core/500/NoData";
import { AuctionTable } from "../../../core/AuctionTable/AuctionTable";
import { getPostTableAuctions, getBidsTableAuctions } from "./helpers";

const AdminAuctionView = ({
  loading,
  auction,
  onSubmitFilter,
  role,
  currentPage,
  onChangePage,
  onChangeLimit,
  limit,
  elementsByPage,
  onDeleteComment,
  onSubmitFilterBids,
  loadingBids,
  currentPageBids,
  onChangePageBids,
  onChangeLimitBids,
  limitBids,
  elementsByPageBids,
  onDeleteBid,
  loadingDelete,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const {
    dataSource: commentsDataSource,
    dataSourceSize: commentsDataSourceSize,
  } = onSubmitFilter();

  const { dataSource: bidsDataSource, dataSourceSize: bidsDataSourceSize } =
    onSubmitFilterBids();

  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column
          mobile={16}
          tablet={16}
          computer={16}
          largeScreen={16}
          widescreen={16}
        >
          <Header as="h2">
            <Header.Content>Subasta {auction.title}</Header.Content>
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
          <Accordion styled fluid>
            <Accordion.Title
              active={activeIndex === 0}
              index={0}
              onClick={handleClick}
            >
              <Icon name="dropdown" />
              Comentarios
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 0}>
              {loadingDelete && (
                <Dimmer active inverted>
                  <Loader inverted />
                </Dimmer>
              )}
              {commentsDataSource && commentsDataSource.length > 0 ? (
                <AuctionTable
                  role={role}
                  dataSource={commentsDataSource}
                  columns={getPostTableAuctions}
                  totalCount={commentsDataSourceSize}
                  totalPages={Math.ceil(
                    commentsDataSourceSize / elementsByPage
                  )}
                  currentPage={currentPage}
                  onChangePage={onChangePage}
                  onChangeLimit={onChangeLimit}
                  limit={limit}
                  buttonAction={onDeleteComment}
                  buttonTitle="Eliminar comentario"
                  color="red"
                  colorTable="blue"
                />
              ) : (
                <NoData
                  size="medium"
                  title="No existen comentarios para esta subasta"
                  isFetching={loading}
                />
              )}
            </Accordion.Content>

            <Accordion.Title
              active={activeIndex === 1}
              index={1}
              onClick={handleClick}
            >
              <Icon name="dropdown" />
              Pujas
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 1}>
              {loadingDelete && (
                <Dimmer active inverted>
                  <Loader inverted />
                </Dimmer>
              )}
              {bidsDataSource && bidsDataSource.length > 0 ? (
                <AuctionTable
                  role={role}
                  dataSource={bidsDataSource}
                  columns={getBidsTableAuctions}
                  totalCount={bidsDataSourceSize}
                  totalPages={Math.ceil(
                    bidsDataSourceSize / elementsByPageBids
                  )}
                  currentPage={currentPageBids}
                  onChangePage={onChangePageBids}
                  onChangeLimit={onChangeLimitBids}
                  limit={limitBids}
                  buttonAction={onDeleteBid}
                  buttonTitle="Eliminar Puja"
                  color="red"
                  colorTable="blue"
                />
              ) : (
                <NoData
                  size="medium"
                  title="No existen pujas para esta subasta"
                  isFetching={loadingBids}
                />
              )}
            </Accordion.Content>
          </Accordion>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default AdminAuctionView;
