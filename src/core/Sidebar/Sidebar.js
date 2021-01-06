import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated } from "../../helpers/authenticate";
import { Grid, Image, Button, Dimmer } from "semantic-ui-react";
import Loader from "../Loader";
import AuctionIcon from "../../assets/auction.svg";
import Dashboard from "../../assets/dashboard.svg";
import A1 from "../../assets/auctionicon.svg";
import logoB from "../../assets/Bidanna-02-altern.svg";
import logoBiddana from "../../assets/Bidanna-03-altern.svg";
import { getUserInfoById, uploadLogo } from "../../api/user";
import { useToasts } from "react-toast-notifications";

import { roles } from "../../helpers/roles";

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
    setUser(response.data.body);
    setLogo(response.data.body.logoUrl);
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

  return (
    <div className="sidebar-menu">
      <Grid>
        <Grid.Column>
          <Grid.Row style={{ padding: "1.2em", margin: 0 }}>
            <div className="sidebar-header">
              <div className="sidebar-header__logo">
                <img
                  src={logoB}
                  alt=""
                  style={{ width: "50px", height: "30px" }}
                />
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

          <Grid.Row
            style={{
              justifyContent: "center",
              flexDirection: "column",
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
                          src={
                            logo.name ? URL.createObjectURL(logo) : user.logoUrl
                          }
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
                  <br />
                  PNG o JPG
                </label>
              </div>
            )}

            <div className="sidebar-user-information-container">
              <span className="sidebar-user-information-container__name">
                {user?.name}
              </span>
              <span>{user?.email}</span>
            </div>
          </Grid.Row>

          {isAuthenticated() && isAuthenticated().user.role === roles.BUYER && (
            <Grid.Row>
              <Link to="/">
                <div className="sidebar-options">
                  <span>
                    <Image src={Dashboard} />
                  </span>
                  <span className="option-title">Dashboard</span>
                </div>
              </Link>
            </Grid.Row>
          )}
          {isAuthenticated() && isAuthenticated().user.role === roles.PROVIDER && (
            <Grid.Row>
              <Link to="/provider-dashboard">
                <div className="sidebar-options">
                  <span>
                    <Image src={Dashboard} />
                  </span>
                  <span className="option-title">Dashboard</span>
                </div>
              </Link>
            </Grid.Row>
          )}
          {isAuthenticated() && isAuthenticated().user.role === roles.PROVIDER && (
            <Grid.Row>
              <Link to="/invitations">
                <div className="sidebar-options">
                  <span>
                    <Image src={Dashboard} />
                  </span>
                  <span className="option-title">Invitaciones</span>
                </div>
              </Link>
            </Grid.Row>
          )}
          {isAuthenticated() && isAuthenticated().user.role === roles.BUYER && (
            <Grid.Row>
              <Link to="/create/auction">
                <div className="sidebar-options">
                  <span>
                    <Image src={A1} />
                  </span>
                  <span className="option-title">Crear Subasta</span>
                </div>
              </Link>
            </Grid.Row>
          )}
          {isAuthenticated() && isAuthenticated().user.role === roles.BUYER && (
            <Grid.Row>
              <Link to="/finalized">
                <div className="sidebar-options">
                  <span>
                    <Image src={A1} />
                  </span>
                  <span className="option-title">Subastas Finalizadas</span>
                </div>
              </Link>
            </Grid.Row>
          )}
          {isAuthenticated() && isAuthenticated().user.role === roles.BUYER && (
            <Grid.Row>
              <Link to="/favorite-suppliers">
                <div className="sidebar-options">
                  <span>
                    <Image src={A1} />
                  </span>
                  <span className="option-title">Mis Proveedores</span>
                </div>
              </Link>
            </Grid.Row>
          )}
          {/*             {isAuthenticated() && isAuthenticated().user.role === roles.PROVIDER && (
              <Grid.Row>
                <Link to="/wons">
                  <div className="sidebar-options">
                    <span>
                      <Image src={A1} />
                    </span>
                    <span className="option-title">Subastas Ganadas</span>
                  </div>
                </Link>
              </Grid.Row>
            )} */}
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default withRouter(Sidebar);
