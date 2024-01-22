import styles from "../styles/prem.match.module.scss";
import { Premium } from "../ui/Premium";

export const PremMatchBanner = () => {
  return (
    <div className={styles.body}>
      <Premium />
      <p className={styles.text}>
        ПО РЕФЕРАЛЬНОЙ ССЫЛКЕ со СКИДКОЙ <span>25%</span>
      </p>
    </div>
  );
};
