import dayjs from "dayjs";

export const getTimeStatusMatch = (time: string) => {
  const today = dayjs();
  const currentDay = dayjs(time);

  if (today < currentDay) {
    const ms = currentDay.diff(today);
    return 1;
  }
  if (today > currentDay) return "finish";
  return "live";
};
