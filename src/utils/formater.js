import moment from "moment";

export const formatIDR = (amount) => {
  if (!["number", "string"].includes(typeof amount)) return 0;

  let result = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);

  return result.replace("Rp", "IDR");
};

export const formatDate = (date) => {
  if (date == null) return "-";

  return moment(date).format("DD MMMM YYYY");
};
