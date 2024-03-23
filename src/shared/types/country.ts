import { TypeLeague } from "./leagues";

export type TypeCountry = {
  code: string;
  id: number;
  league: TypeLeague[];
  name: string;
  status: "0" | "1";
  trans_status: "1" | "0";
  translation: string;
  updated_at: string;
  url: string;
  photo: string | null;
};
