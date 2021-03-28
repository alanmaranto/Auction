import React from "react";
import { Divider } from "semantic-ui-react";
import { SubAuctionsHeaderTable } from "../../../helpers/auctions";
import { AuctionTable } from "../../../core/AuctionTable/AuctionTable";
import { AuctionFilter } from "../../../core/AuctionTable/AuctionFilter";

import NoData from "../../../core/500/NoData";

const AuctionSub = ({
  subAuctions,
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
  isFetching
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
          {subAuctions && subAuctions.length > 0 ? (
            <AuctionTable
              role={user.role}
              columns={SubAuctionsHeaderTable}
              dataSource={subAuctions}
              totalCount={totalCount}
              totalPages={totalPages}
              currentPage={currentPage}
              onChangePage={onChangePage}
              onChangeLimit={onChangeLimit}
              limit={limit}
              buttonAction={buttonAction}
              buttonTitle="Detalles"
              color="blue"
              colorTable="blue"
              // handleSort={this.handleSort}
              // column={this.state._sort}
            />
          ) : (
            <NoData size="medium" title="Aun no tienes subastas en espera" isFetching={isFetching} />
          )}
        </div>
      </div>
    </>
  );
};

export default AuctionSub;
