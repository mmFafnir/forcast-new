import { MainPage } from "@/pagesComponent";
import { NextPage } from "next";

interface IProps {
  params: {};
  searchParams: { [key: string]: string };
}

const Home: NextPage<IProps> = ({ searchParams }) => {
  console.log(searchParams);
  const date = searchParams["date"] || null;
  const webApp = searchParams["web_app"];
  return <MainPage date={date} webApp={webApp === "true" ? true : false} />;
};

export default Home;
