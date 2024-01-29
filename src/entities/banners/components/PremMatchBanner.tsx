import { FC, ReactNode } from "react";
import styles from "../styles/prem.match.module.scss";
import { Premium } from "../ui/Premium";

interface IProps {
  text?: string | ReactNode;
}
export const PremMatchBanner: FC<IProps> = ({ text }) => {
  return (
    <div className={styles.body}>
      <Premium />
      <p className={styles.text}>
        {text || (
          <>
            <i>ПО РЕФЕРАЛЬНОЙ ССЫЛКЕ</i> со СКИДКОЙ <span>25%</span>
          </>
        )}
      </p>
    </div>
  );
};
