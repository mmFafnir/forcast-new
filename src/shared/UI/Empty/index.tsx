import { FC } from "react";
import styles from "../Empty/styles.module.scss";
import IconEmpty from "@/shared/icons/IconEmpty";

interface IProps {
  text?: string;
}
const Empty: FC<IProps> = ({ text = "Матчи не найдены" }) => {
  return (
    <div className="empty-data">
      <p>{text}</p>
      <IconEmpty />
    </div>
  );
};

export default Empty;
