"use client";
import { FC } from "react";
import { BreadCrumbs } from "@/features/breadсrumbs";
import { CloseSidebarButton } from "@/features/closeSidebar";
import "./style.scss";
import MobileHeader from "./components/MobileHeader";

const Header: FC = () => {
  return (
    <>
      <div className="header">
        <div className="header__flex">
          <CloseSidebarButton />
        </div>
        <div className="header__bread">
          <BreadCrumbs />
        </div>
      </div>
      <MobileHeader />
    </>
  );
};

export default Header;
