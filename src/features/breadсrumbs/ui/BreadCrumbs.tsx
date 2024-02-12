"use clients";

import { FC } from "react";
import Link from "next/link";
import MyScrollbar from "@/shared/UI/MyScrollbar";
import styles from "../styles/breadсrumbs.module.scss";
import { usePathname } from "next/navigation";
import { IBreadCrumb } from "../type";

interface IProps {
  links: IBreadCrumb[];
}

export const BreadCrumbs: FC<IProps> = ({ links = [] }) => {
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path);

  console.log(pathNames);
  return (
    <div className={styles.body}>
      <MyScrollbar autoHide={true} style={{ height: "auto", width: "99%" }}>
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
