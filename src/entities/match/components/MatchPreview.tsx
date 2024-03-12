"use client";

import { FC } from "react";
import Link from "next/link";
import SportsIcon from "@/shared/icons/sports";
import { IFetchFullMatch } from "@/pagesComponent/types/IFetchMatch";
import styles from "../styles/preview.module.scss";
import CustomImage from "@/shared/UI/CustomImage";
import dayjs from "dayjs";
import backgroundMatchImage from "../images/previewImage.png";
import backgroundMatchImageMobile from "../images/previewImageMobile.png";

import useTimeUtc from "@/shared/hooks/useTimeUtc";

interface ITeamProps {
  src: string;
  name: string;
  translate: string;
}

const Team: FC<ITeamProps> = ({ src, name, translate }) => {
  return (
    <div className={styles.team}>
      <div className={styles.teamImg}>
        <CustomImage
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

interface IProps {
  match: IFetchFullMatch;
}

export const MatchPreview: FC<IProps> = ({ match }) => {
  const { date, hours } = useTimeUtc(match.real_time_carbon);

  return (
    <div
      className={`${styles.body} review-match`}
      style={{ backgroundImage: `url(${backgroundMatchImage.src})` }}
    >
      <div className={styles.mobilePreview}>
        <img src={backgroundMatchImageMobile.src} alt="bg mobile preview" />
      </div>
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
              }: ${
                match?.league?.translate && match?.league.translate.length > 0
                  ? match?.league.translate[0].translation
                  : match?.league?.league_name
              }`,
              href: `/soccer/${match.league.url}`,
            },
          ]}
        />
        <div className={styles.times}>
          <p>{dayjs(date).locale("ru").format("DD MMMM YYYY")}</p>
          <p>{hours}</p>
        </div>
        <div className={styles.footer}>
          {date === "today" ? (
            dayjs(match.real_date) === dayjs() && (
              <></>
              // <button className={styles.live}>До начала осталось {time}</button>
            )
          ) : match.time_status == 1 ? (
            <button className={styles.live}>
              <p style={{ color: "#E98080" }}>Завершен</p>
            </button>
          ) : (
            <></>
            // <button className={styles.live}>
            //   <IconLive className={styles.iconLive} />
            //   <span>Live</span>
            // </button>
          )}
        </div>
      </div>
    </div>
  );
};
