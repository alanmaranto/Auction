import React, { useState, useEffect } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import { Grid, Button, Icon } from "semantic-ui-react";
import {
  ProSidebar,
  SidebarHeader,
  SidebarContent,
  Menu,
  MenuItem,
  SubMenu,
} from "react-pro-sidebar";
import { isAuthenticated } from "../../helpers/authenticate";
import Loader from "../Loader";
import logoB from "../../assets/Bidanna-02-altern.svg";
import logoBiddana from "../../assets/Bidanna-03-altern.svg";
import { getUserInfoById, uploadLogo } from "../../api/user";
import { useToasts } from "react-toast-notifications";
import { roles } from "../../helpers/roles";

import "react-pro-sidebar/dist/css/styles.css";
import "../../App.css";
import "./style.css";

const Sidebar = () => {
  const { addToast } = useToasts();

  const [user, setUser] = useState({});
  const [logo, setLogo] = useState("");
  const [loading, setLoading] = useState(false);

  const { token } = isAuthenticated();

  const fetchUser = async () => {
    const response = await getUserInfoById(token);

    if (!response) {
      return <Redirect to="/login" />;
    } else {
      setUser(response.data.body);
      setLogo(response.data.body.logoUrl);
    }
  };

  const onChangeLogo = (e) => {
    setLogo(e.target.files[0]);
  };

  const onSubmitLogo = async (e) => {
    setLoading(true);
    if (e) {
      e.preventDefault();
    }
    const requestBody = new FormData();
    requestBody.append("logo", logo);

    const response = await uploadLogo(token, requestBody);
    if (response.status === 200) {
      setLoading(false);
      addToast("Logo guardado con éxito", {
        appearance: "success",
        autoDismiss: true,
      });
      fetchUser();
    } else {
      setLoading(false);
      addToast("Hubo un error al guardar el logo", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, []);

  const renderBuyerSidebar = (size) => {
    if (isAuthenticated() && isAuthenticated().user.role === roles.BUYER) {
      return (
        <SidebarContent>
          <Menu iconShape="round" popperArrow>
            <MenuItem icon={<Icon name="chart line" size={size} />}>
              Dashboard
              <Link to="/" />
            </MenuItem>
            <MenuItem icon={<Icon name="chart line" size={size} />}>
              Crear Subasta
              <Link to="/create/auction" />
            </MenuItem>
            <SubMenu
              title="Subastas"
              icon={<Icon name="chart line" size={size} />}
            >
              <MenuItem icon={<Icon name="chart line" size={size} />}>
                RFI
                <Link to={`/auction/rfi/${user._id}`} />
              </MenuItem>
              <MenuItem icon={<Icon name="chart line" size={size} />}>
                FA
                <Link to={`/auction/fa/${user._id}`} />
              </MenuItem>
              <MenuItem icon={<Icon name="chart line" size={size} />}>
                A punto
                <Link to={`/auction/sub/${user._id}`} />
              </MenuItem>
              <MenuItem icon={<Icon name="chart line" size={size} />}>
                Finalizadas
                <Link to={`/auction/finalized/${user._id}`} />
              </MenuItem>
            </SubMenu>
            <MenuItem icon={<Icon name="chart line" size={size} />}>
              Mis Proveedores
              <Link to="/favorite-suppliers" />
            </MenuItem>
          </Menu>
        </SidebarContent>
      );
    }
  };

  const renderSupplierSidebar = (size) => {
    if (isAuthenticated() && isAuthenticated().user.role === roles.PROVIDER) {
      return (
        <SidebarContent>
          <Menu iconShape="round">
            <MenuItem icon={<Icon name="chart line" size={size} />}>
              Dashboard
              <Link to="/provider-dashboard" />
            </MenuItem>
            <SubMenu
              title="Subastas"
              icon={<Icon name="chart line" size={size} />}
            >
              <MenuItem icon={<Icon name="chart line" size={size} />}>
                RFI
                <Link to={`/auction/rfi-supplier/${user._id}`} />
              </MenuItem>
              <MenuItem icon={<Icon name="chart line" size={size} />}>
                FA
                <Link to={`/auction/fa-supplier/${user._id}`} />
              </MenuItem>
              <MenuItem icon={<Icon name="chart line" size={size} />}>
                A punto
                <Link to={`/auction/sub-supplier/${user._id}`} />
              </MenuItem>
            </SubMenu>
            <MenuItem icon={<Icon name="chart line" size={size} />}>
              Invitaciones
              <Link to="/invitations" />
            </MenuItem>
{/*             <MenuItem icon={<Icon name="chart line" size={size} />}>
              Subastas Ganadas
              <Link to="/wons" />
            </MenuItem> */}
          </Menu>
        </SidebarContent>
      );
    }
  };

  const renderHeaderLogo = () => {
    return (
      <Grid.Row style={{ padding: "1.2em", margin: 0 }}>
        <div className="sidebar-header">
          <div className="sidebar-header__logo">
            <img src={logoB} alt="" style={{ width: "50px", height: "30px" }} />
          </div>
          <div className="sidebar-header__logoBiddana">
            <img
              src={logoBiddana}
              alt=""
              style={{ width: "85px", height: "30px" }}
            />
          </div>
        </div>
      </Grid.Row>
    );
  };

  const renderHeader = () => {
    return (
      <Grid.Row
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {logo ? (
          <>
            {user.logoUrl ? (
              <div className="sidebar-image-container">
                <img
                  src={logo}
                  alt={`${user?.name} - ${user?.email}`}
                  className="sidebar-image-container__logo"
                />
              </div>
            ) : (
              <>
                <div className="sidebar-image-container">
                  {loading ? (
                    <Loader inverted />
                  ) : (
                    <img
                      src={logo.name ? URL.createObjectURL(logo) : user.logoUrl}
                      alt={`${user?.name} - ${user?.email}`}
                      className="sidebar-image-container__logo"
                    />
                  )}
                </div>
                <div style={{ paddingTop: "15px" }}>
                  <Button
                    icon="upload"
                    content="Guardar"
                    onClick={onSubmitLogo}
                    compact
                    size="small"
                    color="blue"
                  />
                </div>
              </>
            )}
          </>
        ) : (
          <div className="sidebar-image-input">
            <input
              className="sidebar-image-input__upload"
              type="file"
              id="file"
              accept="image/*"
              onChange={onChangeLogo}
            />
            <label className="sidebar-image-input__label" htmlFor="file">
              Subir logo
            </label>
          </div>
        )}

        <div className="sidebar-user-information-container">
          <span className="sidebar-user-information-container__name">
            {user?.name}
          </span>
          <span style={{ fontSize: "14px" }}>{user?.email}</span>
        </div>
      </Grid.Row>
    );
  };

  return (
    <ProSidebar>
      <SidebarHeader>
        {renderHeaderLogo()}
        {renderHeader()}
      </SidebarHeader>
      {renderBuyerSidebar("large")}
      {renderSupplierSidebar("large")}
    </ProSidebar>
  );
};

export default withRouter(Sidebar);
