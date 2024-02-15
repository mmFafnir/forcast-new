import { getArchiveServer } from "@/pagesComponent/api/archive/getArchiveMatch";
import { MatchArchiveGroup } from "@/pagesComponent/module/group/MatchArchiveGroup";
import { NextPage } from "next";
import { cookies } from "next/headers";
import React from "react";

interface IProps {
  date: string | null;
}

const ArchivePage: NextPage<IProps> = async ({ date }) => {
  const cookieStore = cookies();
  const token = cookieStore.get("_token");
  const data = await getArchiveServer({
    date: date || "",
    token: token?.value || "",
  });

  return (
    <div>
      <MatchArchiveGroup matches={data.data} />
    </div>
  );
};

export default ArchivePage;
