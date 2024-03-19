import React, { FC } from "react";
import { UserButton } from "./ui/UserButton";
import styles from "../styles/header.user.module.scss";
import { NotifyButton } from "@/features/notification";

export const UserHeader: FC = () => {
  return (
    <div className={styles.body}>
      <NotifyButton />
      <UserButton />
    </div>
  );
};
