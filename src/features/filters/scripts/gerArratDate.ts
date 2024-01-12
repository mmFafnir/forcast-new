import dayjs from "dayjs";

const format = "YYYY-MM-DD";
export const getArrayDate = (): string[] => {
  const res: string[] = [];
  const today = dayjs();
  for (let i = 0; i < 4; i++) {
    const date = dayjs(today).subtract(4 - i, "day");
    res.push(date.format(format));
  }
  res.push(today.format(format));
  for (let i = 0; i < 4; i++) {
    const date = dayjs(today).add(i + 1, "day");
    res.push(date.format(format));
  }

  return res;
};
