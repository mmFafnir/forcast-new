import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/shared/core/axios";
import { TypeUser } from "..";
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
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      throw rejectWithValue(errorParsing(error));
    }
  }
);

// notification
export const getNotification = createAsyncThunk(
  "auth/getNotification",
  async () => {
    const { data } = await axios.get("/get_auth_user_notification");
    return data.data.data;
  }
);

export const deleteNotification = createAsyncThunk<number, number>(
  "auth/deleteNotification",
  async (id) => {
    await axios.post("/delete_notifications", {
      notification_id: id,
      all: false,
    });
    return id;
  }
);

export const deleteAllNotification = createAsyncThunk(
  "auth/deleteAllNotification",
  async () => {
    await axios.post("/delete_notifications", {
      all: true,
    });
  }
);

interface IResponseChangeNotify {
  id: number;
  status: "1" | "0";
}
export const changeStatusNotification = createAsyncThunk<
  IResponseChangeNotify,
  number
>("auth/changeStatusNotification", async (id) => {
  const { data } = await axios.post("/change_notification_status", {
    notification_id: id,
  });
  return {
    id: id,
    status: data.change_status,
  };
});
