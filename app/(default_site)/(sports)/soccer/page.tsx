import { SoccerPage } from "@/pagesComponent";
import { NextPage } from "next";

interface IProps {
  params: {};
  searchParams: { [key: string]: string };
}

const Soccer: NextPage<IProps> = ({ searchParams }) => {
  const date = searchParams["date"] || null;
  return <SoccerPage date={date} />;
};

export default Soccer;
