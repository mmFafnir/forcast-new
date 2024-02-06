import axios from "@/shared/core/axios";

export interface IRegisterParams {
  email: string;
}

export const login = async (params: IRegisterParams) => {
  const { data } = await axios.post("/register_or_login", params);
};

export const loginTelegram = async (ref?: string) => {
  const { data } = await axios.post("/login_or_register_with_telegram", {
    ref_code: ref || "",
  });
  return data;
};
