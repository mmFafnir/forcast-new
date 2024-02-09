import { SoccerPage } from "@/pagesComponent";
import { NextPage } from "next";

interface IProps {
  params: {
    country: string;
  };
  searchParams: { [key: string]: string };
}

const SoccerCountryPage: NextPage<IProps> = ({ searchParams, params }) => {
  console.log(params);
  const date = searchParams["date"] || null;
  return <SoccerPage date={date} />;
};

export default SoccerCountryPage;
