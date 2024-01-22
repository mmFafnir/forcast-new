import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type TypeTimeStatus = "" | 0 | 1 | 3;

interface IState {
  date: string;
  timeStatus: TypeTimeStatus;
}

const initialState: IState = {
  date: "",
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
