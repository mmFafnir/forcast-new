import { FC } from "react";
import styles from "../styles/promocode.module.scss";
import { IconWrapCode } from "../icons/IconWrapCode";
import Button from "@/shared/UI/Button";
import { IconOk } from "../icons/IconOk";

export const PromoCode: FC = () => {
  return (
    <div className={styles.body}>
      <div className={styles.promo}>
        <div className={styles.code}>
          <IconWrapCode />
          <input type="text" placeholder="Введите промокод" />
        </div>
        <Button className={styles.btn} type="gradient">
          Применить
        </Button>
      </div>
      <p className={styles.error}>Неверный промокод</p>
      <div className={styles.success}>
        <IconOk />
        <p>
          Промокод CV2AX: <span>Активирован</span>
        </p>
      </div>
      <div className={styles.discount}>
        <p>
          Держи еще скидку: <span>20%</span>
        </p>
        <p>
          И бонусных дней для тестов: <span>+4</span>
        </p>
      </div>
    </div>
  );
};
