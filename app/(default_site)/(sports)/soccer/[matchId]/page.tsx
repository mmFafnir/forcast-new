import { MatchPage } from "@/pagesComponent";
import { NextPage } from "next";

interface IProps {
  params: {
    slug: string;
    matchId: string;
  };
}

const Match: NextPage<IProps> = ({ params }) => {
  console.log(params);
  return <MatchPage id={params.matchId} />;
};

export default Match;
