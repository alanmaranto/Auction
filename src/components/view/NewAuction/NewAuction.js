import React, { Fragment } from "react";
import Sidebar from "../../../core/Sidebar/Sidebar";
import Navbar from "../../../core/Navbar/Navbar";

const NewAuction = () => {
    return ( 
        <Fragment>
        <div className="app">
          <div className="generalContainer">
            <Sidebar />
            <div className="content-components">
              <Navbar />
              <div className="content-dynamic">
                <div>Hola desde New Auction</div>
              </div>
              hola
            </div>
          </div>
        </div>
      </Fragment>
     );
}
 
export default NewAuction;