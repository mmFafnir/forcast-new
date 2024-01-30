"use client";

import { FC, useState } from "react";
import styles from "../../styles/modal.user.module.scss";
import Image from "next/image";

import defaultImage from "../../images/default.svg";
import { IconCron } from "../../icons/IconCron";
import Button from "@/shared/UI/Button";
import IconDiamond from "@/shared/icons/IconDiamond";
import IconSettings from "@/shared/icons/IconSettings";
import IconLogout from "@/shared/icons/IconLogout";
import { PremMatchBanner } from "@/entities/banners";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import { useTypeDispatch } from "@/shared/hooks/useTypeDispatch";
import { logout } from "../../slice/authSlice";

const UserRole = () => {
  return (
    <p className={styles.role}>
      <span style={{ color: "#D3AD4D" }}>Фанат</span>
      <IconCron />
    </p>
  );
};

interface IProps {
  open: boolean;
}

const UserModal: FC<IProps> = ({ open }) => {
  const { user } = useTypeSelector((state) => state.auth);
  const dispatch = useTypeDispatch();

  const onLogout = () => dispatch(logout());

  return (
    <div className={`${styles.body} user-modal ${open ? styles.open : ""}`}>
      <div className={styles.person}>
        <Image src={defaultImage} width={400} height={400} alt="sadsda" />
        <div>
          {user && <p>{user.nickname}</p>}
          {user && <p>{user.email}</p>}
        </div>
      </div>
      <div className={styles.status}>
        <p>Статус:</p>
        <UserRole />
      </div>
      <div className={styles.content}>
        <Button type="text">
          <IconDiamond />
          <span>Premium доступ</span>
          <span className={styles.premiumTime}>До 21.12.2024</span>
        </Button>
        <Button type="text">
          <IconSettings />
          <span>Настройки аккаунта</span>
        </Button>
        <Button type="text" onClick={onLogout}>
          <IconLogout />
          <span>Выйти</span>
        </Button>
      </div>
      <div className={styles.prem}>
        <PremMatchBanner
          text={
            <>
              со СКИДКОЙ <span>25%</span>
            </>
          }
        />
      </div>
    </div>
  );
};

export default UserModal;