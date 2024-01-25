"use client";

import { FC, ReactNode } from "react";
import styles from "./widgets.module.scss";
import Scrollbars from "react-custom-scrollbars-2";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import { useTypeDispatch } from "@/shared/hooks/useTypeDispatch";
import { closeWidgets } from "@/features/closeSidebar/slice/closeSidebarSlice";
import MyScrollbar from "@/shared/UI/MyScrollbar";
interface IProps {
  widgets: ReactNode[];
}

const Widgets: FC<IProps> = ({ widgets }) => {
  const dispatch = useTypeDispatch();
  const { activeWidgets } = useTypeSelector((state) => state.closeSidebar);

  const onCloseWidget = () => dispatch(closeWidgets());

  return (
    <>
      <div
        className={`bg-hover ${!activeWidgets && "close"}`}
        onClick={onCloseWidget}
      ></div>
      <div className={`${styles.body} ${activeWidgets ? styles.active : ""}`}>
        <div className={styles.content}>
          <div className={styles.scroll}>
            <MyScrollbar universal={true} autoHide>
              {widgets.map((wid, index) => (
                <div className={styles.item} key={index}>
                  {wid}
                </div>
              ))}
            </MyScrollbar>
          </div>
        </div>
      </div>
    </>
  );
};

export default Widgets;
