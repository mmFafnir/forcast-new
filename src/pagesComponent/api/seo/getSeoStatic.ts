import { IFetchSeo } from "@/pagesComponent/types/IFetchSeo";
import axios from "axios";
import { cache } from "react";

export const getStaticSeo = cache(
  async (page: string): Promise<IFetchSeo | null> => {
    try {
      const { data } = await axios.get(`/get_static_page_ceo?page=${page}`);

      return data.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
);
