import HeaderPage from "@/widgets/HeaderPage";
import { NextPage } from "next";
import { getMatchMainServer } from "../../api/main/getMatchHome";
import { MatchesGroupHome } from "../../module/group/MatchesGroupHome";
import RiskWidgets from "@/widgets/Widgets/components/RiskWidgets";
import { TelegramButton } from "@/features/shared";
import { cookies } from "next/headers";
import { Header } from "@/widgets/Header";

interface IProps {
  date: string | null;
}
export const MainPage: NextPage<IProps> = async ({ date }) => {
  const cookieStore = cookies();
  const token = cookieStore.get("_token");

  const matches = await getMatchMainServer({
    date: date || "",
    timeStatus: "",
    token: token?.value || "",
  });

  return (
    <>
      <Header breadCrumbs={[]} />
      <HeaderPage title="Прогнозы ставок на футбольные матчи от ИИ" />
      <div className="flex-1 flex-col">
        <MatchesGroupHome matches={matches} />
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
