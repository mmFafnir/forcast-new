"use client";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import React from "react";

export const DescriptionSEO = () => {
  const { webApp } = useTypeSelector((state) => state.auth);
  console.log(webApp);
  alert(
    typeof window !== "undefined" &&
      (window as any).Telegram?.WebApp.initDataUnsafe.user
      ? true
      : false
  );
  if (webApp) return <></>;
  return (
    <div className="page-text-block">
      <h3>Прогнозы ставок на футбольные матчи от ИИ</h3>
      <p>
        Мы предлагаем бесплатные прогнозы на футбол, основанные на тщательном
        анализе искусственным интеллектом прошлых игр, формы игроков и других
        важных факторов. Наш сайт предлагает онлайн прогнозы на футбол для всех
        популярных лиг и турниров. Лучшие прогнозы на футбол от искусственного
        интеллекта, который является профессионалом помогут вам сделать
        правильный выбор и выиграть. Не упустите шанс сделать успешную ставку на
        футбол с нашими бесплатными и точными прогнозами на футбол сегодня! Сайт
        точных бесплатных прогнозов на футбол. Ai SportsOracle не организует
        игры на деньги. Контент носит исключительно информационный характер.
      </p>
    </div>
  );
};
