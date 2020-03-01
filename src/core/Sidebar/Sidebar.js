import React, { Fragment } from "react";

import { Menu, Grid } from "semantic-ui-react";
import Navbar from "../Navbar/Navbar";

import "../../App.css";
import './style.css'

const Sidebar = () => {
  return (
    <Fragment>
      <div className="sidebar-menu">
        <Menu
          size="small"
          inverted
          fixed="left"
          vertical
          style={{ background: "#0e1c4c", fontSize: "1.2rem" }}
        />
      </div>
    </Fragment>
  );
};

export default Sidebar;
