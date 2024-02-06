import { TypeStatistic } from "../types";

export const sumValueStatistic = (statistic: TypeStatistic): number => {
  let sum = 0;
  for (let salary of Object.values(statistic)) {
    sum += salary;
  }
  return sum; // 650
};
