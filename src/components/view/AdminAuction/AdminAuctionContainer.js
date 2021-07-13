import React, { useState, useEffect } from "react";
import AdminAuctionView from "./AdminAuctionView";
import { getFAPosts, deleteComment } from "../../../api/posts";
import { isAuthenticated } from "../../../helpers/authenticate";
import { filterData } from "../FinalizedAuctions/helper";
import { formattedComments, formattedBids } from "./helpers";
import { getBidsByAuctionId } from "../../../api/realtime";
import { deleteBid } from '../../../api/bid'
import { useToasts } from "react-toast-notifications";

const AdminAuctionContainer = ({ history, match }) => {
  const { addToast } = useToasts();

  const [loading, setLoading] = useState(false);
  const [auction, setAuction] = useState({});
  const [posts, setPosts] = useState([]);
  const [elementsByPage, setElementsByPage] = useState(5);
  const [filter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [bids, setBids] = useState([]);
  const [elementsByPageBids, setElementsByPageBids] = useState(5);
  const [filterBids] = useState("");
  const [currentPageBids, setCurrentPageBids] = useState(1);
  const [loadingBids, setLoadingBids] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const { user, token } = isAuthenticated();

  const fetchPosts = async () => {
    setLoading(true);
    const response = await getFAPosts(token, match.params.id);
    if (response.status === 200) {
      const formattedData = formattedComments(response.data.body);
      setPosts(formattedData);
      setLoading(false);
    }
    setLoading(false);
  };

  const fetchBids = async () => {
    setLoadingBids(true);
    const response = await getBidsByAuctionId(token, match.params.id);
    if (response.status === 200) {
      const formattedData = formattedBids(response.data.body);
      setBids(formattedData);
      setLoadingBids(false);
    }
    setLoadingBids(false);
  };

  useEffect(() => {
    if (token) {
      fetchPosts();
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchBids();
    }
  }, [token]);

  useEffect(() => {
    const {
      location: { state },
    } = history;
    setAuction(state);
  }, [history.location.state]);

  const onSubmitFilter = () => {
    return filterData({
      dataSource: posts,
      elementsByPage,
      currentPage,
      filter,
    });
  };

  const onSubmitFilterBids = () => {
    return filterData({
      dataSource: bids,
      elementsByPage: elementsByPageBids,
      currentPage: currentPageBids,
      filter: filterBids,
    });
  };

  const onDeleteComment = async (id) => {
    setLoadingDelete(true);
    const response = await deleteComment(token, id);

    if (response && response.body) {
      fetchPosts();
      addToast("El comentario se eliminó con éxito", {
        appearance: "success",
        autoDismiss: true,
      });
      setLoadingDelete(false);
    } else {
      addToast("Hubo un error al eliminar el comentario", {
        appearance: "error",
        autoDismiss: true,
      });
      setLoadingDelete(false);
    }
  };

  const onDeleteBid = async (id) => {
    setLoadingDelete(true);
    const response = await deleteBid(token, id);

    if (response && response.body) {
      fetchBids();
      addToast("La puja se eliminó con éxito", {
        appearance: "success",
        autoDismiss: true,
      });
      setLoadingDelete(false);
    } else {
      addToast("Hubo un error al eliminar la puja", {
        appearance: "error",
        autoDismiss: true,
      });
      setLoadingDelete(false);
    }
  };
  return (
    <AdminAuctionView
      history={history}
      posts={posts}
      loading={loading}
      auction={auction}
      onSubmitFilter={onSubmitFilter}
      role={user.role}
      currentPage={currentPage}
      onChangePage={(value) => setCurrentPage(value)}
      onChangeLimit={(value) => {
        setElementsByPage(value);
        setCurrentPage(1);
      }}
      limit={elementsByPage.toString()}
      elementsByPage={elementsByPage}
      onDeleteComment={onDeleteComment}
      bids={bids}
      onSubmitFilterBids={onSubmitFilterBids}
      loadingBids={loadingBids}
      currentPageBids={currentPageBids}
      onChangePageBids={(value) => setCurrentPageBids(value)}
      onChangeLimitBids={(value) => {
        setElementsByPageBids(value);
        setCurrentPageBids(1);
      }}
      limitBids={elementsByPageBids.toString()}
      elementsByPageBids={elementsByPageBids}
      onDeleteBid={onDeleteBid}
      token={token}
      loadingDelete={loadingDelete}
    />
  );
};

export default AdminAuctionContainer;
