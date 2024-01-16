import Match from "@/entities/match/components/Match";
import { FavoritesLeagueHeader } from "@/features/favorites";
import { SportGroup } from "@/features/group";
import Tabs from "@/shared/UI/Tabs";
import HeaderPage from "@/widgets/HeaderPage";
import Widgets from "@/widgets/Widgets";
import CountriesWidget from "@/widgets/Widgets/components/CountriesWidget";
import RiskWidgets from "@/widgets/Widgets/components/RiskWidgets";
import { NextPage } from "next";
import getMatchHome from "./api/getMatchHome";
import { LeaguesWidget } from "@/widgets/Widgets/components/LeaguesWidget";

const tabs = [
  {
    title: "Популярные лиги",
    id: "leagues",
    content: <LeaguesWidget />,
  },
  {
    title: "Страны",
    id: "countries",
    content: <CountriesWidget />,
  },
];

const MainPage: NextPage = async () => {
  const matches = await getMatchHome();
  return (
    <div className="flex">
      <div className="flex-1">
        <HeaderPage title="Прогнозы ставок на футбольные матчи от ИИ" />
        <div>
          {matches.map((group) => (
            <SportGroup
              key={group.id}
              title={group.name}
              icon={group.url}
              total={20}
            >
              {group.league.map((lig, index) => (
                <SportGroup
                  key={index}
                  headerRender={<FavoritesLeagueHeader league={lig} />}
                  total={20}
                >
                  <Match />
                  <Match />
                  <Match />
                </SportGroup>
              ))}
            </SportGroup>
          ))}
        </div>
      </div>
      <Widgets
        widgets={[
          <Tabs key={1} minHeight="418px" maxHeight="418px" tabs={tabs} />,
          <RiskWidgets key={2} />,
        ]}
      />
    </div>
  );
};

export default MainPage;
