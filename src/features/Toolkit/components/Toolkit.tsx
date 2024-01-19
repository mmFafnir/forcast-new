"use client";

import React, { FC, useEffect, useRef, useState } from "react";
import styles from "../styles/toolkit.module.scss";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";

export const Toolkit: FC = () => {
  const { text, coordinates } = useTypeSelector((state) => state.toolkit);
  const [show, setShow] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!coordinates) return setShow(false);
    setTimeout(() => {
      setShow(true);
    }, 500);
  }, [coordinates]);

  useEffect(() => {}, [text]);

  return (
    <div
      ref={ref}
      style={{
        left: coordinates?.x,
        top: (coordinates?.y || 0) - (ref.current?.clientHeight || 0),
      }}
      className={`${styles.body} ${show ? styles.show : ""}`}
    >
      <p>{text}</p>
    </div>
  );
};
