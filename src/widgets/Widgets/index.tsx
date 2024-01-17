"use client";

import { FC, ReactNode, useEffect } from "react";
import styles from "./widgets.module.scss";
import Scrollbars from "react-custom-scrollbars-2";
interface IProps {
  widgets: ReactNode[];
}

const Widgets: FC<IProps> = ({ widgets }) => {
  return (
    <div className={styles.body}>
      <div className={styles.content}>
        <div className={styles.scroll}>
          <Scrollbars universal={true} autoHide>
            {widgets.map((wid, index) => (
              <div className={styles.item} key={index}>
                {wid}
              </div>
            ))}
          </Scrollbars>
        </div>
      </div>
    </div>
  );
};

export default Widgets;
