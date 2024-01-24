import { FC } from "react";
import Link from "next/link";
import styles from "./styles.module.scss";

const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <div className="flex item-center">
        <Link href={"/faq"}>Пользовательское соглашение</Link>
        <Link href={"/privacy-policy"}>Политика конфиданциальности</Link>
      </div>
      <p>Copyright ©2023 Домен®. All Rights Reserved</p>
    </footer>
  );
};

export default Footer;
