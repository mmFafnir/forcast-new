import { getArchiveServer } from "@/pagesComponent/api/archive/getArchiveMatch";
import { ArchivePage } from "@/pagesComponent/components/archive";
import { NextPage } from "next";
import { cookies } from "next/headers";
import React from "react";

interface IProps {
  params: {};
  searchParams: { [key: string]: string };
}

const Archive: NextPage<IProps> = async ({ searchParams }) => {
  const date = searchParams["date"] || null;
  const cookieStore = cookies();
  const token = cookieStore.get("_token");
  const data = await getArchiveServer({
    date: date || "",
    token: token?.value || "",
  });

  return <ArchivePage data={data} />;
};

export default Archive;
