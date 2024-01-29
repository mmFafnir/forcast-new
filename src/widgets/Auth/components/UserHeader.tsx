import React, { FC } from "react";
import { IconPerson } from "../icons/IconPerson";
import styles from "../styles/header.user.module.scss";
import { NotifyButton } from "./ui/NotifyButton";
import Button from "@/shared/UI/Button";
import { UserButton } from "./ui/UserButton";

export const UserHeader: FC = () => {
  return (
    <div className={styles.body}>
      <NotifyButton />
      <UserButton />
    </div>
  );
};
