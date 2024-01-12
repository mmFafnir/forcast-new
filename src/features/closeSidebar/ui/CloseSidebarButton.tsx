"use client";
import Button from "@/shared/UI/Button";
import { useTypeDispatch } from "@/shared/hooks/useTypeDispatch";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";

import styles from "../styles/style.module.scss";
import { closeSidebar, openSidebar } from "../slice/closeSidebarSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export const CloseSidebarButton = () => {
  const { active } = useTypeSelector((state) => state.closeSidebar);
  const dispatch = useDispatch();

  const onOpen = () => dispatch(openSidebar());
  const onClose = () => dispatch(closeSidebar());

  return (
    <Button className={styles.button} onClick={active ? onClose : onOpen}>
      <svg
        className={active ? styles.close : ""}
        width="10"
        height="12"
        viewBox="0 0 10 12"
        fill="none"
      >
        <path
          d="M0.533203 6.00004L9.46655 0.842371V11.1577L0.533203 6.00004Z"
          fill="white"
        />
      </svg>
    </Button>
  );
};
