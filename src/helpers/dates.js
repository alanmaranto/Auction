import moment from "moment";
import "moment/locale/es";
moment.locale("es");

export const formatDate = (date, type) => {
  return moment(date).format(type);
};

export const formatTypes = {
  hour: "HH:mm a",
  month: "MMM Do",
  monthYear: 'MMMM YYYY',
  fullDateTime: "DD MMMM YYYY hh:mm",
  invitationDate: "dddd, MMMM Do YYYY, h:mm:ss a",
  auctionDate: 'MMMM Do YYYY, h:mm:ss a',
  fullDateTime12H: "DD MMMM YYYY hh:mm:ss a",
};
