import React, { useState, useEffect } from "react";
import { Header, Divider } from "semantic-ui-react";
import NoData from "../../../core/500/NoData";
import InvitationCard from "./InvitationCard";
import { getInvitedAuctionsBySupplier } from "../../../api/invitedSuppliers";
import { isAuthenticated } from "../../../helpers/authenticate";

const Invitations = () => {
  const [auctions, setAuctions] = useState([]);

  const mockData = [
    {
      finalized: false,
      isPrivate: true,
      visibleDates: true,
      isOpenAuction: false,
      currency: "MXN",
      startAuction: true,
      title: "Uniformes para estaciones",
      description: "Licitación para la comprade uniformes de invierto 2021",
      minimunBid: 450,
      identifier: "OXXO_1",
      openingRFIDate: "2021-01-02T23:15:55.928Z",
      endingRFIDate: "2021-01-02T23:15:55.928Z",
      openingFADate: "2021-01-02T23:15:55.928Z",
      endingFADate: "2021-01-02T23:15:55.928Z",
      openingRealTimeAuctionDate: "2021-01-02T23:15:55.928Z",
      endingRealTimeAuctionDate: "2021-01-02T23:15:55.928Z",
      extensionTime: "5",
      auctionStep: "PROJECT",
      items: [
        {
          unitMeasure: "m3",
          _id: {
            $oid: "5ff0104e649e650c82c91a98",
          },
          code: "code",
          name: "name",
          quantity: 2,
          basePrice: 400,
          totalPrice: 800,
        },
      ],
      totalItemsPrice: 800,
      user: {
        isApproved: true,
        role: "buyer",
        resetPasswordLink: "",
        _id: "5f13e35c0ce7d437c56049c5",
        email: "alanmaranto@gmail.com",
        salt: "43a774f0-c986-11ea-8339-6b940f2162c0",
        hashed_password: "592a1a6372d99896f5f15e6b7901391380e07bf8",
        name: "Alan Maranto",
        businessName: "",
        createdAt: "2020-07-19T06:08:29.859Z",
        updatedAt: "2020-07-19T06:08:29.859Z",
        logoName: "semantic",
        logoUrl: "https://react.semantic-ui.com/images/avatar/small/lena.png",
      },
      createdAt: "2021-01-02T06:18:54.650Z",
      updatedAt: "2021-01-02T06:18:54.650Z",
    },
  ];

  const { token } = isAuthenticated();

  useEffect(() => {
    if (token) {
      fetchInvitations();
    }
  }, []);

  const fetchInvitations = async () => {
    const response = await getInvitedAuctionsBySupplier(token);
    if (response && response.status === 200) {
      setAuctions(response.data.body)
    }
  };

  const changeStatusSupplier = (id, data) => {
    // fetch invitedSuppliers, select id invited supplier and
    // change "status" to active/rejected
  };

  const renderInvitations = () => {
    if (auctions.length > 0) {
      return auctions.map((data, idx) => {
        return <InvitationCard idx={idx} data={data} />;
      });
    }
    return (
      <NoData
        title="Aún no has recibido invitaciones a subastas"
        size="large"
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
