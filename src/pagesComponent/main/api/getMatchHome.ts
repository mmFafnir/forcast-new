import axios from "@/shared/core/axios";
import TypeSportGroup from "../types/TypeSportGroup";
import mapGetMatchHome from "./mapGetMatchHome";

const getMatchHome = async (): Promise<TypeSportGroup[]> => {
  const { data } = await axios.get("/get_home_page_matches");
  return mapGetMatchHome(data.data);
};

export default getMatchHome;
