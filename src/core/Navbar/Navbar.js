import React from "react";
import { Menu, Dropdown } from "semantic-ui-react";
import { signout } from "../../api/auth";

import { withRouter } from "react-router-dom";

import "./style.css";

const Navbar = ({ history }) => {
  return (
    <div className="content-navbar">
      <Menu.Menu position="right">
        <Dropdown item text="Configuración">
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
{/*             <Dropdown.Item
              onClick={() => {
                history.push("/user/settings")
              }}
            >Configuración</Dropdown.Item>             */}
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
    </div>
  );
};

export default withRouter(Navbar);
