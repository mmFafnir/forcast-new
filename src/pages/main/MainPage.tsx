import Match from "@/entities/match/components/Match";
import { FavoritesLeagueHeader } from "@/features/favorites";
import { SportGroup } from "@/features/group";
import Tabs from "@/shared/UI/Tabs";
import HeaderPage from "@/widgets/HeaderPage";
import Widgets from "@/widgets/Widgets";
import CountriesWidget from "@/widgets/Widgets/components/CountriesWidget";
import LeaguesWidget from "@/widgets/Widgets/components/LaguesWidget";
import RiskWidgets from "@/widgets/Widgets/components/RiskWidgets";
import { NextPage } from "next";

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

const MainPage: NextPage = () => {
  return (
    <div className="flex">
      <div className="flex-1">
        <HeaderPage title="Прогнозы ставок на футбольные матчи от ИИ" />
        <div>
          <SportGroup title="Футбол" icon="soccer" total={20}>
            <SportGroup headerRender={<FavoritesLeagueHeader />} total={20}>
              <Match />
              <Match />
              <Match />
              <Match />
              <Match />
              <Match />
              <Match />
              <Match />
              <Match />
              <Match />
              <Match />
            </SportGroup>
            <SportGroup headerRender={<FavoritesLeagueHeader />} total={20}>
              <Match />
              <Match />
              <Match />
              <Match />
              <Match />
              <Match />
              <Match />
              <Match />
              <Match />
              <Match />
              <Match />
            </SportGroup>
          </SportGroup>
          <SportGroup title="Волейбол" icon="soccer" total={20}>
            <SportGroup headerRender={<FavoritesLeagueHeader />} total={20}>
              <Match />
              <Match />
              <Match />
              <Match />
              <Match />
              <Match />
              <Match />
              <Match />
              <Match />
              <Match />
              <Match />
            </SportGroup>
          </SportGroup>
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
