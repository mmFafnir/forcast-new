"use client";
import { FC, useState } from "react";
import { Wrapper } from "../ui/Wrapper";
import Button from "@/shared/UI/Button";
import styles from "../styles/request.module.scss";
import { useTypeDispatch } from "@/shared/hooks/useTypeDispatch";
import { setModal } from "@/shared/UI/Modal/modalSlice";
import { EnumModals } from "@/shared/UI/Modal/EnumModals";
import { sendGetAnalysis } from "../api/sendGetAnalysis";

interface IProps {
  premium?: boolean;
  id: number;
}

export const EventSendRequest: FC<IProps> = ({ premium = false, id }) => {
  const dispatch = useTypeDispatch();

  const [loading, setLoading] = useState<boolean>(false);

  const onOpenPrem = () => dispatch(setModal(EnumModals.PREMIUM));
  const createAnalysis = () => {
    setLoading(true);
    sendGetAnalysis(id).then((res) => {
      console.log(res);
    });
  };

  return (
    <Wrapper>
      {loading ? (
        <div className={styles.success}>
          <p className={styles.title}>Запрос на прогноз успешно получен!</p>
          <p>
            Последние игры команд уже состоялись, и S Æ A-XI уже начала активно
            работать над созданием прогноза для тебя. Это займет около 10-15
            минут. Страница матча будет обновлена автоматически, как только
            прогноз будет готов. Благодарим за терпение. Чтобы не пропустить
            обновления, добавь матч в избранное и оставайся в курсе последних
            событий.{" "}
          </p>
        </div>
      ) : (
        <p>
          В настоящий момент прогноз на этот матч еще не доступен. Ты можешь
          запросить анализ и прогноз, используя кнопку ниже. Обрати внимание:
          прогноз будет подготовлен только после того, как команды сыграют свои
          последние игры. Ты получишь уведомление, как только прогноз станет
          доступен.
        </p>
      )}
      {premium ? (
        <Button
          loading={loading}
          onClick={createAnalysis}
          className={styles.button}
          type="gradient"
        >
          Отправить запрос
        </Button>
      ) : (
        <div className={styles.premium}>
          <p>
            Доступно только <button onClick={onOpenPrem}>PREMIUM</button>{" "}
            пользователям
          </p>
        </div>
      )}
      {loading && (
        <div className={styles.timer}>
          <p>Примерное время ожидания: 20 мин</p>
          <p>По завершению Вам придет уведомление</p>
        </div>
      )}
    </Wrapper>
  );
};
