import { FC } from "react";
import styles from "../../styles/success.module.scss";
import IconSuccess from "@/shared/icons/IconSuccess";
import Button from "@/shared/UI/Button";

export const Success: FC = () => {
  return (
    <div className={styles.body}>
      <p>Вы успешно авторизованы</p>
      <IconSuccess />

      <p>Вы будете перенаправлены на сайт через 10 сек</p>

      <Button href="/">На главную</Button>
    </div>
  );
};
