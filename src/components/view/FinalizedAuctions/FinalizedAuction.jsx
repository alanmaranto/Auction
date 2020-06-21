import React, { Fragment } from "react";
import Sidebar from '../../../core/Sidebar/Sidebar';
import Navbar from '../../../core/Navbar/Navbar';
import TableContainer from "../../../core/Table/Container";

const FinalizedAuction = () => {
  return (
    <Fragment>
      <div className="app">
        <div className="generalContainer">
          <Sidebar />
          <div className="content-components">
            <Navbar />
            <div className="content-dynamic">
              <TableContainer />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default FinalizedAuction;
