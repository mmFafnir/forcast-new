import HeaderPage from "@/widgets/HeaderPage";
import { NextPage } from "next";
import { getMatchHome } from "../../api/main/getMatchHome";
import { MatchesGroupHome } from "../../module/group/MatchesGroupHome";
import RiskWidgets from "@/widgets/Widgets/components/RiskWidgets";
import { TelegramButton } from "@/features/shared";
import { getFavoritesServer } from "@/pagesComponent/api/favorites/getFavorites";
import { cookies } from "next/headers";
import { MatchesFavoritesGroup } from "@/pagesComponent/module/group/MatchesFavoritesGroup";
import { Header } from "@/widgets/Header";
import { LinksProvider } from "@/app/providers/LinksProvider";
import { DescriptionSEO } from "@/entities/seo-texts";

export const FavoritesPage: NextPage = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("_token");

  const matches = await getFavoritesServer({
    timeStatus: "",
    token: token?.value || "",
  });

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

      <HeaderPage title="Избарнное" calendar={false} />
      <div className="flex-1 flex-col">
        <MatchesFavoritesGroup matches={matches} />
      </div>
      <RiskWidgets isMob />
      <TelegramButton isMob />
      <DescriptionSEO />
    </LinksProvider>
  );
};
