import HeaderPage from "@/widgets/HeaderPage";
import { NextPage } from "next";
import RiskWidgets from "@/widgets/Widgets/components/RiskWidgets";
import { TelegramButton } from "@/features/shared";
import { cookies } from "next/headers";
import { MatchesFavoritesGroup } from "@/pagesComponent/module/group/MatchesFavoritesGroup";
import { Header } from "@/widgets/Header";
import { LinksProvider } from "@/app/providers/LinksProvider";
import { DescriptionSEO } from "@/entities/seo-texts";
import { IFetchSeo } from "@/pagesComponent/types/IFetchSeo";

interface IProps {
  seo: IFetchSeo | null;
}

export const FavoritesPage: NextPage<IProps> = async ({ seo }) => {
  const cookieStore = cookies();

  return (
    <LinksProvider
      links={{ league: null, country: null, sport: null, match: null }}
    >
      <Header
        breadCrumbs={[
          {
            title: "Избранное",
            href: "favorites",
          },
        ]}
      />

      <HeaderPage title={seo?.ceo_h || "Избарнное"} calendar={false} />
      <div className="flex-1 flex-col">
        <MatchesFavoritesGroup />
      </div>
      <RiskWidgets isMob />
      <TelegramButton isMob />
      <DescriptionSEO text={seo?.ceo_text || ""} />
    </LinksProvider>
  );
};
