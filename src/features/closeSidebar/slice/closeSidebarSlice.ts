import { createSlice } from "@reduxjs/toolkit";

interface IState {
  activeSidebar: boolean;
  activeWidgets: boolean;
}

const initialState: IState = {
  activeSidebar: false,
  activeWidgets: false,
};

const closeSidebarSlice = createSlice({
  name: "closeSidebar",
  initialState,
  reducers: {
    openSidebar: (state) => {
      state.activeSidebar = false;
    },
    closeSidebar: (state) => {
      state.activeSidebar = true;
    },
    toggleSidebar: (state) => {
      state.activeWidgets = false;
      state.activeSidebar = !state.activeSidebar;
    },
    openWidgets: (state) => {
      state.activeWidgets = true;
    },
    closeWidgets: (state) => {
      state.activeWidgets = false;
    },
    toggleWidgets: (state) => {
      state.activeSidebar = true;
      state.activeWidgets = !state.activeWidgets;
    },
  },
});

export const {
  openSidebar,
  closeSidebar,
  toggleSidebar,
  openWidgets,
  closeWidgets,
  toggleWidgets,
} = closeSidebarSlice.actions;
export default closeSidebarSlice.reducer;
