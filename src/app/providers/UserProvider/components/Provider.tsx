"use client";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import { EnumStatus } from "@/shared/types/Enums";
import { TypeUser } from "@/widgets/Auth";
import { setStatus, setToken, setUser } from "@/widgets/Auth/slice/authSlice";
import { useSession } from "next-auth/react";
import { FC, ReactNode, use, useEffect } from "react";
import { useDispatch } from "react-redux";

interface IProps {
  user: TypeUser | null;
  children: ReactNode;
}

export const UserProvider: FC<IProps> = ({ user, children }) => {
  const { data } = useSession();

  const userParams = useTypeSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setStatus(EnumStatus.DEFAULT));
    if (!user) return;
    dispatch(setUser(user));
  }, []);

  useEffect(() => {
    if (userParams.user || !data) return;
    const user = data.user as TypeUser;
    // @ts-ignore
    const token = data.token;
    dispatch(setUser({ ...user, favorite_count: [] }));
    dispatch(setToken(token));
  }, [data]);
  return <>{children}</>;
};
