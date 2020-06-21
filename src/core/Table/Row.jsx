import React from 'react';
import { Button } from 'semantic-ui-react';
import { TRow, TCell } from './index';

export const AuctionRow = ({ auction, action }) => (
    <TRow>
        <TCell>{auction.title}</TCell>
        <TCell>{auction.endingAuction}</TCell>
        <TCell>
            <Button
                // onClick={action}
            />
        </TCell>
    </TRow>
);