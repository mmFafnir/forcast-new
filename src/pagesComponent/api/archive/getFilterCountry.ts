import axios from "@/shared/core/axios";

export const getCountryFilter = async (sportId: number | "") => {
  try {
    const { data } = await axios.get(
      `get_country_for_archive?sport_id=${sportId}`
    );
    return data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
