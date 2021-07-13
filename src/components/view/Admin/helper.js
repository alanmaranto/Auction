import { formatDate, formatTypes } from "../../../helpers/dates";

export const getTableAuctions = [
  {
    name: "_id",
    title: "ID",
    sorted: false,
  },
  {
    name: "title",
    title: "Titulo",
    sorted: false,
  },
  {
    name: "openingRFIDate",
    sorted: true,
    title: "Fecha de inicio",
  },
  {
    name: "details",
    sorted: true,
    title: "",
    buttonActions: true,
  },
];

export const formatedAuctionData = (dataSource) => {
  const auction = dataSource.map((auction) => {
    return {
      createdAt: auction.createdAt,
      openingRFIDate: formatDate(
        auction.openingRFIDate,
        formatTypes.auctionDate
      ),
      title: auction.title,
      updatedAt: auction.updatedAt,
      __v: auction.__v,
      _id: auction._id,
      auctionId: auction._id,
    };
  });
  return auction;
};

export default getTableAuctions;
