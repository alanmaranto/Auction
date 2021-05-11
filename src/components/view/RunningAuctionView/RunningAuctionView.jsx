/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import RunningAuction from "./RunningAuction";

import { isAuthenticated } from "../../../helpers/authenticate";
import {
  getRunningAuctionById,
  updateAuction,
  getBidsByAuctionInfo,
} from "../../../api/api";
import { getRealTimeBidsByAuctionId } from "../../../api/realtime";
import { getLastBidByUserIdAndAuction } from "../../../api/bid";
import { SocketContext } from "../../../context/socket/SocketContext";
import { useToasts } from "react-toast-notifications";

const RunningAuctionContainer = ({ match: { params } }) => {
  const { socket } = useContext(SocketContext);
  const { addToast } = useToasts();

  const [auction, setAuction] = useState({});
  const [lastMessage, setLastMessage] = useState({});
  const [bids, setBids] = useState([]);
  const [summaryBids, setSummaryBids] = useState([]);
  const [suppliersItems, setSuppliersItems] = useState([]);
  const [buyerItems, setBuyerItems] = useState([]);
  const [baseSupplierItems, setBaseSupplierItems] = useState([]);
  const [percentage, setPercentage] = useState("");
  const [totalSupplier, setTotalSupplier] = useState(0);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [showPopUpBid, setShowPopUpBid] = useState(false);
  const [bidUser, setBidUser] = useState("");
  const [extendedRealTimeAuctionDate, setExtendedRealTimeAuctionDate] =
    useState("");

  const { token, user } = isAuthenticated();

  useEffect(() => {
    if (token) {
      fetchAuction();
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchBids();
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchSummaryBids();
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchSupplierItemsById();
    }
  }, [auction]);

  const fetchAuction = async () => {
    const { id: currentAuction } = params;
    const response = await getRunningAuctionById(token, currentAuction);

    if (response && response.data && response.data.body) {
      const { auctionResult, lastMessage } = response.data.body;
      setAuction(auctionResult);
      setLastMessage(lastMessage);
      setExtendedRealTimeAuctionDate(auctionResult.extendedRealTimeAuctionDate);
      setBuyerItems(JSON.parse(JSON.stringify(auctionResult.items)));
    }
  };

  const fetchBids = async () => {
    const { id: currentAuction } = params;
    const response = await getRealTimeBidsByAuctionId(token, currentAuction);

    if (response && response.data.body) {
      if (user.role === "buyer") {
        setBids(response.data.body);
      } else {
        if (user) {
          setBids(formatRealTimeData(response.data.body));
        }
      }
    }
  };

  const fetchSummaryBids = async () => {
    const { id: currentAuction } = params;
    const response = await getBidsByAuctionInfo(token, currentAuction);

    if (response && response.data.body) {
      if (user.role === "buyer") {
        setSummaryBids(response.data.body);
      } else {
        if (user) {
          setSummaryBids(formatSummaryData(response.data.body));
        }
      }
    }
  };

  // get bid by supplier to set items
  const fetchSupplierItemsById = async () => {
    const { id: currentAuction } = params;
    const response = await getLastBidByUserIdAndAuction(token, currentAuction);

    setSuppliersItems(
      response.data.body.items ? response.data.body.items : auction.items
    );
    setBaseSupplierItems(
      response.data.body.items
        ? JSON.parse(JSON.stringify(response.data.body.items))
        : []
    );
    sumTotalItems(response.data.body.items);
  };

  useEffect(() => {
    listenBids();
  }, [bids]);

  useEffect(() => {
    listenSummaryBids();
  }, [summaryBids]);

  useEffect(() => {
    listenBid();
  }, [lastMessage, extendedRealTimeAuctionDate]);

  // get current bid throught socket
  const listenBid = () => {
    socket.on("supplier-bid", (data) => {
      const { id: currentAuction } = params;
      if (data.auctionId === currentAuction) {
        setLastMessage(data);
      }
      if (data.userId === user._id) {
        setSuppliersItems(data.items);
      }
      if (data.extendedRealTimeAuctionDate) {
        setExtendedRealTimeAuctionDate(data.extendedRealTimeAuctionDate);
      }
      setBidUser(data.userId);
      setShowPopUpBid(true);
    });
  };

  // get current bids throught socket
  const listenBids = () => {
    socket.on("get-bids", (data) => {
      if (user) {
        setBids(formatRealTimeData(data));
      }
    });
  };

  const listenSummaryBids = () => {
    socket.on("summary-bids", (data) => {
      if (user) {
        setSummaryBids(formatSummaryData(data));
      }
    });
  };

  // send bid throught socket
  const sendBid = async () => {
    const { id: currentAuction } = params;
    const data = {
      auctionId: currentAuction,
      bid: totalSupplier,
      userId: user._id,
      currency: auction.currency,
      items: suppliersItems,
    };

    if (totalSupplier.length === 0) {
      return;
    }

    socket.emit("supplier-bid", data);
    addToast("Puja enviada", {
      appearance: "success",
      autoDismiss: true,
    });
    setOpenConfirmation(false);
  };

  const onFinalizedAuction = async () => {
    const { id: currentAuction } = params;
    const data = {
      finalized: true,
      auctionStep: "finalized",
    };
    await updateAuction(currentAuction, token, data);
  };

  const handleSuppliersItemsTable = (idx, value) => {
    const newItems = [...suppliersItems];
    newItems[idx].basePrice = value;
    newItems[idx].totalPrice = Number(value) * Number(newItems[idx].quantity);

    setSuppliersItems(newItems);
    sumTotalItems(newItems);
  };

  const sumTotalItems = (items) => {
    let newTotal = 0;
    items &&
      items.forEach((item) => {
        const { basePrice, quantity } = item;
        newTotal += Number(basePrice) * Number(quantity);
      });
    setTotalSupplier(newTotal);
  };

  const updatePercentage = () => {
    const newItems = [...suppliersItems];
    let newTotal = 0;
    newItems &&
      newItems.map((item) => {
        const { quantity } = item;
        item.basePrice =
          Number(item.basePrice) - (Number(item.basePrice) * percentage) / 100;
        item.totalPrice = Number(item.basePrice) * Number(quantity);

        newTotal += item.totalPrice;
        return item;
      });
    setSuppliersItems(newItems);
    setTotalSupplier(newTotal);
  };

  const restoreItems = () => {
    setSuppliersItems(
      baseSupplierItems.length === 0 ? buyerItems : baseSupplierItems
    );
    sumTotalItems(
      baseSupplierItems.length === 0 ? buyerItems : baseSupplierItems
    );
  };

  const formatSummaryData = (summaryData) => {
    let lastSuppliersBids = [];
    const newData = summaryData.map(
      ({ auctionId, bid, createdAt, provider, updatedAt, _id }) => {
        const providerInfo = provider.map((p) => {
          return {
            providerId: p.providerId,
            name:
              user.role === "provider"
                ? user._id === p.providerId
                  ? user.name
                  : "Proveedor"
                : p.name,
          };
        });
        return {
          _id,
          auctionId,
          bid,
          createdAt,
          updatedAt,
          provider: providerInfo,
        };
      }
    );
    lastSuppliersBids = newData;
    return lastSuppliersBids;
  };

  const formatRealTimeData = (realTimeData) => {
    let realTimeBids = [];
    const newData = realTimeData.map(({ data, userId, id }) => {
      return {
        data,
        id: userId === user._id ? id : "Proveedor",
      };
    });
    realTimeBids = newData;
    return realTimeBids;
  };

  return (
    <RunningAuction
      title={auction.title}
      minimumBid={auction.minimumBid}
      totalItemsPrice={auction.totalItemsPrice}
      role={user.role}
      sendBid={sendBid}
      lastMessage={lastMessage}
      endingAuction={auction.endingRealTimeAuctionDate}
      onFinalizedAuction={onFinalizedAuction}
      bids={bids}
      summaryBids={summaryBids}
      extendedRealTimeAuctionDate={extendedRealTimeAuctionDate}
      currency={auction.currency}
      suppliersItems={suppliersItems}
      setSuppliersItems={setSuppliersItems}
      totalSupplier={totalSupplier}
      handleSuppliersItemsTable={handleSuppliersItemsTable}
      percentage={percentage}
      setPercentage={setPercentage}
      updatePercentage={updatePercentage}
      restoreItems={restoreItems}
      openConfirmation={openConfirmation}
      setOpenConfirmation={setOpenConfirmation}
      showPopUpBid={showPopUpBid}
      setShowPopUpBid={setShowPopUpBid}
      bidUser={bidUser}
      user={user._id}
    />
  );
};

export default RunningAuctionContainer;
