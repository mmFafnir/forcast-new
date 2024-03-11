export type TypePrem = {
  id: number;
  rate_id: number;
  free_or_not: "0" | "1";
  has_top: "0" | "1";
  start_tariffe: "0" | "1";
  name: string;
  price_rub: string;
  price_usd: string;
  price_euro: string;
  work_day: string | null;
  work_month: string | null;
  work_year: string | null;
  order_by: string | null;
  created_at: string;
  updated_at: string;
  day_price_rub: string;
  day_price_usd: string;
  day_price_euro: string;
  saved_price_rub: string;
  saved_price_usd: string;
  saved_price_euro: string;
  price_rub_with_bonus: string;
  price_usd_with_bonus: string;
  price_euro_with_bonus: string;
  bonus_day: string;
  bonus_percent: string;
  country: IMethodCountry[];
};

export interface IMethodCountry {
  id: number;
  name: string;
  category: IMethodCategory[];
}

export interface IMethodCategory {
  id: number | string;
  name: string;
  payment_method: IMethodPayment[];
}

export interface IMethodPayment {
  id: number;
  payment_id: number;
  pay_type_id: number;
  name_id: number;
  category_id: number;
  type_name: {
    id: number;
    name_ru: string;
    name_en: string;
  };
  parent_kassa: {
    id: number;
    name: string;
    status: string;
  };
}
