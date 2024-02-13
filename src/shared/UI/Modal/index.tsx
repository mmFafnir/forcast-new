"use client";

import { CSSProperties, FC, ReactNode, useEffect } from "react";
import styles from "./style.module.scss";
import { useTypeDispatch } from "@/shared/hooks/useTypeDispatch";
import { closeAllModal } from "./modalSlice";
import { EnumModals } from "./EnumModals";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";

interface IProps {
  children: ReactNode;
  name: EnumModals;
  stylesWrapper?: CSSProperties;
  styleContent?: CSSProperties;
  classContent?: string;
  title?: string | ReactNode;
  iconClose?: ReactNode;
  onCloseCallback?: () => void;
  titleAlight?: "left" | "center" | "right";
  styleBody?: CSSProperties;
  styleChildren?: CSSProperties;
}
const Modal: FC<IProps> = ({
  children,
  stylesWrapper = {},
  styleContent = stylesWrapper,
  name,
  title,
  iconClose,
  onCloseCallback,
  styleBody = {},
  styleChildren = {},
  titleAlight = "left",
  classContent = "",
}) => {
  const { modal } = useTypeSelector((state) => state.modal);
  const dispatch = useTypeDispatch();
  const onClose = () => {
    dispatch(closeAllModal());
  };

  return (
    <div
      style={styleBody}
      className={`${styles.body} ${name === modal ? styles.show : ""}`}
    >
      <div className={styles.bg} onClick={onClose}></div>
      <div
        className={`${styles.wrapper} ${title ? styles.wrapperTitle : ""}`}
        style={stylesWrapper}
      >
        <div style={styleContent} className={classContent}>
          {title && (
            <div className={styles.header}>
              <div className={styles.title} style={{ textAlign: titleAlight }}>
                {title}
              </div>
              <button onClick={onCloseCallback ? onCloseCallback : onClose}>
                {iconClose ? (
                  iconClose
                ) : (
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 11 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.71777 0.472656L5.59277 4.5612L8.46777 0.472656H10.5928L6.71777 5.47266L10.5928 10.4727H8.46777L5.59277 6.59245L2.71777 10.4727H0.592773L4.40527 5.47266L0.592773 0.472656H2.71777Z"
                      fill="white"
                    />
                  </svg>
                )}
              </button>
            </div>
          )}
          <div className={styles.content} style={styleChildren}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
