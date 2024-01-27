import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { TypeUser } from "..";
import { ErrorValid } from "@/shared/types/ErrorType";
import { errorParsing } from "@/shared/helper/errorParsing";

interface ILoginParams {
  email: string;
  password: string;
}

interface IFetchData {
  token: string;
  user: TypeUser;
}

export const login = createAsyncThunk<IFetchData, ILoginParams>(
  "auth/login",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/login", params);
      return data;
    } catch (error) {
      console.log(error);
      throw rejectWithValue(errorParsing(error));
    }
  }
);
