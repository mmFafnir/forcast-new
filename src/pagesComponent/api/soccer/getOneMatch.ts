import { IFetchFullMatch } from "@/pagesComponent/types/IFetchMatch";
import axios from "axios";
import { cache } from "react";

export const getOneMatch = cache(
  async (
    url: string,
    token?: string,
    base64?: boolean
  ): Promise<IFetchFullMatch | null> => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const { data } = await axios.post(
        `/single_page_match`,
        {
          url: url,
          base_64: base64 || false,
        },
        config
      );
      return {
        ...data.data,
        request_for_card_button: data.request_for_card_button,
      };
    } catch (error) {
      console.log("error", error);
      return null;
    }
  }
);
