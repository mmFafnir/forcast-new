"use client";
import Button from "@/shared/UI/Button";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";

import styles from "../styles/style.module.scss";
import { closeSidebar, toggleSidebar } from "../slice/closeSidebarSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export const CloseSidebarButton = () => {
  const { activeSidebar } = useTypeSelector((state) => state.closeSidebar);
  const dispatch = useDispatch();

  const onClose = () => dispatch(closeSidebar());
  const onToggleSidebar = () => dispatch(toggleSidebar());

  useEffect(() => {
    if (window.innerWidth < 1250) {
      onClose();
    }
  }, []);
  return (
    <Button className={styles.button} onClick={onToggleSidebar}>
      <svg
        className={activeSidebar ? styles.close : ""}
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
