export type TypeRisk = {
  created_at: string;
  id: number;
  name: string;
  trans_status: string;
  updated_at: string;
};

export type TypeEvent = {
  created_at: string;
  id: number;
  original_name: string;
  show_name: null;
  status: "0" | "1";
  trans_status: string;
  updated_at: string;
};

type TypeTranslateTeam = {
  id: number;
  lang_id: string;
  parent_id: string;
  translation: string;
};

export type TypeTeam = {
  created_at: null | string;
  get_photo: string;
  has_quad: number;
  id: number;
  sport_id: number;
  team_cc: string;
  team_id: number;
  team_name: string;
  updated_at: null | string;
  translate: TypeTranslateTeam[];
};

export type TypeBet = {
  best_bet: "Yes" | "No";
  bet: string;
  created_at: string | null;
  event_id: number;
  event: TypeEvent;
  game_id: number;
  id: number;
  odds: string;
  risk_id: number;
  risk: TypeRisk;
  trans_status: "0" | "1";
  updated_at: string | null;
  why: string;
  why_best: string;
};

export type TypeMatch = {
  away_team: TypeTeam;
  best_bet_card: TypeBet[];
  foreign_away_id: number;
  foreign_home_id: number;
  foreign_league_id: number;
  home_team: TypeTeam;
  id: number;
  real_date: string;
  real_time: string;
  real_time_carbon: string;
  score: null;
  url: string;
  favorite_auth_user_count: 0 | 1;
};
