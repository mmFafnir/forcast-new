"use client";

import { convertUtcOffsetToDate } from "@/shared/helper/convertUtcOffsetToDate";
import { getTimezone } from "@/shared/helper/getTimezone";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import dayjs from "dayjs";
import React, { FC, useEffect, useState } from "react";
import "dayjs/locale/ru";
interface IProps {
  text: string;
  time: string;
}
export const TextDate: FC<IProps> = ({ text, time }) => {
  const { utcId } = useTypeSelector((state) => state.timezone);
  const [currentText, setCurrentText] = useState<string>(
    text.replace(
      /\d{4}-\d{2}-\d{2} \d{2}:\d{2}/,
      dayjs(time).locale("ru").format("DD MMMM YYYY")
    )
  );

  useEffect(() => {
    const utc = getTimezone(`${utcId}`)?.utc;
    const currentDate = convertUtcOffsetToDate(utc || "UTC+3", time);
    setCurrentText(
      text.replace(
        /\d{4}-\d{2}-\d{2} \d{2}:\d{2}/,
        dayjs(currentDate).locale("ru").format("DD MMMM YYYY")
      )
    );
  }, [utcId]);

  return <div>{currentText}</div>;
};
