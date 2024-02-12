import { IFetchFullMatch } from "@/pagesComponent/types/IFetchMatch";
import axios from "axios";

export const getOneMatch = async (
  url: string,
  token?: string
): Promise<IFetchFullMatch | null> => {
  console.log("url post", url);
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const { data } = await axios.post(
      `https://admin.aibetguru.com/api/app/single_page_match`,
      {
        url: url,
      },
      config
    );
    console.log(data);
    return data.data;
  } catch (error) {
    return null;
  }
};
