"use client";
import { FC, useEffect, useState } from "react";
import { IFetchFullMatch } from "@/pagesComponent/types/IFetchMatch";
import { IconLive } from "../icons/IconLive";
import { FavoriteAdd } from "@/features/favorites";
import SportsIcon from "@/shared/icons/sports";
import styles from "../styles/preview.sticky.module.scss";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import CustomImage from "@/shared/UI/CustomImage";
import useTimeStatus from "@/shared/hooks/useTimeStatus";

interface IProps {
  match: IFetchFullMatch;
}

export const MatchPreviewSticky: FC<IProps> = ({ match }) => {
  const { activeSidebar } = useTypeSelector((state) => state.closeSidebar);

  const { time, status, hours } = useTimeStatus({
    matchTime: match.real_time_carbon,
  });

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
            <p title={match.home_team.team_name}>
              {match.home_team.translate[0]
                ? match.home_team.translate[0].translation
                : match.home_team.team_name}
            </p>
          </div>
          <CustomImage
            src={`https://admin.aibetguru.com/uploads/${match.home_team.team_id}.png`}
            alt={match.home_team.team_name}
            width={400}
            height={400}
          />
        </div>
        <div className={styles.status}>
          {match.time_status == 1 ? (
            <button className={styles.live}>
              <IconLive className={styles.iconLive} />
              <span>Live</span>
            </button>
          ) : match.time_status == 3 ? (
            <button className={styles.live}>
              <p style={{ color: "#E98080" }}>Завершен</p>
            </button>
          ) : status === "today" ? (
            <button className={styles.live}>{hours}</button>
          ) : (
            <div>
              <p>{time}</p>
              <p>{hours}</p>
            </div>
          )}
        </div>
        <div className={styles.team}>
          <CustomImage
            src={`https://admin.aibetguru.com/uploads/${match.away_team.team_id}.png`}
            alt={match.away_team.team_name}
            width={400}
            height={400}
          />
          <div>
            <p title={match.away_team.team_name}>
              {match.away_team.translate[0]
                ? match.away_team.translate[0].translation
                : match.away_team.team_name}
            </p>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.status}>
          {match.time_status == 1 ? (
            <button className={styles.live}>
              <IconLive className={styles.iconLive} />
              <span>Live</span>
            </button>
          ) : match.time_status == 3 ? (
            <button className={styles.live}>
              <p style={{ color: "#E98080" }}>Завершен</p>
            </button>
          ) : status === "today" ? (
            <button className={styles.live}>{hours}</button>
          ) : (
            <div>
              <p>{time}</p>
              <p>{hours}</p>
            </div>
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
