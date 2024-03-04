import axios from "axios";
import { cache } from "react";
type TypePage = "league_url" | "country_url" | "get_match_url";

export const getTypePage = cache(
  async (url: string): Promise<TypePage | null> => {
    let pageType: TypePage | null = null;

    try {
      const { data } = await axios.post("/validation_url", {
        url,
      });
      for (let key in data) {
        if (data[key]) {
          pageType = key as TypePage;
        }
      }

      return pageType;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
);
