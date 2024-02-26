import HeaderPage from "@/widgets/HeaderPage";
import { NextPage } from "next";
import { getMatchMainServer } from "../../api/main/getMatchHome";
import { MatchesGroupHome } from "../../module/group/MatchesGroupHome";
import RiskWidgets from "@/widgets/Widgets/components/RiskWidgets";
import { TelegramButton } from "@/features/shared";
import { cookies } from "next/headers";
import { Header } from "@/widgets/Header";
import { FilterProvider } from "@/app/providers/FilterProvider";
import { LinksProvider } from "@/app/providers/LinksProvider";
import { getTimezone } from "@/shared/helper/getTimezone";
import { DescriptionSEO } from "@/entities/seo-texts";

interface IProps {
  date: string | null;
}
export const MainPage: NextPage<IProps> = async ({ date }) => {
  const cookieStore = cookies();
  const token = cookieStore.get("_token");
  const utcId = cookieStore.get("utc_id");

  const matches = await getMatchMainServer({
    date: date || "",
    timeStatus: "",
    token: token?.value || "",
    utcId: getTimezone(utcId?.value)?.id || "",
  });

  return (
    <FilterProvider sport={""} league={""} country={""}>
      <LinksProvider
        links={{
          sport: "",
          league: "",
          country: "",
          match: "",
        }}
      >
        <Header breadCrumbs={[]} />
        <HeaderPage title="Прогнозы ставок на футбольные матчи от ИИ" />
        <div className="flex-1 flex-col min-h-block">
          <MatchesGroupHome matches={matches} />
        </div>
        <RiskWidgets isMob />
        <TelegramButton isMob />
        <DescriptionSEO />
      </LinksProvider>
    </FilterProvider>
  );
};
