"use client";

import { FC, ReactNode, useEffect } from "react";
import { IStatePusher } from "../types";
import { useTypeDispatch } from "@/shared/hooks/useTypeDispatch";
import { setToken } from "@/widgets/Auth/slice/authSlice";
import Pusher from "pusher-js/with-encryption";

interface IProps {
  children: ReactNode;
}
export const PusherProvider: FC<IProps> = ({ children }) => {
  const dispatch = useTypeDispatch();
  const Pushers = async () => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY as string, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER as string,
    });
    const channel = pusher.subscribe("AiSportacle");
    channel.bind("App\\Events\\NewNotification", function (data: IStatePusher) {
      console.log(data);
      if (!data.message) return;
      if (
        data.message.type === "confirm_login_for_telegram" &&
        data.message.token
      ) {
        dispatch(setToken(data.message.token));
      }
      console.log(data);
    });
  };
  useEffect(() => {
    Pushers();
  }, []);
  return <>{children}</>;
};
