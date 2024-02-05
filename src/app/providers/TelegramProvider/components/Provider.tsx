"use client";
import { FC, ReactNode } from "react";
import Script from "next/script";
import { useEffect } from "react";
import type { ITelegramUser, IWebApp } from "../types";
import { loginInWebView } from "../api/loginInWebView";

export interface ITelegramContext {
  webApp?: IWebApp;
  user?: ITelegramUser;
}

interface IProps {
  children: ReactNode;
}

export const TelegramProvider: FC<IProps> = ({ children }) => {
  useEffect(() => {
    const app = (window as any).Telegram?.WebApp;
    if (app) {
      app.ready();
      const value = app
        ? {
            app,
            unsafeData: app.initDataUnsafe,
            user: app.initDataUnsafe.user,
          }
        : {};

      alert(app.initDataUnsafe.user);
      loginInWebView(value.user);
    }
  }, []);

  return (
    <>
      <Script
        src="https://telegram.org/js/telegram-web-app.js"
        strategy="beforeInteractive"
      />
      {children}
    </>
  );
};
