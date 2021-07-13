export const getPostTableAuctions = [
  {
    name: "_id",
    title: "ID",
    sorted: false,
  },
  {
    name: "comment",
    title: "Comentario",
    sorted: false,
  },
  {
    name: "author",
    sorted: true,
    title: "Autor",
  },
  {
    name: "role",
    sorted: true,
    title: "Role",
  },
  {
    name: "eliminar",
    sorted: true,
    title: "",
    buttonActions: true,
  },
];

export const getBidsTableAuctions = [
  {
    name: "_id",
    title: "ID",
    sorted: false,
  },
  {
    name: "bid",
    title: "Puja",
    sorted: false,
  },
  {
    name: "currency",
    title: "Moneda",
    sorted: false,
  },
  {
    name: "name",
    sorted: true,
    title: "Nombre del proveedor",
  },
  {
    name: "eliminar",
    sorted: true,
    title: "",
    buttonActions: true,
  },
];

export const formattedComments = (dataSource) => {
  const comments = dataSource.map((comment) => {
    return {
      createdAt: comment.createdAt,
      comment: comment.post,
      _id: comment._id,
      author: comment.senderId.name,
      role: comment.senderId.role,
    };
  });
  return comments;
};

export const formattedBids = (dataSource) => {
  const bids = dataSource.map((bid) => {
    return {
      createdAt: bid.createdAt,
      bid: bid.bid,
      currency: bid.currency,
      _id: bid._id,
      name: bid.userId.name,
    };
  });
  return bids;
};
