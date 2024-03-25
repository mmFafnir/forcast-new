import { IFetchSeo } from "@/pagesComponent/types/IFetchSeo";

interface IParams {
  sport_name?: string;
  country_name?: string;
  liga_name?: string;
  comand_1?: string;
  comand_2?: string;
  date?: string;
}

export const mapSeoMacros = (
  seo: IFetchSeo | null,
  params?: IParams
): IFetchSeo | null => {
  if (!seo) return null;
  const res: IFetchSeo = seo;

  for (const key in seo) {
    let text = seo[key as "ceo_title"];
    if (text && typeof text == "string") {
      text = text.replace("sport_name", params?.sport_name || "");
      text = text.replace("country_name", params?.country_name || "");
      text = text.replace("liga_name", params?.liga_name || "");
      text = text.replace("comand_1", params?.comand_1 || "");
      text = text.replace("comand_2", params?.comand_2 || "");
      text = text.replace("date", params?.date || "");
    }
    res[key as "ceo_title"] = text;
  }

  return res;
};
