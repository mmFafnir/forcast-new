"use client";

import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import SportsIcon from "@/shared/icons/sports";
import { IFetchFullMatch } from "@/pagesComponent/types/IFetchMatch";
import { getTimeStatusMatch } from "../scripts/getTimeStatusMatch";
import { IconLive } from "../icons/IconLive";
import styles from "../styles/preview.module.scss";

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
          width={1000}
          height={1000}
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
      {links.map((link, index) => (
        <Link key={index} href={link.href}>
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

interface IProps {
  match: IFetchFullMatch;
}

export const MatchPreview: FC<IProps> = ({ match }) => {
  const time = getTimeStatusMatch(match.real_date);
  return (
    <div className={`${styles.body} review-match`}>
      <div className={styles.ball}>
        <SportsIcon icon="soccer" width={400} height={400} />
      </div>
      <div className={styles.teams}>
        <Team
          src={`https://admin.aibetguru.com/uploads/${match.home_team.team_id}.png`}
          name={match.home_team.team_name}
          translate={
            match.home_team.translate[0]
              ? match.home_team.translate[0].translation
              : ""
          }
        />
        <SportsIcon icon="soccer" width={400} height={400} />
        <Team
          src={`https://admin.aibetguru.com/uploads/${match.away_team.team_id}.png`}
          name={match.away_team.team_name}
          translate={
            match.away_team.translate[0]
              ? match.away_team.translate[0].translation
              : ""
          }
        />
      </div>
      <p className={styles.line}></p>
      <div className={styles.desc}>
        <BreadCrumbs
          links={[
            {
              title: "Футбол",
              href: "/soccer",
            },
            {
              title: `${
                match.league.country.translation || match.league.country.name
              }: ${match.league.league_name}`,
              href: `/soccer/${match.league.league_cc}/${match.league.url}`,
            },
          ]}
        />
        <div className={styles.times}>
          <p>{match.real_date}</p>
          <p>{match.real_time}</p>
        </div>
        <div className={styles.footer}>
          {time === "live" ? (
            <button className={styles.live}>
              <IconLive className={styles.iconLive} />
              <span>Live</span>
            </button>
          ) : time === "finish" ? (
            <button className={styles.live}>
              <p style={{ color: "#E98080" }}>Завершен</p>
            </button>
          ) : (
            <button className={styles.live}>{time}</button>
          )}
        </div>
      </div>
    </div>
  );
};
