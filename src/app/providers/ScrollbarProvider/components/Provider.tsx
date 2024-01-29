"use client";
import MyScrollbar from "@/shared/UI/MyScrollbar";
import Footer from "@/widgets/Footer";
import { FC, ReactNode } from "react";

interface IProps {
  children: ReactNode;
}
export const ScrollbarProvider: FC<IProps> = ({ children }) => {
  return (
    <MyScrollbar
      autoHide={false}
      style={{ height: "87%", width: "99%", flex: "1 1 auto" }}
    >
      <>
        {children}
        <Footer />
      </>
    </MyScrollbar>
  );
};
