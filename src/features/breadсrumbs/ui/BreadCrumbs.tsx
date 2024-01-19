import React from "react";
import styles from "../styles/breadсrumbs.module.scss";
import Button from "@/shared/UI/Button";
import Link from "next/link";

const links = [
  { title: "Футбол", href: "/soccer" },
  { title: "Испания", href: "/soccer/es" },
  { title: "Бундеслига", href: "/soccer/bunders" },
  { title: "Барселона - Барселона", href: "/soccer/match/12312" },
];

export const BreadCrumbs = () => {
  return (
    <div className={styles.body}>
      <div>
        <Button style={{ marginRight: 5 }}>Прогнозы на спорт</Button>
      </div>
      {links.map((link) => (
        <Link className={styles.link} key={link.href} href={link.href}>
          <span>{link.title}</span>
        </Link>
      ))}
    </div>
  );
};
