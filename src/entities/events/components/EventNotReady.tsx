import React from "react";
import { Wrapper } from "../ui/Wrapper";

export const EventNotReady = () => {
  return (
    <Wrapper>
      <p>
        Анализ данного матча еще не готов. Добавьте его в избранное, чтобы
        получить уведомление о появлении ставок и анализа на него.
      </p>
    </Wrapper>
  );
};
