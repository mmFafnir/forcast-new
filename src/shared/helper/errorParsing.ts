import { AxiosError } from "axios";
import { ErrorValid } from "../types/ErrorType";

export const errorParsing = (error: unknown) => {
  const err = error as AxiosError<{ message: { [ket: string]: string[] } }>;
  if (err.response && typeof err.response.data.message !== "string") {
    const errObj = err.response.data.message;
    const keys = Object.keys(errObj);
    const res: ErrorValid[] = [];

    keys.forEach((key) => {
      res.push({
        key: key,
        message: errObj[key][0],
      });
    });
    return res;
  }
  if (err.response && err.response.data.message) {
    return [{ key: "root", message: err.response.data.message }];
  }
  return [{ key: "root", message: "Произошла ошибка, попробуйте позже" }];
};
