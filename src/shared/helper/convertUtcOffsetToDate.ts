import dayjs from "@/shared/core/dayjs";

export function convertUtcOffsetToDate(
  utcOffsetString: string,
  customUtcTime?: string,
  format?: string
) {
  // Извлекаем числовое значение смещения
  const offset = utcOffsetString.replace(/[^0-9.+\\-]/g, "");
  // Создаем объект Day.js с указанным временем в UTC
  const utcTime = customUtcTime
    ? // @ts-ignore
      dayjs.utc(customUtcTime, "YYYY-MM-DDTHH:mm:ssZ").utcOffset(-3)
    : // @ts-ignore
      dayjs.utc();

  // Применяем смещение к времени
  const adjustedTime = utcTime.add(offset, "hour");

  // Возвращаем дату в нужном формате (YYYY-MM-DD)
  return format ? dayjs(adjustedTime).format(format) : adjustedTime;
}
