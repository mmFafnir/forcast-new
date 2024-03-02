import React from "react";
import styles from "./styles/empry.main.module.scss";
import { SportBanner } from "@/entities/banners";
import soccerImg from "@/shared/images/sport-banner/soccer.png";
import MyScrollbar from "@/shared/UI/MyScrollbar";

export const EmptyMain = () => {
  return (
    <div className={styles.body}>
      <p className={styles.text}>
        <a href="https://www.google.ru/?hl=ru">Google </a>
        Топ матчи на сегодня еще не выявлены. Переходи на нужный вид спорта
        чтобы увидеть все матчи на сегодня.
      </p>
      <div className={styles.banners}>
        <p>Спорт</p>
        <MyScrollbar className={styles.scroll}>
          <div className={styles.list}>
            <SportBanner title="Футбол" img={soccerImg.src} href="/soccer" />

            {/* <SportBanner title="Скоро появится..." /> */}
          </div>
        </MyScrollbar>
      </div>
    </div>
  );
};
