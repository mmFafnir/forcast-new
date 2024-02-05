"use client";
import { FC, ReactNode, useEffect, useState } from "react";
import styles from "../tabs.module.scss";

export type TypeTab = {
  title: string;
  id: number | string;
  content: ReactNode;
};

interface IProps {
  tab: TypeTab;
  activeId: number | string;
  className?: string;
}

const Tab: FC<IProps> = ({ tab, activeId, className }) => {
  const [hidden, setHidden] = useState<boolean>(activeId !== tab.id);
  const [showStyle, setShowStyle] = useState<boolean>(activeId === tab.id);
  useEffect(() => {
    const hide = activeId !== tab.id;
    const show = activeId === tab.id;
    if (hide) {
      setTimeout(() => setShowStyle(show), 0);
      setTimeout(() => setHidden(hide), 300);
    }
    if (show) {
      setTimeout(() => setHidden(hide), 0);
      setTimeout(() => setShowStyle(show), 300);
    }
    // setHidden(hide);
  }, [activeId]);
  return (
    <div
      key={tab.id}
      className={`${styles.item} ${
        showStyle ? styles.active : ""
      } ${className}`}
      style={{ display: hidden ? "none" : "block" }}
    >
      {tab.content}
    </div>
  );
};

export default Tab;
