import React, { FC, ReactNode } from "react";
import styles from "../styles/group.module.scss";
import SportsIcon, { TypeSportIcon } from "@/shared/icons/sports";
import TotalMatches from "@/shared/UI/TotalMatches";

interface IProps {
  children: ReactNode;
  title?: string;
  total: string | number;
  icon?: TypeSportIcon;
  headerRender?: () => ReactNode;
}
export const SportGroup: FC<IProps> = ({
  children,
  title,
  total,
  icon,
  headerRender,
}) => {
  return (
    <div className={styles.body}>
      <div className={styles.header}>
        {headerRender ? (
          headerRender()
        ) : (
          <div className={styles.sport}>
            {icon && <SportsIcon icon={icon} />}
            {title && <h2>{title}</h2>}
          </div>
        )}
        <div>
          <TotalMatches>{total}</TotalMatches>
        </div>
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  );
};
