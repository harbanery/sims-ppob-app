import { format } from "date-fns";
import { id } from "date-fns/locale";

const parseDate = (dateString) => {
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? null : date;
};

export const formatDate = (datetime) => {
  const date = parseDate(datetime);
  if (!date) return "";

  return format(date, "d MMMM yyyy", { locale: id });
};

export const formatTime = (datetime) => {
  const date = parseDate(datetime);
  if (!date) return "";

  return format(date, "HH:mm 'WIB'", { locale: id });
};
