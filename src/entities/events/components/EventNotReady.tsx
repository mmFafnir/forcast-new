import React from "react";
import { Wrapper } from "../ui/Wrapper";

export const EventNotReady = ({ text }: { text?: string }) => {
  return (
    <Wrapper>
      <p>
        {text
          ? text
          : `
          Анализ данного матча еще в процессе подготовки: мы ожидаем прогнозы в самое ближайшее время. Добавьте матч в избранное, чтобы получить уведомление о появлении ставок и анализа, как только они будут готовы.
        `}
      </p>
    </Wrapper>
  );
};
