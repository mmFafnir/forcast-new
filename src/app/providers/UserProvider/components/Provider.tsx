"use client";
import { TypeUser } from "@/widgets/Auth";
import { setUser } from "@/widgets/Auth/slice/authSlice";
import { FC, ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";

interface IProps {
  user: TypeUser | null;
  children: ReactNode;
}

export const UserProvider: FC<IProps> = ({ user, children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) return;
    dispatch(setUser(user));
  }, []);
  return <>{children}</>;
};
