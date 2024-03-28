import { parseQueryParams } from "@/shared/helper/parseQueryParams";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IPayloadSetFilter } from "./interface";

export type TypeTimeStatus = "" | 0 | 1 | 3;

interface IState {
  date: string;
  timeStatus: TypeTimeStatus;
  leagueId: number | "";
  countryId: number | "";
  sportId: number | "";
  page: number;
  loading: boolean;
}
const date =
  (typeof window !== "undefined" &&
    parseQueryParams(window.location.search).date) ||
  "";

const initialState: IState = {
  date: date,
  timeStatus: "",

  sportId: "",
  leagueId: "",
  countryId: "",
  page: 1,
  loading: false,
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

    setFilter: (state, action: PayloadAction<IPayloadSetFilter>) => {
      const { country, league, sport } = action.payload;
      if (country) state.countryId = country;
      if (league) state.leagueId = league;
      if (sport) state.sportId = sport;
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
    },

    setLoadingFilter: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
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
  setLoadingFilter,
  setFilter,
} = filterSlice.actions;
export default filterSlice.reducer;
