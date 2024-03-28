import { TypeCountry } from "../types/country";
import { TypeLeague } from "../types/leagues";
import { TypeTeam } from "../types/match";

export const getTranslationLeague = (league: TypeLeague) => {
  const text =
    league.translate && league.translate.length > 0
      ? league.translate[0].translation
      : league.league_name;

  return text;
};

export const getTranslationCountry = (country?: TypeCountry) => {
  if (!country) return "";
  const text = country?.translation || country?.name;
  return text;
};

export const getTranslationTeam = (team: TypeTeam) => {
  const text =
    team.translate && team.translate.length > 0
      ? team.translate[0].translation
      : team.team_name;

  return text;
};
