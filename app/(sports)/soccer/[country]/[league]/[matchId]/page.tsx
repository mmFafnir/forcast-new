import { MatchPage } from "@/pagesComponent";
import Header from "@/widgets/Header";
import { NextPage } from "next";
interface IProps {
  params: {
    country: string;
    league: string;
    matchId: string;
  };
}

const Match: NextPage<IProps> = ({ params }) => {
  return (
    <MatchPage
      url={`/soccer/${params.country}/${params.league}/${params.matchId}`}
    />
  );
};

export default Match;
