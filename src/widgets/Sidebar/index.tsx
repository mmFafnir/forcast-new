"use client";
import Button from "@/shared/UI/Button";
import SportsIcon from "@/shared/icons/sports";
import TotalMatches from "@/shared/UI/TotalMatches";
import { Search } from "@/features/search";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import { FavoritesButton } from "@/features/favorites";
import { usePathname } from "next/navigation";
import Image from "next/image";
import styles from "./styles.module.scss";
import { useTypeDispatch } from "@/shared/hooks/useTypeDispatch";
import { closeSidebar } from "@/features/closeSidebar/slice/closeSidebarSlice";

const Sidebar = () => {
  const dispatch = useTypeDispatch();
  const { activeSidebar } = useTypeSelector((state) => state.closeSidebar);
  const pathname = usePathname();

  const onCloseSidebar = () => dispatch(closeSidebar());

  return (
    <>
      <button
        className={`bg-hover  ${activeSidebar && "close"}`}
        onClick={onCloseSidebar}
      ></button>
      <div className={`${styles.body} ${activeSidebar ? styles.close : ""}`}>
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <div className={styles.search}>
              <Search />
            </div>
            <div className={styles.favorite}>
              <FavoritesButton />
            </div>
            <div className={styles.list}>
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
    </>
  );
};

export default Sidebar;
