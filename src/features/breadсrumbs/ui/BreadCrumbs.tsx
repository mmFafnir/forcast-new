"use clients";

import { FC } from "react";
import Link from "next/link";
import MyScrollbar from "@/shared/UI/MyScrollbar";
import styles from "../styles/breadсrumbs.module.scss";
import { IBreadCrumb } from "../type";

interface IProps {
  links: IBreadCrumb[];
}

export const BreadCrumbs: FC<IProps> = ({ links = [] }) => {
  return (
    <div className={styles.body}>
      <MyScrollbar autoHide={true} style={{ height: "auto", width: "99%" }}>
        <div className={"flex item-center h-full"}>
          <Link href={"/"} className={styles.btn} style={{ marginRight: 5 }}>
            <span>Прогнозы на спорт</span>
          </Link>
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
