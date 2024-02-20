import { IFetchFullMatch } from "@/pagesComponent/types/IFetchMatch";
import axios from "axios";

export const getOneMatch = async (
  url: string,
  token?: string
): Promise<IFetchFullMatch | null> => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const { data } = await axios.post(
      `/single_page_match`,
      {
        url: url,
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
};
