import { createSlice } from "@reduxjs/toolkit";

interface IState {
  active: boolean;
}

const initialState: IState = {
  active: false,
};

const closeSidebarSlice = createSlice({
  name: "closeSidebar",
  initialState,
  reducers: {
    openSidebar: (state) => {
      state.active = true;
    },
    closeSidebar: (state) => {
      state.active = false;
    },
  },
});

export const { openSidebar, closeSidebar } = closeSidebarSlice.actions;
export default closeSidebarSlice.reducer;
