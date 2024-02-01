"use client";

import { configureStore } from "@reduxjs/toolkit";
import closeSidebarSlice from "@/features/closeSidebar/slice/closeSidebarSlice";
import filterSlice from "@/features/filters/slice/filterSlice";
import toolkitSlice from "@/features/Toolkit/slice/toolkitSlice";
import modalSlice from "@/shared/UI/Modal/modalSlice";
import authSlice from "@/widgets/Auth/slice/authSlice";
import pinLeagueSlice from "@/features/favorites/slice/pinLeagueSlice";

export const store = configureStore({
  reducer: {
    closeSidebar: closeSidebarSlice,
    filters: filterSlice,
    toolkit: toolkitSlice,
    modal: modalSlice,
    auth: authSlice,
    pinLeague: pinLeagueSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
