"use client";

import { FC, ReactNode, useEffect, useState } from "react";
import styles from "./tabs.module.scss";
import Button from "../Button";
import Tab, { TypeTab } from "./ui/Tab";

interface IProps {
  tabs: TypeTab[];
  minHeight?: string;
  maxHeight?: string;
  renderHeader?: ReactNode;
  currentTab?: string | number;
}

const Tabs: FC<IProps> = ({
  tabs,
  maxHeight = "auto",
  minHeight = "auto",
  renderHeader,
  currentTab,
}) => {
  const [activeId, setActiveId] = useState<string | number>(tabs[0].id);

  useEffect(() => {
    if (!currentTab) return;
    setActiveId(currentTab);
  }, [currentTab]);

  return (
    <div className={styles.tabs}>
      {renderHeader || (
        <div className={styles.header}>
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              onClick={() => setActiveId(tab.id)}
              style={{ flexBasis: 100 / tabs.length + "%" }}
              active={activeId === tab.id}
            >
              {tab.title}
            </Button>
          ))}
        </div>
      )}
      <div className={styles.body} style={{ height: minHeight }}>
        <div>
          {tabs.map((tab) => (
            <Tab key={tab.id} tab={tab} activeId={activeId} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tabs;
