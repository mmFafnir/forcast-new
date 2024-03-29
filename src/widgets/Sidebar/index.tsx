"use client";

import Button from "@/shared/UI/Button";
import SportsIcon from "@/shared/icons/sports";
import TotalMatches from "@/shared/UI/TotalMatches";
import { Search } from "@/features/search";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import { FavoritesButton } from "@/features/favorites";
import { usePathname } from "next/navigation";
import { useTypeDispatch } from "@/shared/hooks/useTypeDispatch";
import { toggleSidebar } from "@/features/closeSidebar/slice/closeSidebarSlice";
import { TelegramButton } from "@/features/shared";
import Logo from "@/shared/UI/Logo";
import { memo, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { IResponseDate, getGlobalData } from "../api/getGlobalData";

const Sidebar = () => {
  const { webApp } = useTypeSelector((state) => state.auth);
  const { activeSidebar } = useTypeSelector((state) => state.closeSidebar);
  const dispatch = useTypeDispatch();
  const pathname = usePathname();

  const [loading, setLoading] = useState(true);
  const [global, setGlobal] = useState<IResponseDate | null>(null);

  const onCloseSidebar = () => dispatch(toggleSidebar());

  useEffect(() => {
    getGlobalData().then((res) => {
      setGlobal(res);
    });
  }, []);

  return (
    <>
      <button
        className={`bg-hover ${styles.hover} ${
          activeSidebar && `close ${styles.hoverShow}`
        }`}
        onClick={onCloseSidebar}
      ></button>
      <div className={`${styles.body} ${activeSidebar ? styles.close : ""}`}>
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <div
              className={`${styles.logo} ${activeSidebar ? styles.active : ""}`}
            >
              <div>
                <Logo style={{ flex: "0 0 160px" }} />
              </div>
            </div>
            <div className={styles.search}>
              <Search />
            </div>
            <FavoritesButton className={styles.favorite} />
            <div className={styles.list}>
              <Button
                className={styles.link}
                href="/"
                type="text"
                active={pathname === "/"}
              >
                <SportsIcon icon="top" />
                <span>Топ матчи</span>
                <TotalMatches className={styles.total}>
                  {global?.get_game_count_home_page || 0}
                </TotalMatches>
              </Button>
              {new Array(1).fill(null).map((link, index) => (
                <Button
                  key={index}
                  className={styles.link}
                  href="/soccer"
                  type="text"
                  active={pathname.includes("/soccer")}
                >
                  <SportsIcon icon="soccer" />
                  <span>Футбол</span>
                  <TotalMatches className={styles.total}>
                    {global?.games_count || 0}
                  </TotalMatches>
                </Button>
              ))}
            </div>
            {!webApp && <TelegramButton className={styles.telegram} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Sidebar);
