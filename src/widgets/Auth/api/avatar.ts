import axios from "@/shared/core/axios";

export const postAvatar = async (params: FormData) => {
  try {
    const { data } = await axios.post("/update_avatar", params);
    return data;
  } catch (error) {
    console.log(error);
  }
};
