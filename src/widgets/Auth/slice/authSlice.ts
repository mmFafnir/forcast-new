import { EnumStatus } from "@/shared/types/Enums";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TypeUser } from "..";
import { login } from "./asyncActions";
import { ErrorValid } from "@/shared/types/ErrorType";
import { destroyCookie, setCookie } from "nookies";

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

    logout: (state) => {
      state.auth = false;
      state.user = null;
      destroyCookie(undefined, "_token");
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
      setCookie(null, "_token", action.payload.token, {
        path: "/",
      });
    });
    builder.addCase(login.rejected, (state, action) => {
      state.errorsValid = action.payload as ErrorValid[];
      state.status = EnumStatus.ERROR;
    });
  },
});

export const { setAuth, setUser, logout } = authSlice.actions;

export default authSlice.reducer;
