import HeaderPage from "@/widgets/HeaderPage";
import {  NextPage } from "next";
import { MatchesGroupHome } from "../../module/group/MatchesGroupHome";
import RiskWidgets from "@/widgets/Widgets/components/RiskWidgets";
import { TelegramButton } from "@/features/shared";
import { Header } from "@/widgets/Header";
import { FilterProvider } from "@/app/providers/FilterProvider";
import { LinksProvider } from "@/app/providers/LinksProvider";
import { DescriptionSEO } from "@/entities/seo-texts";
import { TypeSportGroup } from "@/shared/types/sport";
import { IFetchSeo } from "@/pagesComponent/types/IFetchSeo";

interface IProps {
  date: string | null;
  webApp: boolean;
  matches: TypeSportGroup[];
  seo: IFetchSeo;
}

export const MainPage: NextPage<IProps> = ({ date, webApp, matches, seo }) => {
  return (
    <>
      <FilterProvider sport={""} league={""} country={""} webApp={webApp}>
        <LinksProvider
          links={{
            sport: "",
            league: "",
            country: "",
            match: "",
          }}
        >
          <Header breadCrumbs={[]} />
          <HeaderPage title={seo.ceo_h} />
          <div className="flex-1 flex-col min-h-block">
            <MatchesGroupHome matches={matches} />
          </div>
          <RiskWidgets isMob />
          <TelegramButton isMob />
          <DescriptionSEO text={seo.ceo_text} />
        </LinksProvider>
      </FilterProvider>
    </>
  );
};
