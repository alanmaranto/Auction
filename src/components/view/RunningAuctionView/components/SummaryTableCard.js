import React from "react";
import { Card } from "semantic-ui-react";
import Summary from "../../../../core/Summary";
import Scrollable from "../../../../core/Scrollable";
import { columns } from '../helper'

const SummaryTableCard = ({}) => {
  const data = [
    {
      userId: {
        name: "Proveedor 1",
      },
      bid: 2794.99,
      createdAt: "2021-01-04T05:16:35.483+00:00",
      _id: "5ff2a4b3a3b4de3e177d6423",
    },
    {
      userId: {
        name: "Proveedor 2",
      },
      bid: 2790.0,
      createdAt: "2021-01-04T05:19:35.483+00:00",
      _id: "5ff2a4b3a3b4de3e178d6423",
    },
    {
      userId: {
        name: "Proveedor 3",
      },
      bid: 2700.0,
      createdAt: "2021-01-04T05:39:35.483+00:00",
      _id: "5ff2a4b3a3b4de3e378d6423",
    },
    {
      userId: {
        name: "Proveedor 4",
      },
      bid: 2690.0,
      createdAt: "2021-01-04T05:40:35.483+00:00",
      _id: "5ff2a4b3a3b4te3e378d6423",
    },
    {
        userId: {
          name: "Proveedor 5",
        },
        bid: 2688.0,
        createdAt: "2021-01-04T05:41:35.483+00:00",
        _id: "5ff2a4b3a2b4te3e378d6423",
      },
  ];

  return (
    <Card style={{ width: 360}}>
      <Scrollable maxHeight="285px">
        <Summary filter="bid" data={data} columns={columns} />
      </Scrollable>
    </Card>
  );
};

export default SummaryTableCard;
