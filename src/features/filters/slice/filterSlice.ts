import { parseQueryParams } from "@/shared/helper/parseQueryParams";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import dayJs from "@/shared/core/dayjs";
import { matchTimeZone } from "@/shared/core/timezone";

export type TypeTimeStatus = "" | 0 | 1 | 3;

interface IState {
  date: string;
  timeStatus: TypeTimeStatus;
  leagueId: number | "";
  countryId: number | "";
  sportId: number | "";
  page: number;
}

const date =
  (typeof window !== "undefined" &&
    parseQueryParams(window.location.search).date) ||
  // @ts-ignore
  dayJs().utc().tz(matchTimeZone).format("YYYY-MM-DD");

const initialState: IState = {
  date: date,
  timeStatus: "",
  sportId: "",
  leagueId: "",
  countryId: "",
  page: 1,
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
    setCountryFilter: (state, action: PayloadAction<number | "">) => {
      state.countryId = action.payload;
    },
    setLeagueFilter: (state, action: PayloadAction<number | "">) => {
      state.leagueId = action.payload;
    },
    setSportFilter: (state, action: PayloadAction<number | "">) => {
      state.sportId = action.payload;
    },

    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },

    setDefaultFilter: (state) => {
      state.leagueId = "";
      state.sportId = "";
      state.timeStatus = "";
      state.date = date;
    },
  },
});

export const {
  setDate,
  setTimeStatus,
  setCountryFilter,
  setLeagueFilter,
  setSportFilter,
  setDefaultFilter,
  setPage,
} = filterSlice.actions;
export default filterSlice.reducer;
