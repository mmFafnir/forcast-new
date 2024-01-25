import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { EnumModals } from "./EnumModals";

interface IState {
  modal: EnumModals | null;
}

const initialState: IState = {
  modal: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModal: (state, action: PayloadAction<EnumModals>) => {
      state.modal = action.payload;
    },

    closeAllModal: (state) => {
      state.modal = null;
    },
  },
});

export const { setModal, closeAllModal } = modalSlice.actions;
export default modalSlice.reducer;
