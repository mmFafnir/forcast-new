import React, { FC } from "react";
import styles from "./styles.module.scss";
import Logo from "@/shared/UI/Logo";
import Button from "@/shared/UI/Button";
import img from "./404.svg";
import Image from "next/image";
import { IFetchSeo } from "@/pagesComponent/types/IFetchSeo";

interface IProps {
  seo: IFetchSeo | null;
}
const PageError: FC<IProps> = ({ seo }) => {
  return (
    <div className={styles.page}>
      <div className={styles.body}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={styles.title}>
          <Image src={img} width={500} alt="404 icon" />
        </div>
        <p className={styles.text}>{seo?.ceo_h || "Страница не найдена"}</p>
        <Button type="gradient" className={styles.link} href="/">
          НА ГЛАВНУЮ
        </Button>
      </div>
    </div>
  );
};

export default PageError;
