import React, { FC } from "react";
import { NotifyButton } from "./ui/NotifyButton";
import { UserButton } from "./ui/UserButton";
import styles from "../styles/header.user.module.scss";

export const UserHeader: FC = () => {
  return (
    <div className={styles.body}>
      <NotifyButton />
      <UserButton />
    </div>
  );
};
