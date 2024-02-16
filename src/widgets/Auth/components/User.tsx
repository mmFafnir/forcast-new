" use client";

import Image from "next/image";
import defaultImg from "../images/default.svg";
import styles from "../styles/modal.settings.module.scss";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import Loader from "@/shared/UI/Loader";

import React from "react";
import { postAvatar } from "../api/avatar";

export const User = () => {
  const { user } = useTypeSelector((state) => state.auth);

  const refUpload = useRef<HTMLInputElement>(null);
  const [img, setImg] = useState<string>(defaultImg);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

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

  return (
    <>
      <p className={styles.title}>
        {user && (user.name || user.nickname || user.email)}
      </p>
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
    </>
  );
};
