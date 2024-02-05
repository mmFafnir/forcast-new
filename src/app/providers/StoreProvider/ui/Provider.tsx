"use client";
import { Provider } from "react-redux";

import { FC, ReactNode, useEffect } from "react";
import { store } from "../store";

interface IProps {
  children: ReactNode;
}

export const StoreProvider: FC<IProps> = ({ children }) => {
  // useEffect(() => {
  //   // @ts-ignore
  //   let tg = window.Telegram.WebApp;
  //   tg.expand();
  //   alert(JSON.stringify(tg.initDataUnsafe));
  // }, []);
  return <Provider store={store}>{children}</Provider>;
};
