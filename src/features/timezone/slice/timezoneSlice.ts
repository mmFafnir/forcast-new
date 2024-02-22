import dayJs from "@/shared/core/dayjs";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IState {
  timezone: string;
}

const initialState: IState = {
  // @ts-ignore
  timezone: "",
};

const timezoneSlice = createSlice({
  name: "timezone",
  initialState,
  reducers: {
    setTimezone: (state, action: PayloadAction<string>) => {
      state.timezone = action.payload;
    },
  },
});

export const { setTimezone } = timezoneSlice.actions;
export default timezoneSlice.reducer;
