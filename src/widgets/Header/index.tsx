"use client";
import { FC } from "react";
import { LanguagesSelect } from "@/features/languages";
import { TimezoneSelect } from "@/features/timezone";
import { BreadCrumbs } from "@/features/breadсrumbs";
import { CloseSidebarButton } from "@/features/closeSidebar";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import { ButtonLogin } from "../Auth";
import Logo from "@/shared/UI/Logo";
import "./style.scss";
import MobileHeader from "./components/MobileHeader";

const Header: FC = () => {
  const { activeSidebar } = useTypeSelector((state) => state.closeSidebar);

  return (
    <>
      <div className="header">
        <div className="header__flex">
          {/* <div className={`header__logo ${activeSidebar ? "active" : ""}`}>
            <div>
              <Logo style={{ flex: "0 0 160px" }} />
            </div>
          </div> */}
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
