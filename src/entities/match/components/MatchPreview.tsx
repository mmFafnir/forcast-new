import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { IconLive } from "../icons/IconLive";
import styles from "../styles/preview.module.scss";
import SportsIcon from "@/shared/icons/sports";

interface ITeamProps {
  src: string;
  name: string;
  translate: string;
}
const Team: FC<ITeamProps> = ({ src, name, translate }) => {
  return (
    <div className={styles.team}>
      <div className={styles.teamImg}>
        <Image
          className="logo-icon"
          src={src}
          alt={name}
          width={400}
          height={400}
        />
      </div>
      <div>
        <p>{translate}</p>
        <p>{name}</p>
      </div>
    </div>
  );
};

interface IPropsBread {
  links: {
    title: string;
    href: string;
  }[];
}
const BreadCrumbs: FC<IPropsBread> = ({ links }) => {
  return (
    <div className={styles.breadcrumbs}>
      {links.map((link) => (
        <Link key={link.href} href={link.href}>
          {link.title}
        </Link>
      ))}
    </div>
  );
};

const links = [
  {
    href: "/",
    title: "Футбол",
  },
  {
    href: "/",
    title: "Европа: Europa Conference League - Групповой этап",
  },
];

export const MatchPreview = () => {
  return (
    <div className={styles.body}>
      <div className={styles.ball}>
        <SportsIcon icon="soccer" width={400} height={400} />
      </div>
      <div className={styles.teams}>
        <Team
          src={"/country-icon.svg"}
          name="Barcelona"
          translate="Барселона"
        />
        <Team
          src={"/country-icon.svg"}
          name="Barcelona"
          translate="Барселона"
        />
      </div>
      <p className={styles.line}></p>
      <div className={styles.desc}>
        <BreadCrumbs links={links} />
        <div className={styles.times}>
          <p>20 сентября 2023</p>
          <p>19:45</p>
        </div>
        <div className={styles.footer}>
          <button className={styles.live}>
            <IconLive className={styles.iconLive} />
            <span>Live</span>
          </button>
        </div>
      </div>
    </div>
  );
};