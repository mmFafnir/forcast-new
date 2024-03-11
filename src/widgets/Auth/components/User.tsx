" use client";

import Image from "next/image";
import defaultImg from "../images/default.svg";
import styles from "../styles/modal.settings.module.scss";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import Loader from "@/shared/UI/Loader";

import React from "react";
import { postAvatar } from "../api/avatar";
import { UserRole } from "./modals/UserModal";
import IconDiamond from "@/shared/icons/IconDiamond";
import { getTimezone } from "@/shared/helper/getTimezone";
import { convertUtcOffsetToDate } from "@/shared/helper/convertUtcOffsetToDate";
import dayJs from "@/shared/core/dayjs";
import { PremMatchBanner } from "@/entities/banners";
import Button from "@/shared/UI/Button";
import { useTypeDispatch } from "@/shared/hooks/useTypeDispatch";
import { setModal } from "@/shared/UI/Modal/modalSlice";
import { EnumModals } from "@/shared/UI/Modal/EnumModals";

export const User = () => {
  const { user } = useTypeSelector((state) => state.auth);
  const { utcId } = useTypeSelector((state) => state.timezone);
  const dispatch = useTypeDispatch();

  const refUpload = useRef<HTMLInputElement>(null);
  const [img, setImg] = useState<string>(defaultImg);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const [time, setTime] = useState<string | null>(null);

  const openModalPrem = () => dispatch(setModal(EnumModals.PREMIUM));
  const openModalHistory = () =>
    dispatch(setModal(EnumModals.SHOPPING_HISTORY));

  const setImages = (e: FormEvent<HTMLInputElement>) => {
    setLoading(true);
    const file = e.currentTarget.files && e.currentTarget.files[0];

    if (!file) return;
    const size = file.size / 1024 / 976.563;
    if (size > 4) return setError(true);

    setError(false);
    setImg(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("avatar", file);
    postAvatar(formData).finally(() => {
      setLoading(false);
    });
  };

  useEffect(() => {
    setLoading(false);
    if (!user) return;
    user.avatar && setImg(`https://admin.aibetguru.com/avatars/${user.avatar}`);
  }, [user]);

  useEffect(() => {
    if (!user?.tariff_end_date) return;
    const utc = getTimezone(String(utcId))?.utc || "UTC+3";
    const utcTime = convertUtcOffsetToDate(utc, user.tariff_end_date);
    setTime(dayJs(utcTime).format("DD.MM.YYYY"));
  }, [utcId, user]);

  return (
    <div className={styles.user}>
      <div className={styles.body}>
        <div className={styles.img}>
          {loading && (
            <div className="loader-hover">
              <Loader />
            </div>
          )}
          <Image
            className={styles.avatar}
            width={500}
            height={500}
            src={img}
            alt={user ? user.name : "avatar"}
          />
        </div>
        <div className={styles.image}>
          <p className={styles.title}>
            {user && (user.name || user.nickname || user.email)}
          </p>
          <div className={styles.role}>
            <p>Статус:</p>
            <UserRole prem={user?.premium === "1"} />
          </div>
          <div>
            <input
              type="file"
              id="avatar"
              name="avatar"
              accept="image/png, image/jpeg"
              ref={refUpload}
              onInput={setImages}
              disabled={loading}
            />
            <label className="link" htmlFor="avatar">
              Загрузить изображение
            </label>
            <p className={styles.imageOptions}>
              JPG, PNG, 64 х 64 px не более 4.00 MB
            </p>
          </div>
        </div>
        <button className={styles.history} onClick={openModalHistory}>
          История покупок
        </button>
      </div>

      <div className={styles.prem}>
        <IconDiamond color={true} />
        <span>Premium доступ</span>
        {time && <span className={styles.premiumTime}>до {time}</span>}
        <Button
          type="gray"
          className={styles.premButton}
          onClick={openModalPrem}
        >
          КУПИТЬ
        </Button>
      </div>

      {user?.premium !== "1" && (
        <PremMatchBanner
          bodyClass={styles.premBanner}
          prem={false}
          text={
            <>
              Купить со СКИДКОЙ <span>25%</span>
            </>
          }
        />
      )}
      <Button
        type="gray"
        className={styles.historyMob}
        onClick={openModalHistory}
      >
        История покупок
      </Button>
    </div>
  );
};
