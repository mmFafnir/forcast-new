import { FC, ReactNode } from "react";
import styles from "../styles/page.module.scss";
import HeaderPage from "@/widgets/HeaderPage";
import { FilterArchive } from "./Filter";
import { FilterCalendar } from "@/features/filters";
import { Header } from "@/widgets/Header";
import dayjs from "dayjs";

interface IProps {
  children: ReactNode;
}
export const ArchiveLayout: FC<IProps> = ({ children }) => {
  return (
    <div className={styles.page}>
      <Header
        breadCrumbs={[
          {
            href: "/archive",
            title: "Архив",
          },
        ]}
      />
      <HeaderPage
        filtersRender={
          <>
            <FilterArchive />
            <FilterCalendar
              startDate={dayjs().subtract(3, "month").format("YYYY-MM-DD")}
              bodyClass={styles.calendar}
              titleClass={styles.calendar}
            />
          </>
        }
        title={"Архив"}
        filterStyle={{ flexWrap: "wrap" }}
      />
      <div className="flex-1 relative">{children}</div>
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
