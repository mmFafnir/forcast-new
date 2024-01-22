import dayjs from "dayjs";

export const getTimeStatusMatch = (time: string) => {
  const today = dayjs();
  const currentDay = dayjs(time);

  if (today < currentDay) return currentDay.diff(today);
  if (today > currentDay) return "finish";
  return "live";
};
