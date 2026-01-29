import api from "../api/axios";

export const getOrders = async ({ 
  pageNumber = 1, 
  pageSize = 50, 
  sellerId = "", // This usually comes from your login profile
  q = "", // Search keyword
  st = "", // Success, Processing, or Cancel
  factoryStatus = "" // Received, Producing, etc.
}) => {
  const response = await api.get("/api/order/get-all", {
    params: {
      sellerId,
      pageNumber,
      pageSize,
      q, 
      st,
      factoryStatus
    },
  });
  return response.data; 
};