import ArchivePage from "@/pagesComponent/components/archive/ArchivePage";
import { NextPage } from "next";
import React from "react";

interface IProps {
  params: {};
  searchParams: { [key: string]: string };
}

const Archive: NextPage<IProps> = ({ searchParams }) => {
  const date = searchParams["date"] || null;
  return <ArchivePage date={date} />;
};

export default Archive;
