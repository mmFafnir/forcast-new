import { EnumStatus } from "@/shared/types/Enums";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TypeUser } from "..";
import { login } from "./asyncActions";
import { ErrorValid } from "@/shared/types/ErrorType";

interface IState {
  auth: boolean;
  status: EnumStatus;
  user: TypeUser | null;
  errorsValid: ErrorValid[];
}

const initialState: IState = {
  auth: false,
  status: EnumStatus.DEFAULT,
  user: null,
  errorsValid: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.auth = action.payload;
    },
    setUser: (state, action: PayloadAction<TypeUser>) => {
      state.user = action.payload;
      state.auth = false;
    },
  },

  extraReducers(builder) {
    builder.addCase(login.pending, (state) => {
      state.status = EnumStatus.LOADING;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.status = EnumStatus.SUCCESS;
      state.auth = true;
      state.user = action.payload.user;
    });
    builder.addCase(login.rejected, (state, action) => {
      console.log(action);
      state.errorsValid = action.payload as ErrorValid[];
      state.status = EnumStatus.ERROR;
    });
  },
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
