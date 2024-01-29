import axios from "@/shared/core/axios";
import { AxiosError } from "axios";
import { ErrorValid } from "@/shared/types/ErrorType";

export interface IRegisterParams {
  email: string;
  password: string;
  promo_code: string;
}

export const register = async (params: IRegisterParams) => {
  try {
    const { data } = await axios.post("/register", params);
  } catch (error) {
    const err = error as AxiosError<{ message: { [ket: string]: string[] } }>;
    if (err.response && err.response.data.message) {
      const errObj = err.response.data.message;
      const keys = Object.keys(errObj);
      const res: ErrorValid[] = [];

      keys.forEach((key) => {
        res.push({
          key: key,
          message: errObj[key][0],
        });
      });
      throw res;
    }
    throw [{ key: "default" }];
  }
};
