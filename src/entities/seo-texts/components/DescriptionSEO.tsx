"use client";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import React, { FC } from "react";
import styles from "../styles/seo.description.module.scss";
import TextMore from "@/shared/UI/TextMore";

interface IProps {
  text?: string;
}
export const DescriptionSEO: FC<IProps> = ({ text = "" }) => {
  const { webApp } = useTypeSelector((state) => state.auth);

  if (webApp || !text || text?.length === 0) return <></>;
  return (
    <TextMore
      title=""
      defaultHeight={282}
      stylesBody={{ marginTop: 40 }}
      stylesClose={{ opacity: 0.7 }}
    >
      <div
        className={`page-text-block ${styles.text}`}
        dangerouslySetInnerHTML={{ __html: text }}
      ></div>
    </TextMore>
  );
};
