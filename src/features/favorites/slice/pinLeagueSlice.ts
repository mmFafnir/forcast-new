import { EnumStatus } from "@/shared/types/Enums";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { togglePinLeague } from "./asyncActions";
import { TypeLeague } from "@/shared/types/leagues";

type TypePinLeague = Pick<
  TypeLeague,
  | "id"
  | "league_id"
  | "league_name"
  | "url"
  | "league_cc"
  | "user_pind_count"
  | "user_pind_admin_count"
>;

interface IState {
  pinUserLeagues: TypePinLeague[];
  pinDefaultLeagues: TypePinLeague[];
  status: EnumStatus;
}

const initialState: IState = {
  pinUserLeagues: [],
  pinDefaultLeagues: [],
  status: EnumStatus.DEFAULT,
};

const pinLeaguesSlice = createSlice({
  name: "pinLeagues",
  initialState,
  reducers: {
    setLeagues: (state, action: PayloadAction<TypePinLeague>) => {
      state.pinUserLeagues = [action.payload, ...state.pinUserLeagues];
    },
    deleteLeagues: (state, action: PayloadAction<number>) => {
      state.pinUserLeagues = state.pinUserLeagues.filter(
        (lig) => lig.id !== action.payload
      );
    },

    setDefaultLeague: (state, action: PayloadAction<TypePinLeague[]>) => {
      state.pinDefaultLeagues = action.payload;
    },

    deleteDefaultLeagues: (state, action) => {
      state.pinDefaultLeagues = state.pinDefaultLeagues.filter(
        (lig) => lig.id !== action.payload
      );
    },
  },
});

export const {
  setLeagues,
  deleteLeagues,
  deleteDefaultLeagues,
  setDefaultLeague,
} = pinLeaguesSlice.actions;
export default pinLeaguesSlice.reducer;
