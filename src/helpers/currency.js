export const formatCurrency = (number) => {
  return new Intl.NumberFormat("en-DE").format(number);
};
