import { formatDate, formatTypes } from "../../../helpers/dates";

const getTableSettings = () => {
  const header = [
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
      name: "endingAuction",
      sorted: true,
      title: "Fecha de finalización",
    },
    {
      name: "winner",
      sorted: true,
      title: "",
      buttonActions: true,
    },
  ];
  return header;
};

const getTableSettingsActiveAuctions = () => {
  const header = [
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
      name: "openingRealTimeAuctionDate",
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
  return header;
};

const getTableSettingsProviderActiveAuctions = [
  {
    name: "user",
    title: "Invitado por",
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
  /*     {
      name: "minimumPrice",
      title: "Precio Base",
      sorted: false,
    }, */
  {
    name: "minimumBid",
    title: "Puja mínima",
    sorted: false,
  },
  {
    name: "totalItemsPrice",
    title: "Total",
    sorted: false,
  },
  {
    name: "winner",
    sorted: true,
    title: "",
    buttonActions: true,
  },
];

const formatWithPagination = (dataSource, elementsByPage) => {
  const allPages = {};
  let currentRow = 0;
  let page = 1;
  if (dataSource) {
    dataSource.forEach((data) => {
      if (currentRow < elementsByPage) {
        currentRow++;
      } else {
        currentRow = 0;
        page++;
      }
      if (!allPages[page]) {
        allPages[page] = [];
      }
      allPages[page].push(data);
    });
  }
  return { dataSource: allPages };
};

const filterData = (props) => {
  const {
    dataSource,
    currentPage,
    elementsByPage,
    filter: searchParam,
  } = props;

  const paramFilter = searchParam ? searchParam.toLowerCase() : undefined;

  if (dataSource) {
    let dataSourceList = [];
    if (paramFilter !== undefined || (paramFilter && paramFilter.length)) {
      dataSource.forEach((element) => {
        if (element.title.toLowerCase().includes(paramFilter)) {
          dataSourceList.push(element);
        }
      });
    } else {
      dataSourceList = dataSource;
    }

    const { dataSource: newDataSource } = formatWithPagination(
      dataSourceList,
      elementsByPage
    );

    const lastkey = Number(
      Object.keys(newDataSource)[Object.keys(newDataSource).length - 1 || 0]
    );
    let newCurrentPage = 1;
    if (currentPage <= lastkey) {
      newCurrentPage = currentPage;
    }
    return {
      dataSource: newDataSource[newCurrentPage],
      dataSourceSize: dataSourceList.length,
    };
  }
  return { dataSource: {}, dataSourceSize: 0 };
};

const formatedProviderAuctionData = (dataSource) => {
  const auction = dataSource.map((auction) => {
    return {
      createdAt: auction.createdAt,
      description: auction.auctionId.description,
      /*     endingAuction: moment(auctionId.endingAuction).format(
      "MMMM Do YYYY, h:mm:ss a"
    ),
 */ openingRFIDate: formatDate(
        auction.auctionId.openingRFIDate,
        formatTypes.auctionDate
      ),
      minimumBid: `$ ${formatNumber(auction.auctionId.minimumBid)}`,
      totalItemsPrice: `$ ${formatNumber(auction.auctionId.totalItemsPrice)}`,
      /*      openingAuction: moment(auctionId.openingAuction).format(
      "MMMM Do YYYY, h:mm:ss a"
    ),
 */
      title: auction.auctionId.title,
      updatedAt: auction.updatedAt,
      user: auction.auctionId.user_id.name,
      __v: auction.__v,
      _id: auction._id,
      auctionId: auction.auctionId._id,
    };
  });
  return auction;
};

const formatedData = (dataSource) => {
  const auction = dataSource.map((auction) => ({
    createdAt: auction.createdAt,
    description: auction.description,
    endingAuction: formatDate(
      auction.endingRealTimeAuctionDate,
      formatTypes.auctionDate
    ),
    /*     endingAuctionProjectDate: moment(auction.endingAuctionProjectDate).format(
      "MMMM Do YYYY, h:mm:ss a"
    ), */
    finalized: auction.finalized,
    minimumBid: `$ ${formatNumber(auction.minimumBid)}`,
    totalItemsPrice: `$ ${formatNumber(auction.totalItemsPrice)}`,
    /*     openingAuctionProjectDate: moment(auction.openingAuctionProjectDate).format(
      "MMMM Do YYYY, h:mm:ss a"
    ), */
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

export {
  getTableSettings,
  filterData,
  formatedData,
  formatNumber,
  getTableSettingsActiveAuctions,
  getTableSettingsProviderActiveAuctions,
  formatedProviderAuctionData,
};
