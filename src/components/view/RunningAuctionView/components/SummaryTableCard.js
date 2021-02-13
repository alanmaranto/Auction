import React from "react";
import { Card } from "semantic-ui-react";
import Summary from "../../../../core/Summary";
import Scrollable from "../../../../core/Scrollable";
import { columns } from "../helper";

const SummaryTableCard = ({ summaryBids }) => {
  return (
    <Card style={{ width: 360 }}>
      <Scrollable maxHeight="285px">
        <Summary filter="bid" data={summaryBids} columns={columns} />
      </Scrollable>
    </Card>
  );
};

export default SummaryTableCard;
