import { FC } from "react";
import styles from "../styles/sport.banner.module.scss";
import Link from "next/link";

interface IProps {
  title: string;
  img?: string;
  href?: string;
}
export const SportBanner: FC<IProps> = ({ title, img, href }) => {
  if (href)
    return (
      <Link
        href={href}
        className={styles.body}
        style={{ backgroundImage: `url(${img})` }}
      >
        <p className={styles.title}>{title}</p>
        <p className={styles.text}>Топ матчи</p>
      </Link>
    );
  return (
    <div className={`${styles.body} ${styles.soon}`}>
      <p className={styles.text}>{title}</p>
    </div>
  );
};
