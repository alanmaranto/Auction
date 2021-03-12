import React from "react";
import { Card } from "semantic-ui-react";
import Summary from "../../../../core/Summary";
import Scrollable from "../../../../core/Scrollable";
import { columns } from '../helpers'

const SummaryTableCard = ({ data }) => {
  return (
    <Card style={{ width: 'auto'}}>
      <Scrollable maxHeight="285px">
        <Summary filter="bid" data={data} columns={columns} />
      </Scrollable>
    </Card>
  );
};

export default SummaryTableCard;