import Button from "@/shared/UI/Button";
import { FC } from "react";

import styles from "../styles/button.module.scss";

export const Search: FC = () => {
  return (
    <Button className={styles.body} type="gray">
      <svg width="20" height="21" viewBox="0 0 20 21" fill="none">
        <path
          d="M15.003 14.2656L14.4524 14.9524L13.7656 15.503C12.3748 16.6179 10.6448 17.2243 8.86231 17.2218H8.86088C4.52196 17.2218 1 13.6998 1 9.36088C1 5.02196 4.52196 1.5 8.86088 1.5C13.1998 1.5 16.7218 5.02196 16.7218 9.36088L16.7218 9.36231C16.7243 11.1448 16.1179 12.8748 15.003 14.2656Z"
          stroke="white"
          strokeWidth="2"
        />
      </svg>
      <span>Поиск по сайту</span>
    </Button>
  );
};
