import { getArchiveServer } from "@/pagesComponent/api/archive/getArchiveMatch";
import { MatchArchiveGroup } from "@/pagesComponent/module/group/MatchArchiveGroup";
import { IFetchArchive } from "@/pagesComponent/types/IFetchArchiv";
import { NextPage } from "next";
import React from "react";
interface IProps {
  data: IFetchArchive;
}

export const ArchivePage: NextPage<IProps> = async ({ data }) => {
  return <MatchArchiveGroup matches={data.data} links={data.links} />;
};
