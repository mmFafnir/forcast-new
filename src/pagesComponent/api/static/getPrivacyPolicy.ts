import axios from "axios";

export const getPrivacyPolicy = async () => {
  const { data } = await axios.get("/get_privice_text");
  return data.data;
};
