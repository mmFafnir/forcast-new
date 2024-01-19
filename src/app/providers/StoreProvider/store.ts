"use client";

import { configureStore } from "@reduxjs/toolkit";
import closeSidebarSlice from "@/features/closeSidebar/slice/closeSidebarSlice";
import filterSlice from "@/features/filters/slice/filterSlice";
import toolkitSlice from "@/features/Toolkit/slice/toolkitSlice";

export const store = configureStore({
  reducer: {
    closeSidebar: closeSidebarSlice,
    filters: filterSlice,
    toolkit: toolkitSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
