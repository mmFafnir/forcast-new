"use client";

import { FC } from "react";
import Image from "next/image";
import { IconCron } from "../../icons/IconCron";
import Button from "@/shared/UI/Button";
import IconDiamond from "@/shared/icons/IconDiamond";
import IconSettings from "@/shared/icons/IconSettings";
import IconLogout from "@/shared/icons/IconLogout";
import { PremMatchBanner } from "@/entities/banners";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import { useTypeDispatch } from "@/shared/hooks/useTypeDispatch";
import { logout } from "../../slice/authSlice";
import { setClick, setModal } from "@/shared/UI/Modal/modalSlice";
import { EnumModals } from "@/shared/UI/Modal/EnumModals";
import styles from "../../styles/modal.user.module.scss";
import { googleLogout } from "@react-oauth/google";
import { signOut } from "next-auth/react";

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

  const onLogout = () => {
    dispatch(logout());
    signOut({ callbackUrl: "false" });
  };
  const onOpenModalPrem = () => {
    dispatch(setClick("prem"));
    dispatch(setModal(EnumModals.PREMIUM));
  };
  const onOpenModalSetting = () => dispatch(setModal(EnumModals.SETTINGS));

  return (
    <div className={`${styles.body} user-modal ${open ? styles.open : ""}`}>
      <div className={styles.person}>
        <Image
          src={`https://admin.aibetguru.com/avatars/${user?.avatar}`}
          width={400}
          height={400}
          alt="sadsda"
        />
        <div>
          {user?.nickname && <p>{user.nickname}</p>}
          {user && <p>{user.email}</p>}
        </div>
      </div>
      <div className={styles.status}>
        <p>Статус:</p>
        <UserRole />
      </div>
      <div className={styles.content}>
        <Button type="text" onClick={onOpenModalPrem}>
          <IconDiamond />
          <span>Premium доступ</span>
          <span className={styles.premiumTime}>До 21.12.2024</span>
        </Button>
        <Button type="text" onClick={onOpenModalSetting}>
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
