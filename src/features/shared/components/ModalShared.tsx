"use client";

import { FC, memo, useEffect } from "react";
import styles from "../styles/shared.modal.module.scss";
import tg from "@/shared/images/socials/tg.svg";
import wh from "@/shared/images/socials/wh.svg";
import vk from "@/shared/images/socials/vk.svg";
import shared from "../images/iconSharedSend.svg";
import Image from "next/image";
import Button from "@/shared/UI/Button";

interface IProps {
  open: boolean;
  onClose: () => void;
}

const ModalSharedMemo: FC<IProps> = ({ open, onClose }) => {
  useEffect(() => {
    const outsideClose = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        !target.closest(`.${styles.body}`) &&
        !target.closest(`.shared-btn`)
      ) {
        onClose();
      }
    };
    document.addEventListener("click", outsideClose);
    return () => document.removeEventListener("click", outsideClose);
  }, []);

  return (
    <div className={`${styles.body} ${open ? styles.active : ""}`}>
      <div className={styles.wrapper}>
        <Button className={styles.btn}>
          <Image src={tg} alt="telegram" width={100} height={100} />
        </Button>
        <Button className={styles.btn}>
          <Image src={wh} alt="telegram" width={100} height={100} />
        </Button>
        <Button className={styles.btn}>
          <Image src={vk} alt="telegram" width={100} height={100} />
        </Button>
        <Button className={styles.btn}>
          <Image src={shared} alt="telegram" width={100} height={100} />
        </Button>
      </div>
    </div>
  );
};

export const ModalShared = memo(ModalSharedMemo);
