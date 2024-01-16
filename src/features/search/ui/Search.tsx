import Button from "@/shared/UI/Button";
import { FC } from "react";

import styles from "../styles/button.module.scss";
import { IconSearch } from "..";

export const Search: FC = () => {
  return (
    <Button className={styles.body} type="gray">
      <IconSearch />
      <span>Поиск по сайту</span>
    </Button>
  );
};
