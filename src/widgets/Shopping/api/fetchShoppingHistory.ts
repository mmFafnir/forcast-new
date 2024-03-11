import axios from "@/shared/core/axios";

export const fetchShoppingHistory = async () => {
  const { data } = await axios.get("/shop_history");
  return data.data;
};
