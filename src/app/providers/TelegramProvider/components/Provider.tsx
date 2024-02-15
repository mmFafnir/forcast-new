"use client";
import { FC, ReactNode } from "react";
import Script from "next/script";
import { useEffect } from "react";
import type { ITelegramUser, IWebApp } from "../types";
import { loginInWebView } from "../api/loginInWebView";
import { TypeUser } from "@/widgets/Auth";
import { useTypeDispatch } from "@/shared/hooks/useTypeDispatch";
import { setCookie } from "nookies";
import { setUser } from "@/widgets/Auth/slice/authSlice";

export interface ITelegramContext {
  webApp?: IWebApp;
  user?: ITelegramUser;
}

interface IProps {
  user: TypeUser | null;
  children: ReactNode;
}

export const TelegramProvider: FC<IProps> = ({ children, user }) => {
  const dispatch = useTypeDispatch();

  useEffect(() => {
    if (user) return;
    const app = (window as any).Telegram?.WebApp;
    if (app) {
      app.expand();
      app.ready();
      const value = app
        ? {
            app,
            unsafeData: app.initDataUnsafe,
            user: app.initDataUnsafe.user,
          }
        : {};

      alert(value.user);
      if (!value.user) return;
      loginInWebView(value.user).then((res) => {
        dispatch(setUser(res.data));
        setCookie(null, "_token", res.token, {
          path: "/",
        });
      });
    }
  }, []);

  return (
    <>
      {/* <Script
        src="https://telegram.org/js/telegram-web-app.js"
        strategy="beforeInteractive"
      /> */}
      {children}
    </>
  );
};
