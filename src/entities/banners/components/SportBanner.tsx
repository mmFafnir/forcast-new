import { CSSProperties, FC } from "react";
import styles from "../styles/sport.banner.module.scss";
import Link from "next/link";

interface IProps {
  title: string;
  img?: string;
  href?: string;
  style?: CSSProperties;
  className?: string;
}
export const SportBanner: FC<IProps> = ({
  title,
  img,
  href,
  style = {},
  className = "",
}) => {
  if (href)
    return (
      <Link
        href={href}
        className={`${styles.body} ${className}`}
        style={{ backgroundImage: `url(${img})`, ...style }}
      >
        <p className={styles.title}>{title}</p>
      </Link>
    );
  return (
    <div className={`${styles.body} ${styles.soon}`}>
      <p className={styles.text}>{title}</p>
    </div>
  );
};
