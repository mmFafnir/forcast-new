import HeaderPage from "@/widgets/HeaderPage";
import { MatchesGroup } from "@/pagesComponent/module/group/MatchGroup";
import RiskWidgets from "@/widgets/Widgets/components/RiskWidgets";
import { TelegramButton } from "@/features/shared";
import { FC, Suspense } from "react";
import { FilterProvider } from "@/app/providers/FilterProvider";
import { LinksProvider } from "@/app/providers/LinksProvider";
import { Header } from "@/widgets/Header";
import { DescriptionSEO } from "@/entities/seo-texts";
import { ILeagues } from "@/shared/types/leagues";
import { IBreadCrumb } from "@/features/breadсrumbs";
import { IFetchMatch } from "@/pagesComponent/types/IFetchMatch";
import { IFetchSeo } from "@/pagesComponent/types/IFetchSeo";

interface IProps {
  matches: ILeagues[];
  breadCumbers: IBreadCrumb[];
  data: IFetchMatch;
  country?: string;
  league?: string;
  seo: IFetchSeo;
}

export const SoccerPage: FC<IProps> = async ({
  matches,
  breadCumbers,
  data,
  country = "",
  league = "",
  seo,
}) => {
  console.log("data", data);
  return (
    <FilterProvider
      sport={data.sport?.id || ""}
      league={data.league?.id || ""}
      country={data.country?.id || ""}
    >
      <LinksProvider
        links={{
          sport: "Футбол",
          league: data.league?.title || "",
          country: data.country?.title || "",
          match: "",
        }}
      >
        <Header breadCrumbs={breadCumbers} />
        <HeaderPage title={seo.ceo_title} />
        <div className="flex-1 flex-col">
          <Suspense fallback={"loading"}>
            <MatchesGroup
              matches={matches}
              league={String(data.league?.url || "")}
              country={String(data.country?.url || "")}
            />
          </Suspense>
        </div>
        <RiskWidgets isMob />
        <TelegramButton isMob />
        <DescriptionSEO text={seo.ceo_text} />
      </LinksProvider>
    </FilterProvider>
  );
};
