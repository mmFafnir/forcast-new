import { PremMatchBanner } from "@/entities/banners";
import { Match } from "@/entities/match";
import { FavoritesLeagueHeader } from "@/features/favorites";
import { SportGroup } from "@/features/group";
import Loader from "@/shared/UI/Loader";
import IconEmpty from "@/shared/icons/IconEmpty";
import { TypeSportGroup } from "@/shared/types/sport";
import React, { FC } from "react";

interface IProps {
  data: TypeSportGroup[];
  loading: boolean | null;
}
export const GroupHome: FC<IProps> = ({ data, loading }) => {
  return (
    <div className="flex-1">
      {loading && (
        <div className="loader-body">
          <Loader />
        </div>
      )}
      {!loading && data.length === 0 && (
        <div className="empty-data">
          <p>Матчи не найдены</p>
          <IconEmpty />
        </div>
      )}
      {!loading &&
        data.map((group) => (
          <SportGroup
            key={group.id}
            title={group.name}
            icon={group.url}
            total={group.games_count}
          >
            {group.league.map((lig, index) => (
              <SportGroup
                key={index}
                headerRender={<FavoritesLeagueHeader league={lig} />}
                total={lig.games.length}
              >
                {lig.games.map((game, indexGame) => (
                  <Match key={game.id} match={game} />
                ))}
                {index === 0 && <PremMatchBanner />}
              </SportGroup>
            ))}
          </SportGroup>
        ))}
    </div>
  );
};
