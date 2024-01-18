import React, { FC } from "react";
import { Wrapper } from "../ui/Wrapper";
import Button from "@/shared/UI/Button";
import styles from "../styles/request.module.scss";
import Link from "next/link";

interface IProps {
  premium?: boolean;
}
export const EventSendRequest: FC<IProps> = ({ premium = false }) => {
  return (
    <Wrapper>
      <p>
        У нас отсутствуют прогнозы на данный матч. Но вы можете отправить нам
        запрос и получить информацию. Не забудьте добавить матч в избранное
      </p>
      {premium ? (
        <Button className={styles.button} type="gradient">
          Отправить запрос
        </Button>
      ) : (
        <div className={styles.premium}>
          <p>
            Доступно только <Link href={"/"}>PREMIUM</Link> пользователям
          </p>
        </div>
      )}
    </Wrapper>
  );
};
