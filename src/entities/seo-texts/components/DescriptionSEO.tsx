"use client";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import React, { FC } from "react";
import DOMPurify from "dompurify";
import { clearHtmlString } from "@/shared/helper/clearHtmlString";

interface IProps {
  text?: string;
}
export const DescriptionSEO: FC<IProps> = ({ text = "" }) => {
  const { webApp } = useTypeSelector((state) => state.auth);

  if (webApp) return <></>;
  return (
    <div
      className="page-text-block"
      dangerouslySetInnerHTML={{ __html: text }}
    ></div>
  );
};
