import moment from "moment";
import "moment/locale/es";

export const formatDate = (date) => {
  return moment(date).locale("es").format("DD MMMM YYYY hh:mm");
};
