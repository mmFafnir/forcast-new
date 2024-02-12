import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { EnumModals } from "./EnumModals";

interface IState {
  modal: EnumModals | null;
  click: string | null;
}

const initialState: IState = {
  modal: null,
  click: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModal: (state, action: PayloadAction<EnumModals>) => {
      state.modal = action.payload;
    },

    setClick: (state, action: PayloadAction<string>) => {
      state.click = action.payload;
    },

    closeAllModal: (state) => {
      state.modal = null;
      state.click = null;
    },
  },
});

export const { setModal, closeAllModal, setClick } = modalSlice.actions;
export default modalSlice.reducer;
