import { IFetchSeo } from "@/pagesComponent/types/IFetchSeo";
import axios from "axios";
import { cache } from "react";

interface IParams {
  sport_id: number;
  country_id?: number;
  league_id?: number;
  match_id?: number;
}

export const getSeoDynamic = cache(
  async (params: IParams): Promise<IFetchSeo | null> => {
    try {
      const { sport_id, country_id, league_id, match_id } = params;

      let query = `sport_id=${sport_id}`;
      if (country_id) query += `&country_id=${country_id}`;
      if (league_id) query += `&league_id=${league_id}`;
      if (match_id) query += `&match_id=${match_id}`;

      const { data } = await axios.get(
        `/get_ceo_for_sport_league_country_match?${query}`
      );
      return data.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
);
