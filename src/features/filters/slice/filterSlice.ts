import { parseQueryParams } from "@/shared/helper/parseQueryParams";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

export type TypeTimeStatus = "" | 0 | 1 | 3;

interface IState {
  date: string;
  timeStatus: TypeTimeStatus;
}

const date =
  (typeof window !== "undefined" &&
    parseQueryParams(window.location.search).date) ||
  dayjs().format("YYYY-MM-DD");

const initialState: IState = {
  date: date,
  timeStatus: "",
};

const filterSlice = createSlice({
  name: "closeSidebar",
  initialState,
  reducers: {
    setDate: (state, actions: PayloadAction<string>) => {
      state.date = actions.payload;
    },
    setTimeStatus: (state, actions: PayloadAction<TypeTimeStatus>) => {
      state.timeStatus = actions.payload;
    },
  },
});

export const { setDate, setTimeStatus } = filterSlice.actions;
export default filterSlice.reducer;
