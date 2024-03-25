import { matchTimeZone } from "@/shared/core/timezone";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { parseCookies, setCookie } from "nookies";
import { getTimezone } from "@/shared/helper/getTimezone";

interface IState {
  timezone: string;
  utcId: number | "";
}

const { timezone, utc_id } = parseCookies();

const initialState: IState = {
  timezone: timezone || getTimezone()?.zone || matchTimeZone,
  utcId: Number(utc_id) || getTimezone()?.id || "",
};

const timezoneSlice = createSlice({
  name: "timezone",
  initialState,
  reducers: {
    setTimezone: (
      state,
      action: PayloadAction<{ timezone: string; id: number }>
    ) => {
      state.timezone = action.payload.timezone;
      state.utcId = action.payload.id;
      setCookie(null, "utc_id", `${action.payload.id}`, {
        maxAge: 30 * 24 * 60 * 60, // Две недели,
        path: "/",
      });
      setCookie(null, "timezone", action.payload.timezone, {
        maxAge: 30 * 24 * 60 * 60, // Две недели,
        path: "/",
      });
    },
  },
});

export const { setTimezone } = timezoneSlice.actions;
export default timezoneSlice.reducer;
