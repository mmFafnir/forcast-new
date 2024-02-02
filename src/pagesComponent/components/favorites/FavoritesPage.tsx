import HeaderPage from "@/widgets/HeaderPage";
import { NextPage } from "next";
import { getMatchHome } from "../../api/main/getMatchHome";
import { MatchesGroupHome } from "../../module/group/MatchesGroupHome";
import RiskWidgets from "@/widgets/Widgets/components/RiskWidgets";
import { TelegramButton } from "@/features/shared";
import { getFavoritesServer } from "@/pagesComponent/api/favorites/getFavorites";
import { cookies } from "next/headers";
import { MatchesFavoritesGroup } from "@/pagesComponent/module/group/MatchesFavoritesGroup";

interface IProps {
  date: string | null;
}
export const FavoritesPage: NextPage<IProps> = async ({ date }) => {
  const cookieStore = cookies();
  const token = cookieStore.get("_token");

  const matches = await getFavoritesServer({
    date: date || "",
    timeStatus: "",
    token: token?.value || "",
  });

  return (
    <>
      <HeaderPage title="Избарнное" />
      <div className="flex-1 flex-col">
        <MatchesFavoritesGroup matches={matches} />
      </div>
      <RiskWidgets isMob />
      <TelegramButton isMob />
      <div className="page-text-block">
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
    </>
  );
};
