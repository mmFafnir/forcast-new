import { FavoritesPage, MainPage } from "@/pagesComponent";
import { NextPage } from "next";

interface IProps {
  params: {};
  searchParams: { [key: string]: string };
}

const Favorites: NextPage<IProps> = ({ searchParams }) => {
  const date = searchParams["date"] || null;

  return <FavoritesPage date={date} />;
};

export default Favorites;
