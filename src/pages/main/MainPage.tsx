import { FavoritesButton, FavoritesLeagueHeader } from "@/features/favorites";
import { SportGroup } from "@/features/group";
import HeaderPage from "@/widgets/HeaderPage";
import { NextPage } from "next";

const MainPage: NextPage = () => {
  return (
    <div>
      <HeaderPage title="Прогнозы ставок на футбольные матчи от ИИ" />
      <div>
        <SportGroup title="Футбол" icon="soccer" total={20}>
          <SportGroup headerRender={() => <FavoritesLeagueHeader />} total={20}>
            <p>sadsad</p>
          </SportGroup>
        </SportGroup>
      </div>
    </div>
  );
};

export default MainPage;
