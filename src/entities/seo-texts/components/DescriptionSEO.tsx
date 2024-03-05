"use client";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import React, { FC } from "react";
import styles from "../styles/seo.description.module.scss";

interface IProps {
  text?: string;
}
export const DescriptionSEO: FC<IProps> = ({ text = "" }) => {
  const { webApp } = useTypeSelector((state) => state.auth);

  if (webApp) return <></>;
  return (
    <div
      className={`page-text-block ${styles.text}`}
      dangerouslySetInnerHTML={{ __html: text }}
    ></div>
  );
};
