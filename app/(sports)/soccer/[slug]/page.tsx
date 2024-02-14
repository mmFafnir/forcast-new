import { MatchPage, SoccerPage } from "@/pagesComponent";
import axios from "axios";
import { NextPage } from "next";
import React from "react";

interface IProps {
  params: {
    slug: string;
  };
  searchParams: { [key: string]: string };
}

type TypePage = "league_url" | "country_url" | "get_match_url";

const SoccerSlugPage: NextPage<IProps> = async ({ params, searchParams }) => {
  console.log(params);
  let pageType: TypePage | null = null;
  try {
    const { data } = await axios.post(
      "https://admin.aibetguru.com/api/app/validation_url",
      {
        url: params.slug,
      }
    );
    for (let key in data) {
      if (data[key]) {
        pageType = key as TypePage;
      }
    }
    console.log(data);
  } catch (error) {
    console.log(error);
  }

  const date = searchParams["date"] || null;
  console.log(pageType);

  if (pageType === "country_url")
    return <SoccerPage date={date} country={params.slug} />;
  if (pageType === "league_url")
    return <SoccerPage date={date} league={params.slug} />;
  if (pageType === "get_match_url") return <MatchPage url={`${params.slug}`} />;

  return <div>Slug epta</div>;
};

export default SoccerSlugPage;
