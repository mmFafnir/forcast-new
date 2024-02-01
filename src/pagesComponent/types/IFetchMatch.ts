import { TypeBet, TypeTeam } from "@/entities/match";
import { ILeagues } from "./TypeSportGroup";

export interface IFetchMatch {
  // current_page: number;
  // first_page_url: string;
  // from: number;
  // next_page_url: string | null;
  // path: string;
  // per_page: number;
  // prev_page_url: null | string;
  // to: number;
  data: ILeagues[];
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
  favorite_auth_user_count: 0 | 1;
}
