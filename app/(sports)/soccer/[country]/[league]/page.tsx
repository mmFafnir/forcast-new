import { SoccerPage } from "@/pagesComponent";
import { NextPage } from "next";

interface IProps {
  params: {
    league: string;
    country: string;
  };
  searchParams: { [key: string]: string };
}

const SoccerLeaguePage: NextPage<IProps> = ({ searchParams, params }) => {
  const date = searchParams["date"] || null;
  return (
    <SoccerPage date={date} league={params.league} country={params.country} />
  );
};

export default SoccerLeaguePage;
