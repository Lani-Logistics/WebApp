export const formatNumber = (number: number) => {
  return number.toLocaleString("en-US", {
    style: "currency",
    currency: "NGN",
  });
};

