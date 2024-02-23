import dayJs from "@/shared/core/dayjs";
import { matchTimeZone } from "@/shared/core/timezone";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IState {
  timezone: string;
  utcId: number | "";
}

const initialState: IState = {
  // @ts-ignore
  timezone: matchTimeZone,
  utcId: "",
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
    },
  },
});

export const { setTimezone } = timezoneSlice.actions;
export default timezoneSlice.reducer;
