import { FC, ReactNode } from "react";
import styles from "../styles/page.module.scss";
import HeaderPage from "@/widgets/HeaderPage";
import { FilterArchive } from "./Filter";
import { FilterCalendar } from "@/features/filters";
import { Header } from "@/widgets/Header";
import { DescriptionSEO } from "@/entities/seo-texts";
import { getGlobalData } from "@/widgets/api/getGlobalData";
import { IFetchSeo } from "@/pagesComponent/types/IFetchSeo";

interface IProps {
  children: ReactNode;
  seo: IFetchSeo;
}
export const ArchiveLayout: FC<IProps> = async ({ children, seo }) => {
  const params = await getGlobalData();

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
              startDate={params?.get_latest_archive_game}
              bodyClass={styles.calendar}
              titleClass={styles.calendar}
            />
          </>
        }
        title={seo.ceo_h}
        filterStyle={{ flexWrap: "wrap" }}
      />
      <div className="flex-1 relative">{children}</div>
      <DescriptionSEO text={seo.ceo_text} />
    </div>
  );
};
