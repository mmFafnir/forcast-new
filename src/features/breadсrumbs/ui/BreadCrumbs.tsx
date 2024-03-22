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
        <div
          className={"flex item-center h-full"}
          itemType="http://schema.org/BreadcrumbList"
          itemScope
        >
          <span
            className={styles.btn}
            itemScope
            itemType="http://schema.org/ListItem"
          >
            <Link href={"/"} style={{ marginRight: 5 }} itemProp="item">
              <span itemProp="name">Прогнозы на спорт</span>
              <meta itemProp="position" content="1"></meta>
            </Link>
          </span>
          {links.map((link, index) => (
            <span
              className={styles.link}
              key={index}
              itemScope
              itemType="http://schema.org/ListItem"
            >
              <Link href={link.href} itemProp="item">
                <span itemProp="name">{link.title}</span>
                <meta itemProp="position" content={`${index + 2}`}></meta>
              </Link>
            </span>
          ))}
        </div>
      </MyScrollbar>
    </div>
  );
};
