"use client";

import { FC, ReactNode } from "react";
import styles from "./widgets.module.scss";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import { useTypeDispatch } from "@/shared/hooks/useTypeDispatch";
import { closeWidgets } from "@/features/closeSidebar/slice/closeSidebarSlice";
import { TimezoneSelect } from "@/features/timezone";
import { ButtonLogin } from "../Auth";
import { ModalAgreeCookies } from "../Cookies";
import { NotifyModal } from "@/features/notification";

interface IProps {
  widgets: ReactNode[];
}

const Widgets: FC<IProps> = ({ widgets }) => {
  const dispatch = useTypeDispatch();
  const { auth } = useTypeSelector((state) => state.auth);
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
            <div className={styles.btns}>
              {/* <LanguagesSelect /> */}
              <TimezoneSelect />
              <ButtonLogin />
            </div>
            <div className={styles.widgets}>
              {/* <MyScrollbar> */}
              {widgets.map((wid, index) => (
                <div
                  className={styles.item}
                  style={index === 0 ? { flex: "1 1 auto" } : {}}
                  key={index}
                >
                  {wid}
                </div>
              ))}
              {/* </MyScrollbar> */}
            </div>
            <ModalAgreeCookies />
          </div>
        </div>
        {auth && <NotifyModal />}
      </div>
    </>
  );
};

export default Widgets;
