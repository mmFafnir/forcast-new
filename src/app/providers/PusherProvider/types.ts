export interface TypePusher {
  id: number;
  message: string;
  parent_id: number;
  parent_type: string;
  receiver_id: number;
  sender_id: number | null;
  type: string;
  token: string;
  code?: string;
  telegram_id: number;
}

export interface IStatePusher {
  message: TypePusher | null;
}
