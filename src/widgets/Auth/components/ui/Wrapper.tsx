import { FC, ReactNode } from "react";
import styles from "../../styles/wrapper.module.scss";

interface IProps {
  children: ReactNode;
}
export const Wrapper: FC<IProps> = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>{children}</div>
    </div>
  );
};
