import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import AdminView from "./Admin";
import { isAuthenticated } from "../../../helpers/authenticate";
import { roles } from "../../../helpers/roles";
import { getAuctions } from "../../../api/auction";
import { filterData } from "../FinalizedAuctions/helper";
import { formatedAuctionData } from "./helper";
import { useToasts } from "react-toast-notifications";

const AdminContainer = ({ history }) => {
  const { addToast } = useToasts();

  const [auctions, setAuctions] = useState([]);
  const [elementsByPage, setElementsByPage] = useState(5);
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const { user, token } = isAuthenticated();

  const onSubmitFilter = () => {
    return filterData({
      dataSource: auctions,
      elementsByPage,
      currentPage,
      filter,
    });
  };

  const sendToAuctionInformation = (id, auction) => {
    history.push(`/auction-admin-information/${id}`, auction);
  };

  useEffect(() => {
    const fetchAuctions = async (token) => {
      setLoading(true);
      const response = await getAuctions(token);
      if (response.status === 200) {
        const formatedAuctions = formatedAuctionData(response.data.body);
        setAuctions(formatedAuctions);
        setLoading(false);
      } else {
        setLoading(false);
        addToast("No hay subastas", {
          appearance: "error",
          autoDismiss: true,
        });
      }
    };
    if (token) {
      fetchAuctions(token);
    }
  }, [token, addToast]);

  if (user.role === roles.BUYER) {
    return <Redirect to="/" />;
  } else if (user.role === roles.PROVIDER) {
    return <Redirect to="/provider-dashboard" />;
  } else {
    return (
      <AdminView
        auctions={auctions}
        onSubmitFilter={onSubmitFilter}
        currentPage={currentPage}
        onFilterChangeValue={(value) => setFilter(value)}
        loading={loading}
        onChangePage={(value) => setCurrentPage(value)}
        onChangeLimit={(value) => {
          setElementsByPage(value);
          setCurrentPage(1);
        }}
        limit={elementsByPage.toString()}
        elementsByPage={elementsByPage}
        sendToAuctionInformation={sendToAuctionInformation}
        user={user}
      />
    );
  }
};

export default AdminContainer;
