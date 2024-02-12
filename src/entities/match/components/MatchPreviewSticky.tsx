"use client";
import { FC, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { IFetchFullMatch } from "@/pagesComponent/types/IFetchMatch";
import { IconLive } from "../icons/IconLive";
import { getTimeStatusMatch } from "..";
import { FavoriteAdd } from "@/features/favorites";
import SportsIcon from "@/shared/icons/sports";
import styles from "../styles/preview.sticky.module.scss";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";

interface IProps {
  match: IFetchFullMatch;
}

export const MatchPreviewSticky: FC<IProps> = ({ match }) => {
  const { activeSidebar } = useTypeSelector((state) => state.closeSidebar);
  const time = getTimeStatusMatch(match.real_date);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [pos, setPos] = useState<{ width: string; left: string }>({
    width: "auto",
    left: "0px",
  });

  useEffect(() => {
    const reviewMatch = document.querySelector(
      ".review-match"
    ) as HTMLDivElement;
    if (!reviewMatch) return;
    const onResize = () => {
      setPos({
        width: `${reviewMatch.clientWidth}px`,
        left: `${reviewMatch.offsetLeft}px`,
      });
    };
    const onScroll = () => {
      const bottom = reviewMatch.getBoundingClientRect().bottom;
      if (bottom < 40) return setIsShow(true);
      setIsShow(false);
    };

    onResize();
    document.body.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);

    return () => document.body.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const reviewMatch = document.querySelector(
      ".review-match"
    ) as HTMLDivElement;
    if (!reviewMatch) return;
    setTimeout(() => {
      setPos({
        width: `${reviewMatch.clientWidth}px`,
        left: `${reviewMatch.offsetLeft}px`,
      });
    }, 500);
  }, [activeSidebar]);
  return (
    <div
      className={`${styles.body} ${isShow ? styles.show : ""}`}
      style={{ ...pos }}
    >
      <div className={styles.icon}>
        <SportsIcon icon="soccer" width={400} height={400} />
      </div>
      <div className={styles.center}>
        <div className={styles.team}>
          <div>
            <p title={match.home_team.team_name}>{match.home_team.team_name}</p>
          </div>
          <Image
            src={`https://admin.aibetguru.com/uploads/${match.home_team.team_id}.png`}
            alt={match.home_team.team_name}
            width={400}
            height={400}
          />
        </div>
        <div className={styles.status}>
          {time === "live" ? (
            <button className={styles.live}>
              <IconLive className={styles.iconLive} />
              <span>Live</span>
            </button>
          ) : time === "finish" ? (
            <button className={styles.live}>
              <p style={{ color: "#E98080" }}>Завершен</p>
            </button>
          ) : time.trim().length === 0 ? (
            <div className={styles.live}>
              <p>{match.real_date}</p>
              <p>{match.real_time.slice(0, -3)}</p>
            </div>
          ) : (
            <button className={styles.live}>{time}</button>
          )}
        </div>
        <div className={styles.team}>
          <Image
            src={`https://admin.aibetguru.com/uploads/${match.away_team.team_id}.png`}
            alt={match.away_team.team_name}
            width={400}
            height={400}
          />
          <div>
            <p title={match.away_team.team_name}>{match.away_team.team_name}</p>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.status}>
          {time === "live" ? (
            <button className={styles.live}>
              <IconLive className={styles.iconLive} />
              <span>Live</span>
            </button>
          ) : time === "finish" ? (
            <button className={styles.live}>
              <p style={{ color: "#E98080" }}>Завершен</p>
            </button>
          ) : time.trim().length === 0 ? (
            <div className={styles.live}>
              <p>{match.real_date}</p>
              <p>{match.real_time.slice(0, -3)}</p>
            </div>
          ) : (
            <p className={styles.live}>{time}</p>
          )}
        </div>
        <div className={styles.favorite}>
          <FavoriteAdd
            ids={[match.id]}
            active={match.favorite_auth_user_count === 1}
          />
        </div>
      </div>
    </div>
  );
};
