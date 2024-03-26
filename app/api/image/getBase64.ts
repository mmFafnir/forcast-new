import axios from "axios";

export const getBase64 = async (url: string) => {
  const { data } = await axios.get(
    `http://admin.aibetguru.com/api/app/get_game_base_photo?url=${url}`
  );
  return data.data;
};
