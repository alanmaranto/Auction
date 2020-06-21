import React, { Fragment } from "react";
import { Table, Pagination } from "semantic-ui-react";
import { PagesSizeSelect } from "./SelectOptions";
import { AuctionRow } from "./Row";
import { TBody, TFooter, TRow, TCell } from "./index";
import { TableHeader } from "./Header";

const AuctionTable = ({
  limit,
  onChangeLimit,
  auctionsContent,
  column,
  handleSort,
  direction,
  page,
}) => {
  const auctionRow =
    auctionsContent &&
    auctionsContent.map((auction, index) => (
      <AuctionRow key={index} auction={auction} />
    ));

  return (
    <Fragment>
      <PagesSizeSelect limit={limit} onChangeLimit={onChangeLimit} />
      Total :
      <Table celled selectable sortable>
        <TableHeader
          // column={}
          // direction={}
          // handleSort={}
        />
        <TBody>{auctionRow}</TBody>
        <TFooter>
          <TRow>
            <TCell colSpan="8">
              <Pagination
              // totalPages={}
                activePage={page}
                // onPageChange={}
              />
            </TCell>
          </TRow>
        </TFooter>
      </Table>
    </Fragment>
  );
};

export default AuctionTable;
