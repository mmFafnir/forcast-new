"use client";
import React from "react";
import Logo from "@/shared/UI/Logo";
import { LanguagesSelect } from "@/features/languages";
import Button from "@/shared/UI/Button";
import { TimezoneSelect } from "@/features/timezone";
import { BreadCrumbs } from "@/features/breadсrumbs";
import { CloseSidebarButton } from "@/features/closeSidebar";
import "./style.scss";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";

const Header = () => {
  const { active } = useTypeSelector((state) => state.closeSidebar);
  return (
    <div className="header">
      <div className="header__flex">
        <div className={`header__logo ${active ? "active" : ""}`}>
          <div>
            <Logo style={{ flex: "0 0 160px" }} />
          </div>
        </div>
        <CloseSidebarButton />
        <div className="header__bread">
          <BreadCrumbs />
        </div>
      </div>
      <div className="header__flex">
        <LanguagesSelect />
        <TimezoneSelect />
        <Button width="173px" height="27px" type="gradient">
          Войти
        </Button>
      </div>
    </div>
  );
};

export default Header;
