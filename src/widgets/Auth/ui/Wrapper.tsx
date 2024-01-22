import { FC, ReactNode } from "react";
import styles from "../styles/wrapper.module.scss";

import bg1 from "../images/bg1.png";
import bg2 from "../images/bg2.png";
import Image from "next/image";

interface IProps {
  children: ReactNode;
}
export const Wrapper: FC<IProps> = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      {/* <Image className={styles.bg1} src={bg1} width={129} alt="bg" /> */}
      <div className={styles.content}>{children}</div>
      {/* <Image className={styles.bg2} src={bg2} width={159} alt="bg" /> */}
    </div>
  );
};
