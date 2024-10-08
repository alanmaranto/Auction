import React from "react";
import { Divider } from "semantic-ui-react";
import { RFIAuctionsHeaderTable } from "../../../helpers/auctions";
import { AuctionTable } from "../../../core/AuctionTable/AuctionTable";
import { AuctionFilter } from "../../../core/AuctionTable/AuctionFilter";

import NoData from "../../../core/500/NoData";

const AuctionRFI = ({
  rfiAuctions,
  totalCount,
  totalPages,
  currentPage,
  onChangePage,
  onChangeLimit,
  limit,
  buttonAction,
  onChangeValue,
  loading,
  user
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
              role={user.role}
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
            <NoData size="medium" title="Aun no tienes subastas en RFI" />
          )}
        </div>
      </div>
    </>
  );
};

export default AuctionRFI;
