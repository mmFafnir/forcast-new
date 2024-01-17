import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IState {
  date: string;
}

const initialState: IState = {
  date: "",
};

const filterSlice = createSlice({
  name: "closeSidebar",
  initialState,
  reducers: {
    setDate: (state, actions: PayloadAction<string>) => {
      state.date = actions.payload;
    },
  },
});

export const { setDate } = filterSlice.actions;
export default filterSlice.reducer;
