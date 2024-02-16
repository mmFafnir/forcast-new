"use client";

import { FC, ReactNode, useEffect } from "react";
import { IStatePusher } from "../types";
import { useTypeDispatch } from "@/shared/hooks/useTypeDispatch";
import {
  setTelegramId,
  setToken,
  setUser,
} from "@/widgets/Auth/slice/authSlice";
import Pusher from "pusher-js";

import { parseCookies, setCookie } from "nookies";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";

interface IProps {
  children: ReactNode;
}
export const PusherProvider: FC<IProps> = ({ children }) => {
  const dispatch = useTypeDispatch();
  const { user } = useTypeSelector((state) => state.auth);
  useEffect(() => {
    const Pushers = async () => {
      const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY as string, {
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER as string,
      });
      const channel = pusher.subscribe("AiSportacle");
      channel.bind(
        "App\\Events\\NewNotification",
        function (data: IStatePusher) {
          console.log(data);
          const { pusher_code } = parseCookies();
          if (!data.message) return;
          console.log(pusher_code == data.message.code);
          if (pusher_code != data.message.code) return;
          if (
            data.message.type === "confirm_login_for_telegram" &&
            data.message.token
          ) {
            dispatch(setToken(data.message.token));
          }

          if (data.message.type === "binding_telegram_is_true") {
            dispatch(setTelegramId(Number(data.message.telegram_id)));
          }
          setCookie(null, "pusher_code", "", {
            path: "/",
          });
        }
      );
    };

    Pushers();
    setCookie(null, "pusher_code", "", {
      path: "/",
    });
  }, []);
  return <>{children}</>;
};
