import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IState {
  country: string;
  league: string;
  sport: string;
  match: string;
}

const initialState: IState = {
  country: "",
  league: "",
  sport: "",
  match: "",
};

export const linkSlice = createSlice({
  name: "link",
  initialState,
  reducers: {
    setParamsLink(state, action: PayloadAction<IState>) {
      state.country = action.payload.country;
      state.league = action.payload.league;
      state.match = action.payload.match;
      state.sport = action.payload.sport;
    },
  },
});

export const { setParamsLink } = linkSlice.actions;
export default linkSlice.reducer;
