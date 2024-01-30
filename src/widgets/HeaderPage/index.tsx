import { Filters } from "@/features/filters";
import { FC } from "react";
import styles from "./styles.module.scss";
interface IProps {
  title: string;
}

const HeaderPage: FC<IProps> = ({ title }) => {
  return (
    <>
      {/* <div className={styles.body}> */}
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.filter}>
        <Filters />
      </div>
      {/* </div> */}
    </>
  );
};

export default HeaderPage;
