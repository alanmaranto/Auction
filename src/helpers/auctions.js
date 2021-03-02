import moment from "moment";

export const formatedData = (dataSource) => {
  const auction = dataSource.map((auction) => ({
    createdAt: auction.createdAt,
    description: auction.description,
    /*     endingAuctionProjectDate: moment(auction.endingAuctionProjectDate).format(
        "MMMM Do YYYY, h:mm:ss a"
      ), */
    finalized: auction.finalized,
    minimumBid: `$ ${formatNumber(auction.minimumBid)}`,
    totalItemsPrice: `$ ${formatNumber(auction.totalItemsPrice)}`,
    openingRFIDate: moment(auction.openingRFIDate).format(
      "MMMM Do YYYY, h:mm:ss a"
    ),
    title: auction.title,
    updatedAt: auction.updatedAt,
    user: auction.user_id,
    __v: auction.__v,
    _id: auction._id,
  }));
  return auction;
};

const formatNumber = (number, sep, decimals) => {
  sep = sep || "."; // Default to period as decimal separator
  decimals = decimals || 2; // Default to 2 decimals

  return (
    number.toLocaleString().split(sep)[0] +
    sep +
    number.toFixed(decimals).split(sep)[1]
  );
};

export const RFIAuctionsHeaderTable = [
  {
    name: "title",
    title: "Titulo",
    sorted: false,
  },
  {
    name: "totalItemsPrice",
    title: "Total",
    sorted: false,
  },
  {
    name: "minimumBid",
    title: "Puja mínima",
    sorted: false,
  },
  {
    name: "openingRFIDate",
    sorted: true,
    title: "Fecha de inicio",
  },
  {
    name: "winner",
    sorted: true,
    title: "",
    buttonActions: true,
  },
];

export const FAAuctionsHeaderTable = [
  {
    name: "title",
    title: "Titulo",
    sorted: false,
  },
  {
    name: "totalItemsPrice",
    title: "Total",
    sorted: false,
  },
  {
    name: "minimumBid",
    title: "Puja mínima",
    sorted: false,
  },
  {
    name: "openingRFIDate",
    sorted: true,
    title: "Fecha de inicio",
  },
  {
    name: "winner",
    sorted: true,
    title: "",
    buttonActions: true,
  },
];

export const SubAuctionsHeaderTable = [
  {
    name: "title",
    title: "Titulo",
    sorted: false,
  },
  {
    name: "totalItemsPrice",
    title: "Total",
    sorted: false,
  },
  {
    name: "minimumBid",
    title: "Puja mínima",
    sorted: false,
  },
  {
    name: "openingRFIDate",
    sorted: true,
    title: "Fecha de inicio",
  },
  {
    name: "winner",
    sorted: true,
    title: "",
    buttonActions: true,
  },
];
