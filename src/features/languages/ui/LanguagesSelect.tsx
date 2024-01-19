"use client";

import React, { useEffect, useState } from "react";
import styles from "../styles/select.module.scss";
import svg from "../assets/translate.svg";
import Image from "next/image";
import { getLanguages } from "../api/getLanguages";
import { TypeLanguage } from "../types/TypeLanguage";

export const LanguagesSelect = () => {
  const [open, setOpen] = useState<boolean>(false);

  const [data, setData] = useState<TypeLanguage[]>([]);
  const [currentData, setCurrentData] = useState<TypeLanguage | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const closeList = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(`.${styles.body}`)) setOpen(false);
    };

    setLoading(true);
    getLanguages()
      .then((res) => {
        setCurrentData(res[0]);
        setData(res);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });

    document.addEventListener("click", closeList);

    return () => document.removeEventListener("click", closeList);
  }, []);

  return (
    <div className={styles.body}>
      <button className={styles.title} onClick={() => setOpen((prev) => !prev)}>
        {currentData && (
          <>
            <Image src={svg} width={18} alt="translate icon" />
            <p>{currentData.url}</p>
          </>
        )}
      </button>
      <div className={`${styles.list} ${open ? styles.show : ""}`}>
        <div>
          {data.map((item) => (
            <button
              className={item.id == currentData?.id ? styles.active : ""}
              title={item.name}
              onClick={() => {
                setCurrentData(item);
              }}
              key={item.id}
            >
              {item.url}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
