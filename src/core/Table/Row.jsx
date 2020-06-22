import React from 'react';
import { Button } from 'semantic-ui-react';
import moment from 'moment'
import 'moment/locale/es';
import { TRow, TCell } from '../indexSemanticUi';

export const AuctionRow = ({ auction, action }) => (
    <TRow>
        <TCell>{auction.title}</TCell>
        <TCell>{moment(auction.endingAuction).format("MMMM Do YYYY, h:mm:ss a")}</TCell>
        <TCell>
            <Button
                // onClick={action}
            />
        </TCell>
    </TRow>
);