import moment from "moment";

export const formatTime = (date: Date | string | undefined) => {
  if (!date) return "";
  return moment(date).fromNow();
};

export const formatDate = (date: Date | string | undefined) => {
  if (!date) return "";
  return moment(date).format("DD MMM YYYY");
};