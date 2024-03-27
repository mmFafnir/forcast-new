import { FC, ReactNode } from "react";
import styles from "../styles/page.module.scss";
import HeaderPage from "@/widgets/HeaderPage";
import { FilterArchive } from "./Filter";
import { FilterCalendar } from "@/features/filters";
import { Header } from "@/widgets/Header";
import { DescriptionSEO } from "@/entities/seo-texts";
import { getGlobalData } from "@/widgets/api/getGlobalData";
import { IFetchSeo } from "@/pagesComponent/types/IFetchSeo";
import { cookies } from "next/headers";
import { getTimezone } from "@/shared/helper/getTimezone";
import { convertUtcOffsetToDate } from "@/shared/helper/convertUtcOffsetToDate";
import dayjs from "dayjs";

interface IProps {
  children: ReactNode;
  seo: IFetchSeo;
}
export const ArchiveLayout: FC<IProps> = async ({ children, seo }) => {
  const cookieStore = cookies();
  const utcId = cookieStore.get("utc_id");
  const timezone = getTimezone(utcId?.value);
  const params = await getGlobalData();

  const startDate = params ? params.get_latest_archive_game : null;

  console.log(params?.get_latest_archive_game);
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
              startDate={startDate}
              bodyClass={styles.calendar}
              titleClass={styles.calendar}
              max={startDate}
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
