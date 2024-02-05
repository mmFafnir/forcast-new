import dayjs from "dayjs";

export const getTimeStatusMatch = (time: string) => {
  const today = dayjs();
  const currentDay = dayjs(time);

  if (today < currentDay) {
    const totalMilliseconds = currentDay.diff(today);
    const totalSeconds = Math.floor(totalMilliseconds / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);

    if (totalHours > 24) return ``;
    return `${totalHours}:${totalMinutes}`;
  }
  if (today > currentDay) return "finish";
  return "live";
};
