"use clients";

import { FC } from "react";
import Button from "@/shared/UI/Button";
import Link from "next/link";
import MyScrollbar from "@/shared/UI/MyScrollbar";
import styles from "../styles/breadсrumbs.module.scss";

const links = [
  { title: "Футбол", href: "/soccer" },
  { title: "Испания", href: "/soccer/es" },
  { title: "Бундеслига", href: "/soccer/bunders" },
  { title: "Барселона - Барселона", href: "/soccer/match/12312" },
];

export const BreadCrumbs: FC = () => {
  return (
    <div className={styles.body}>
      <MyScrollbar style={{ height: "auto", width: "99%" }}>
        <div className={"flex item-center h-full"}>
          <button className={styles.btn} style={{ marginRight: 5 }}>
            <span>Прогнозы на спорт</span>
          </button>
          {links.map((link, index) => (
            <Link className={styles.link} key={index} href={link.href}>
              <span>{link.title}</span>
            </Link>
          ))}
        </div>
      </MyScrollbar>
    </div>
  );
};
