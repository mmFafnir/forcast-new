"use client";

import Modal from "@/shared/UI/Modal";
import Image from "next/image";
import { EnumModals } from "@/shared/UI/Modal/EnumModals";
import defaultImg from "../../images/default.svg";
import styles from "../../styles/modal.settings.module.scss";
import { OtherRegister } from "../OtherRegister";
import Auth from "../Auth";
import Button from "@/shared/UI/Button";
import { useTypeDispatch } from "@/shared/hooks/useTypeDispatch";
import { logout } from "../../slice/authSlice";
import { FormEvent, use, useEffect, useRef, useState } from "react";
import { postAvatar } from "../../api/avatar";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import Loader from "@/shared/UI/Loader";

export const SettingsAuthModal = () => {
  const { user } = useTypeSelector((state) => state.auth);

  const dispatch = useTypeDispatch();
  const refUpload = useRef<HTMLInputElement>(null);
  const [img, setImg] = useState<string>(defaultImg);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const onLogout = () => dispatch(logout());

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
    setImg(`https://admin.aibetguru.com/avatars/${user.avatar}`);
  }, [user]);

  if (!user) return;
  return (
    <Modal
      name={EnumModals.SETTINGS}
      title="Настройки аккаунта"
      stylesWrapper={{ flex: "0 1 100%", height: "100%" }}
      styleContent={{ flex: "0 1 500px", margin: "0 auto", paddingTop: "10%" }}
      styleBody={{ padding: 0 }}
    >
      <p className={styles.title}>{user.name || user.nickname || user.email}</p>
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
            alt={user.name}
          />
        </div>
        <div className={styles.image}>
          <p style={{ color: error ? "red" : "inherit" }}>
            JPG, PNG, 64 х 64 px не более 4.00 MB
          </p>
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
        </div>
      </div>
      <OtherRegister />
      <Auth />
      <Button onClick={onLogout} className={styles.logout} type="text">
        Выйти
      </Button>
    </Modal>
  );
};
