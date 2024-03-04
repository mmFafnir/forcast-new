"use client";
import { FC } from "react";
import Link from "next/link";
import styles from "./styles.module.scss";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";

const Footer: FC = () => {
  const { webApp } = useTypeSelector((state) => state.auth);
  return (
    <footer className={styles.footer}>
      <div className="flex item-center">
        <Link href={"/privacy-policy"}>Политика конфиданциальности</Link>
        <Link href={"/term-of-use"}>Условия пользования</Link>

        <Link href={"/archive"}>Архив матчей</Link>
        <Link href={"/faq"}>FAQ</Link>
      </div>
      {!webApp && <p>Copyright ©2023 Домен®. All Rights Reserved</p>}
    </footer>
  );
};

export default Footer;
