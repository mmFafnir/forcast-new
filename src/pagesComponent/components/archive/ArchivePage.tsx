import { getArchiveServer } from "@/pagesComponent/api/archive/getArchiveMatch";
import { MatchArchiveGroup } from "@/pagesComponent/module/group/MatchArchiveGroup";
import { Header } from "@/widgets/Header";
import HeaderPage from "@/widgets/HeaderPage";
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
      <Header
        breadCrumbs={[
          {
            href: "/archive",
            title: "Архив",
          },
        ]}
      />
      <HeaderPage filtersRender={<div></div>} title={"Архив"} />
      <MatchArchiveGroup matches={data.data} />
    </div>
  );
};

export default ArchivePage;
