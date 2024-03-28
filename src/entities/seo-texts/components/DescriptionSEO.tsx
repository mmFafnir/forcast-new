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
  console.log(text);
  if (webApp || !text || text?.length === 0) return <></>;
  return (
    <TextMore
      title=""
      defaultHeight={243}
      stylesBody={{ marginTop: 40 }}
      // stylesClose={{ opacity: 0.7 }}
      classBody={`page-text-block ${styles.body}`}
      classClose={styles.close}
      classContent={styles.content}
    >
      <div
        className={` ${styles.text}`}
        dangerouslySetInnerHTML={{ __html: text }}
      ></div>
    </TextMore>
  );
};
