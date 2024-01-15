"use client";

import React, { FC, ReactNode, useState } from "react";
import styles from "./tabs.module.scss";
import Button from "../Button";
import Scrollbars from "react-custom-scrollbars-2";

type TypeTab = {
  title: string;
  id: number | string;
  content: ReactNode;
};

interface IProps {
  tabs: TypeTab[];
  minHeight?: string;
  maxHeight?: string;
}

const Tabs: FC<IProps> = ({ tabs, maxHeight = "auto", minHeight = "auto" }) => {
  const [activeId, setActiveId] = useState<string | number>(tabs[0].id);

  return (
    <div className={styles.tabs}>
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
      <div className={styles.body} style={{ height: minHeight }}>
        <Scrollbars universal={true}>
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`${styles.item} ${
                activeId === tab.id ? styles.active : ""
              }`}
            >
              {tab.content}
            </div>
          ))}
        </Scrollbars>
      </div>
    </div>
  );
};

export default Tabs;
