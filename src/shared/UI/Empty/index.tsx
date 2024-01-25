import { FC } from "react";
import styles from "../Empty/styles.module.scss";
import IconEmpty from "@/shared/icons/IconEmpty";

const Empty: FC = () => {
  return (
    <div className="empty-data">
      <p>Матчи не найдены</p>
      <IconEmpty />
    </div>
  );
};

export default Empty;
