import React from "react";
import { Card } from "semantic-ui-react";
import Summary from "../../../../core/Summary";
import Scrollable from "../../../../core/Scrollable";

const SummaryTableCard = ({
  data,
  columns,
  isFinalized = false,
  chooseWinnerBid,
}) => {
  return (
    <Card style={{ width: "auto" }}>
      <Scrollable maxHeight="285px">
        <Summary
          filter="bid"
          data={data}
          columns={columns}
          isFinalized={isFinalized}
          chooseWinnerBid={chooseWinnerBid}
        />
      </Scrollable>
    </Card>
  );
};

export default SummaryTableCard;
