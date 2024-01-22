import { SoccerPage } from "@/pagesComponent";
import { NextPage } from "next";

interface IProps {
  params: {};
}

const Soccer: NextPage<IProps> = ({ params }) => {
  return <SoccerPage />;
};

export default Soccer;
