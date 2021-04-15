/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Header, Divider } from "semantic-ui-react";
import { useToasts } from "react-toast-notifications";

import NoData from "../../../core/500/NoData";
import InvitationCard from "./InvitationCard";
import {
  getInvitedAuctionsBySupplier,
  updateInvitationStatus,
} from "../../../api/invitedSuppliers";
import { isAuthenticated } from "../../../helpers/authenticate";

const Invitations = () => {
  const { addToast } = useToasts();

  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const { token } = isAuthenticated();

  useEffect(() => {
    if (token) {
      fetchInvitations();
    }
  }, []);

  const fetchInvitations = async () => {
    setIsFetching(true);
    const response = await getInvitedAuctionsBySupplier(token);
    if (response && response.status === 200) {
      setAuctions(response.data.body);
      setIsFetching(false);
    } else {
      addToast("No tienes invitaciones", {
        appearance: "error",
        autoDismiss: true,
      });
    }
    setIsFetching(false);
  };

  const changeInvitationStatus = async (id, invitationStatus, status) => {
    setLoading(true);

    const data = {
      _id: id,
      invitationStatus,
      status,
    };

    const response = await updateInvitationStatus(token, data);
    if (response.status === 200) {
      fetchInvitations();
      addToast("Invitación respondida con éxito", {
        appearance: "success",
        autoDismiss: true,
      });
      setLoading(false);
    } else {
      addToast("Hubo un error al responder la invitación", {
        appearance: "error",
        autoDismiss: true,
      });
      setLoading(false);
    }
  };

  const renderInvitations = () => {
    if (auctions.length > 0) {
      return auctions.map((data, idx) => {
        return (
          <InvitationCard
            key={`${data._id}-${idx}`}
            id={`${data._id}-${idx}`}
            data={data}
            updateInvitationStatus={changeInvitationStatus}
            loading={loading}
          />
        );
      });
    }
    return (
      <NoData
        title="No tienes invitaciones a subastas"
        size="large"
        isFetching={isFetching}
      />
    );
  };

  return (
    <>
      <Header textAlign="left" style={{ color: "#142850", fontSize: "2em" }}>
        Invitaciones
        <Header.Subheader>
          Administra las invitaciones que has recibido
        </Header.Subheader>
      </Header>
      <Divider />
      {renderInvitations()}
    </>
  );
};

export default Invitations;
