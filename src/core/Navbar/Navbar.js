import React from "react";
import { Menu, Icon, Dropdown } from "semantic-ui-react";

import { signout } from "../../api";

import "./style.css";
import { withRouter } from "react-router-dom";

const Navbar = ({ history }) => {
  return (
    <Menu size="mini" icon="labeled" className="auctionNavbar" fixed="top">

      <Menu.Menu position="right">
        <Dropdown item text="Perfil">
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() =>
                signout(() => {
                  history.push("/login");
                })
              }
            >
              Cerrar Sesión
            </Dropdown.Item>
            <Dropdown.Item>Configuración</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
    </Menu>
  );
};

export default withRouter(Navbar);
