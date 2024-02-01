import { MainPage } from "@/pagesComponent";
import { NextPage } from "next";

interface IProps {
  params: {};
  searchParams: { [key: string]: string };
}

const Home: NextPage<IProps> = ({ searchParams }) => {
  const date = searchParams["date"] || null;
  return <MainPage date={date} />;
};

export default Home;
