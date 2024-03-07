"use client";

import { FC, useEffect, useState } from "react";
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
import { signOut } from "next-auth/react";
import dayJs from "@/shared/core/dayjs";
import { convertUtcOffsetToDate } from "@/shared/helper/convertUtcOffsetToDate";
import { getTimezone } from "@/shared/helper/getTimezone";

const UserRole = ({ prem }: { prem: boolean }) => {
  return (
    <p className={styles.role}>
      <span style={{ color: prem ? "#D3AD4D" : "inherit" }}>
        {prem ? "Фанат" : "Болельщик"}
      </span>
      {prem && <IconCron />}
    </p>
  );
};

interface IProps {
  open: boolean;
}

const UserModal: FC<IProps> = ({ open }) => {
  const { user } = useTypeSelector((state) => state.auth);
  const { utcId } = useTypeSelector((state) => state.timezone);
  const dispatch = useTypeDispatch();

  const [time, setTime] = useState<string | null>(null);

  const onLogout = () => {
    dispatch(logout());
    signOut({ callbackUrl: "/" });
  };
  const onOpenModalPrem = () => {
    dispatch(setClick("prem"));
    dispatch(setModal(EnumModals.PREMIUM));
  };
  const onOpenModalSetting = () => dispatch(setModal(EnumModals.SETTINGS));

  useEffect(() => {
    if (!user?.tariff_end_date) return;
    const utc = getTimezone(String(utcId))?.utc || "UTC+3";
    const utcTime = convertUtcOffsetToDate(utc, user.tariff_end_date);
    setTime(dayJs(utcTime).format("DD.MM.YYYY"));
  }, [utcId, user]);

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
        <UserRole prem={user?.premium === "1"} />
      </div>
      <div className={styles.content}>
        <Button type="text" onClick={onOpenModalPrem}>
          <IconDiamond />
          <span>Premium доступ</span>
          {time && <span className={styles.premiumTime}>{time}</span>}
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
      {user?.premium !== "1" && (
        <div className={styles.prem}>
          <PremMatchBanner
            text={
              <>
                со СКИДКОЙ <span>25%</span>
              </>
            }
          />
        </div>
      )}
    </div>
  );
};

export default UserModal;
