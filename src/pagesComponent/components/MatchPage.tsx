import { IconFavorite } from "@/features/favorites";
import React from "react";

const MatchPage = () => {
  return (
    <div className="flex-1">
      <div className="flex item-center">
        <h1>Прогноз на матч: Барселона - Барселона</h1>
        <div>
          <button>
            <IconFavorite />
          </button>
          <button></button>
        </div>
      </div>
    </div>
  );
};

export default MatchPage;
