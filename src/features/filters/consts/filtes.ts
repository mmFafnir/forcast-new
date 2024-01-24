import { TypeTimeStatus } from "..";

interface TypeFilter {
  label: string;
  value: TypeTimeStatus;
}
export const filters: TypeFilter[] = [
  {
    label: "ВСЕ",
    value: "",
  },
  {
    label: "ПРЕДСТОЯЩИЕ",
    value: 0,
  },
  {
    label: "LIVE",
    value: 1,
  },
  {
    label: "ЗАВЕРШЕННЫЕ",
    value: 3,
  },
];
