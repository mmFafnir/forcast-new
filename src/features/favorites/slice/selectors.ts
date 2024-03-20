import { RootState } from "@/app/providers/StoreProvider/store";
import { ITypePinLeagueData } from "../types/ITypePinLeagueData";

export const selectDataPinLeague = (state: RootState): ITypePinLeagueData[] => {
  const defaultLeagues = state.pinLeague.pinDefaultLeagues;
  const userLeagues = state.pinLeague.pinUserLeagues;
  const data: ITypePinLeagueData[] = [];

  [...userLeagues, ...defaultLeagues].forEach((league) => {
    const dataLeague = data.find((item) => item.sportId == league.sport_id);
    if (dataLeague) {
      dataLeague.leagues.push(league);
    } else {
      data.push({
        sport: "",
        sportId: league.sport_id,
        leagues: [league],
      });
    }
  });
  return data;
};
