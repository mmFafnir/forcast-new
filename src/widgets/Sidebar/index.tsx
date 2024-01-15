"use client";
import { Search } from "@/features/search";
import styles from "./styles.module.scss";
import Button from "@/shared/UI/Button";
import SportsIcon from "@/shared/icons/sports";
import TotalMatches from "@/shared/UI/TotalMatches";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import Image from "next/image";
import { FavoritesButton } from "@/features/favorites";

const Sidebar = () => {
  const { active } = useTypeSelector((state) => state.closeSidebar);
  return (
    <div className={`${styles.body} ${active ? styles.close : ""}`}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.search}>
            <Search />
          </div>
          <div className={styles.favorite}>
            <FavoritesButton />
          </div>
          <div className={styles.list}>
            {new Array(6).fill(null).map((link, index) => (
              <Button
                key={index}
                className={styles.link}
                href="/soccer"
                type="text"
              >
                <SportsIcon icon="soccer" />
                <span>Волейбол</span>
                <TotalMatches>20</TotalMatches>
              </Button>
            ))}
          </div>
          <Button
            type="gray"
            target="_blank"
            className={styles.telegram}
            href="https://telegram.org/me/@groupname"
          >
            <Image
              src={"/telegram.svg"}
              width={20}
              height={16}
              alt="telegram logo"
            />
            <span>Наш Telegram</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
