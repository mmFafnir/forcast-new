"use client";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import { EnumStatus } from "@/shared/types/Enums";
import { TypeUser, getUserInfo } from "@/widgets/Auth";
import { setStatus, setUser } from "@/widgets/Auth/slice/authSlice";
import { useSession } from "next-auth/react";
import { parseCookies } from "nookies";
import { FC, ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";

interface IProps {
  user: TypeUser | null;
  children: ReactNode;
}

export const UserProvider: FC<IProps> = ({ user, children }) => {
  const { auth } = useTypeSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { data } = useSession();

  useEffect(() => {
    dispatch(setStatus(EnumStatus.DEFAULT));
    if (!user) return;
    dispatch(setUser(user));
  }, []);

  useEffect(() => {
    if (auth || !data) return;
    const { _token } = parseCookies();
    if (!_token || _token.trim().length == 0) return;
    getUserInfo(_token).then((res) => {
      dispatch(setUser(res));
    });
  }, [data]);
  return <>{children}</>;
};
