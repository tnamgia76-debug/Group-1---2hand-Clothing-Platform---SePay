export const formatVND = (amount: number): string => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

export const generateOrderCode = (): number => {
  return Number(String(Date.now()).slice(-6));
};
