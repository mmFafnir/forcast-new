"use client";
import { FC } from "react";
import { BreadCrumbs, IBreadCrumb } from "@/features/breadсrumbs";
import { CloseSidebarButton } from "@/features/closeSidebar";
import "../styles/header.scss";

interface IProps {
  breadCrumbs: IBreadCrumb[];
}
export const Header: FC<IProps> = ({ breadCrumbs }) => {
  return (
    <>
      <div className={`header ${breadCrumbs.length == 0 ? "header-mob" : ""}`}>
        <div className="header__bread">
          <BreadCrumbs links={breadCrumbs} />
        </div>
      </div>
    </>
  );
};
