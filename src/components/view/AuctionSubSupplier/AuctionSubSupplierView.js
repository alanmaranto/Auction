import React from "react";
import { Divider } from "semantic-ui-react";
import { getTableSettingsProviderActiveAuctions } from "../FinalizedAuctions/helper";
import { AuctionTable } from "../../../core/AuctionTable/AuctionTable";
import { AuctionFilter } from "../../../core/AuctionTable/AuctionFilter";

import NoData from "../../../core/500/NoData";

const AuctionSubSupplier = ({
  subSupplierAuctions,
  totalCount,
  totalPages,
  currentPage,
  onChangePage,
  onChangeLimit,
  limit,
  buttonAction,
  onChangeValue,
  loading,
  user,
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
          {subSupplierAuctions && subSupplierAuctions.length > 0 ? (
            <AuctionTable
              role={user.role}
              columns={getTableSettingsProviderActiveAuctions}
              dataSource={subSupplierAuctions}
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
            <NoData size="medium" title="Aun no tienes subastas en RFI" isFetching={isFetching} />
          )}
        </div>
      </div>
    </>
  );
};

export default AuctionSubSupplier;
