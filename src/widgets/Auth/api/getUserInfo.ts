import axios from "axios";

export async function getUserInfo(token?: string) {
  if (token === undefined) return null;
  try {
    const { data } = await axios.get(`/auth_user_info`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
    return {
      ...data.data,
      favorite_count: data.favorite_array,
      tariff_end_date: data.tariff_end_date,
    };
  } catch (error) {
    return null;
  }
}
