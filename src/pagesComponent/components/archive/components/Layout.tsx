import { FC, ReactNode } from "react";
import styles from "../styles/page.module.scss";
import HeaderPage from "@/widgets/HeaderPage";
import { FilterArchive } from "./Filter";
import { FilterCalendar } from "@/features/filters";
import { Header } from "@/widgets/Header";
import dayjs from "dayjs";
import { DescriptionSEO } from "@/entities/seo-texts";

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
      <DescriptionSEO />
    </div>
  );
};
