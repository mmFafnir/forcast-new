import axios from "axios";

export const getTermOfUse = async () => {
  const { data } = await axios.get("/get_term_of_use");
  return data.data;
};
