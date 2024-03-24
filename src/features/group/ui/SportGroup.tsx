"use client";
import { FC, ReactNode, useEffect, useRef, useState } from "react";
import styles from "../styles/group.module.scss";
import SportsIcon, { TypeSportIcon } from "@/shared/icons/sports";
import TotalMatches from "@/shared/UI/TotalMatches";
import IconArrow from "@/shared/icons/IconArrow";
import useAccordion, {
  IAccordionStylesIcon,
} from "@/shared/hooks/useAccardion";
import { CSSTransition } from "react-transition-group";

interface IProps {
  children: ReactNode;
  title?: string;
  total?: string | number;
  icon?: TypeSportIcon;
  headerRender?: ReactNode;
  type?: "search" | "main";
}

const iconStyles: IAccordionStylesIcon = {
  open: {},
  close: {
    transform: `scale(1, -1)`,
  },
};

export const SportGroup: FC<IProps> = ({
  children,
  title,
  total,
  icon,
  headerRender,
  type,
}) => {
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  const [isShow, setIsShow] = useState<boolean>(false);
  const { iconStyle, onToggle, currentHeight } = useAccordion({
    iconStyles,
    ref: listRef,
  });

  useEffect(() => {
    if (!bodyRef.current) return;
    const header = bodyRef.current.querySelector(
      ".group-header"
    ) as HTMLElement;
    if (
      header &&
      !header.closest(".group-body") &&
      header.closest(".simplebar-content")
    ) {
      header.style.top = "0px";
    }
    setIsShow(true);
    // initialSticky(bodyRef.current);
  }, []);

  return (
    // <CSSTransition
    //   in={isShow}
    //   nodeRef={bodyRef}
    //   timeout={500}
    //   classNames="alert"
    // >
    <div
      ref={bodyRef}
      className={`${styles.body} ${
        type == "main" ? styles.main : ""
      } group-list`}
    >
      <div className={`${styles.header} group-header`}>
        {headerRender ? (
          headerRender
        ) : (
          <div className={styles.sport}>
            {icon && <SportsIcon icon={icon} />}
            {title && <h2>{title}</h2>}
          </div>
        )}
        <div className={styles.right}>
          {total && <TotalMatches>{total}</TotalMatches>}
          <button onClick={onToggle} className="acc-hover" style={iconStyle}>
            <IconArrow />
          </button>
        </div>
      </div>
      <div
        className={`${styles.list} group-body`}
        style={{ height: currentHeight + "px" }}
      >
        <div ref={listRef}>{children}</div>
      </div>
    </div>
    // </CSSTransition>
  );
};
