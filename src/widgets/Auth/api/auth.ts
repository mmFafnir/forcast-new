import axios from "@/shared/core/axios";
import { AxiosError } from "axios";
import { ErrorValid } from "@/shared/types/ErrorType";

export interface IRegisterParams {
  email: string;
}

export const login = async (params: IRegisterParams) => {
  const { data } = await axios.post("/register_or_login", params);
};
