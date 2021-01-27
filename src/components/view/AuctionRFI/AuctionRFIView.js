import React from "react";
import { Grid, Segment, Divider, Header } from "semantic-ui-react";
import { RFIAuctionsHeaderTable } from '../../../helpers/auctions'
import { AuctionTable } from "../../../core/AuctionTable/AuctionTable";
import { AuctionFilter } from "../../../core/AuctionTable/AuctionFilter";

import NoData from "../../../core/500/NoData";

const AuctionRFI = ({
  rfiAuctions,
  user,
  totalCount,
  totalPages,
  currentPage,
  onChangePage,
  onChangeLimit,
  limit,
  buttonAction,
  onChangeValue,
  loading,
}) => {
  return (
    <>
      <div className="dashboard-view">
        <div className="card-graphics">
          <AuctionFilter
            totalCount={totalCount}
            onChangeValue={onChangeValue}
            loading={loading}
          />
          <Divider />
          {rfiAuctions && rfiAuctions.length > 0 ? (
            <AuctionTable
              columns={RFIAuctionsHeaderTable}
              dataSource={rfiAuctions}
              totalCount={totalCount}
              totalPages={totalPages}
              currentPage={currentPage}
              onChangePage={onChangePage}
              onChangeLimit={onChangeLimit}
              limit={limit}
              buttonAction={buttonAction}
              buttonTitle="Detalles"
              color="green"
              colorTable="green"
              // handleSort={this.handleSort}
              // column={this.state._sort}
            />
          ) : (
            <NoData
              size="medium"
              title="Aun no tienes subastas en RFI"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default AuctionRFI;
