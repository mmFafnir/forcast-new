import { TypeCountry } from "@/shared/types/country";
import { ILeagues, TypeLeague } from "@/shared/types/leagues";
import { TypeBet, TypeTeam } from "@/shared/types/match";

export interface IFetchMatch {
  data: ILeagues[];
  country?: { title: string; url: string; id: number };
  league?: { title: string; url: string; id: number };
  sport?: { title: string; id: number; url: string };
}

interface ICountryLeagues extends TypeLeague {
  country: TypeCountry;
}

export interface IFetchFullMatch {
  id: number;
  sport_id: number;
  favorite_game: "1" | "0";
  event_data_json: null;
  get_event_data_status: "0" | "1";
  game_id: number;
  time: number;
  time_status: number;
  league_id: number;
  home_id: number;
  away_id: number;
  foreign_league_id: number;
  foreign_home_id: number;
  foreign_away_id: number;
  score: null;
  real_time_carbon: string;
  real_date: string;
  real_time: string;
  created_at: string;
  updated_at: string;
  chat_gpt_text: string;
  chat_gpt_text_have_status: "1" | "0";
  chat_gpt_text_status: number;
  game_analize: string;
  game_cf: string;
  url: string;
  home_team: TypeTeam;
  away_team: TypeTeam;
  best_bet_card: TypeBet[];
  cards: TypeBet[];
  league: ICountryLeagues;
  favorite_auth_user_count: 0 | 1;
  game_view_count: number;
  request_for_card_button: boolean;
}
