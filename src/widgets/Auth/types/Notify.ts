export type TypeNotification = "there_are_bets_on_the_match";

export interface INotification {
  created_at: string;
  id: number;
  message: string;
  parent_id: number;
  parent_type: string;
  receiver_id: number;
  sender_id: 1;
  status: "1" | "0";
  type: TypeNotification;
  updated_at: string;
  url: string | null;
}
