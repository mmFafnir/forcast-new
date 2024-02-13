import { EnumStatus } from "@/shared/types/Enums";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TypeUser } from "..";
import {
  changeStatusNotification,
  deleteAllNotification,
  deleteNotification,
  getNotification,
  login,
} from "./asyncActions";
import { ErrorValid } from "@/shared/types/ErrorType";
import { destroyCookie, setCookie } from "nookies";
import { INotification } from "../types/Notify";

interface IState {
  auth: boolean;
  status: EnumStatus;
  user: TypeUser | null;
  token: string | null;
  errorsValid: ErrorValid[];
  notification: INotification[];
}

const initialState: IState = {
  auth: false,
  status: EnumStatus.LOADING,
  user: null,
  token: null,
  errorsValid: [],
  notification: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.auth = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setUser: (state, action: PayloadAction<TypeUser>) => {
      state.user = action.payload;
      state.auth = true;
    },

    logout: (state) => {
      state.auth = false;
      state.user = null;
      setCookie(null, "_token", "", {
        path: "/",
      });
    },

    setStatus: (state, action: PayloadAction<EnumStatus>) => {
      state.status = action.payload;
    },
  },

  extraReducers(builder) {
    // login
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

    // notification
    builder.addCase(getNotification.pending, (state) => {
      state.status = EnumStatus.LOADING;
    });
    builder.addCase(
      getNotification.fulfilled,
      (state, action: PayloadAction<INotification[]>) => {
        state.status = EnumStatus.SUCCESS;
        state.notification = action.payload;
      }
    );
    builder.addCase(getNotification.rejected, (state) => {
      state.status = EnumStatus.ERROR;
    });

    // delete
    builder.addCase(deleteNotification.fulfilled, (state, action) => {
      state.status = EnumStatus.SUCCESS;
      state.notification = [
        ...state.notification.filter((state) => state.id !== action.payload),
      ];
    });
    builder.addCase(deleteNotification.rejected, (state) => {
      state.status = EnumStatus.ERROR;
    });

    builder.addCase(deleteAllNotification.fulfilled, (state) => {
      state.status = EnumStatus.SUCCESS;
      state.notification = [];
    });
    builder.addCase(deleteAllNotification.rejected, (state) => {
      state.status = EnumStatus.ERROR;
    });

    // change status
    builder.addCase(changeStatusNotification.fulfilled, (state, action) => {
      state.status = EnumStatus.SUCCESS;
      state.notification = state.notification.map((not) => {
        if (not.id === action.payload.id) {
          const newNot = not;
          newNot.status = `${action.payload.status}`;
          return newNot;
        }
        return not;
      });
    });
    builder.addCase(changeStatusNotification.rejected, (state) => {
      state.status = EnumStatus.ERROR;
    });
  },
});

export const { setAuth, setUser, logout, setStatus, setToken } =
  authSlice.actions;

export default authSlice.reducer;
