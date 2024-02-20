import { getArchiveServer } from "@/pagesComponent/api/archive/getArchiveMatch";
import { MatchArchiveGroup } from "@/pagesComponent/module/group/MatchArchiveGroup";
import { Header } from "@/widgets/Header";
import HeaderPage from "@/widgets/HeaderPage";
import { NextPage } from "next";
import { cookies } from "next/headers";
import React from "react";
import { FilterArchive } from "./components/Filter";

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
    <div className="flex-1 flex-col">
      <Header
        breadCrumbs={[
          {
            href: "/archive",
            title: "Архив",
          },
        ]}
      />
      <HeaderPage
        filtersRender={<FilterArchive />}
        title={"Архив"}
        filterStyle={{ flexWrap: "wrap" }}
      />
      <div className="flex-1 relative">
        <MatchArchiveGroup matches={data.data} links={data.links} />
      </div>
      <div className="page-text-block mt-auto">
        <h3>Прогнозы ставок на футбольные матчи от ИИ</h3>
        <p>
          Мы предлагаем бесплатные прогнозы на футбол, основанные на тщательном
          анализе искусственным интеллектом прошлых игр, формы игроков и других
          важных факторов. Наш сайт предлагает онлайн прогнозы на футбол для
          всех популярных лиг и турниров. Лучшие прогнозы на футбол от
          искусственного интеллекта, который является профессионалом помогут вам
          сделать правильный выбор и выиграть. Не упустите шанс сделать успешную
          ставку на футбол с нашими бесплатными и точными прогнозами на футбол
          сегодня! Сайт точных бесплатных прогнозов на футбол. Ai SportsOracle
          не организует игры на деньги. Контент носит исключительно
          информационный характер.
        </p>
      </div>
    </div>
  );
};

export default ArchivePage;
