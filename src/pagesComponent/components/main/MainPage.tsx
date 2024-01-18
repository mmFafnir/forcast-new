import HeaderPage from "@/widgets/HeaderPage";
import { NextPage } from "next";
import { getMatchHome } from "../../api/getMatchHome";
import { MatchesGroup } from "../../module/MatchesGroup";

export const MainPage: NextPage = async () => {
  const matches = await getMatchHome();
  return (
    <>
      <div className="flex-1 ">
        <HeaderPage title="Прогнозы ставок на футбольные матчи от ИИ" />
        <MatchesGroup matches={matches} />
      </div>
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
