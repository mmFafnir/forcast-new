import axios from "@/shared/core/axios";

export interface IParamsStartPay {
  payment_id: number;
  payment_method_id: number;
  rate_detail_id: number;
  currency: "RUB" | "EUR" | "USD";
  promo_code_id?: string;
}

export const startPayment = async (params: IParamsStartPay) => {
  const { data } = await axios.post("/start_payment", params);
  return data;
};
