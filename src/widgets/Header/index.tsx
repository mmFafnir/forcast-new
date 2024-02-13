"use client";
import { FC } from "react";
import { BreadCrumbs, IBreadCrumb } from "@/features/breadсrumbs";
import { CloseSidebarButton } from "@/features/closeSidebar";
import MobileHeader from "./components/MobileHeader";
import "./style.scss";

interface IProps {
  breadCrumbs: IBreadCrumb[];
}
const Header: FC<IProps> = ({ breadCrumbs }) => {
  return (
    <>
      <div className={`header ${breadCrumbs.length == 0 ? "header-mob" : ""}`}>
        <div className="header__flex">
          <CloseSidebarButton />
        </div>
        <div className="header__bread">
          <BreadCrumbs links={breadCrumbs} />
        </div>
      </div>
      <MobileHeader />
    </>
  );
};

export default Header;
