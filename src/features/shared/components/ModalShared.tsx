"use client";

import { FC, memo, useEffect, useState } from "react";
import styles from "../styles/shared.modal.module.scss";
import tg from "@/shared/images/socials/tg.svg";
import wh from "@/shared/images/socials/wh.svg";
import vk from "@/shared/images/socials/vk.svg";
import shared from "../images/iconSharedSend.svg";
import Image from "next/image";
import Button from "@/shared/UI/Button";
import { usePathname } from "next/navigation";

interface IProps {
  open: boolean;
  onClose: () => void;
}

const ModalSharedMemo: FC<IProps> = ({ open, onClose }) => {
  const pathname = usePathname();
  const [url, setUrl] = useState<string>(window.location.href);
  const [success, setSuccess] = useState<boolean>(false);

  const copyUrl = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 800);
      })
      .catch((err) => {
        console.log("Something went wrong", err);
      });
  };

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

  useEffect(() => {
    setUrl(window.location.href);
  }, [pathname]);

  return (
    <div className={`${styles.body} modal-shared ${open ? styles.active : ""}`}>
      <div className={styles.wrapper}>
        <Button
          className={styles.btn}
          target="_blank"
          href={`https://telegram.me/share/url?url=${url}`}
        >
          <Image src={tg} alt="telegram" width={100} height={100} />
        </Button>
        <Button
          className={styles.btn}
          target="_blank"
          href={`https://wa.me/whatsappphonenumber/?text=${url}`}
        >
          <Image src={wh} alt="wh" width={100} height={100} />
        </Button>
        <Button
          className={styles.btn}
          target="_blank"
          href={`http://vk.com/share.php?${url}`}
        >
          <Image src={vk} alt="vk" width={100} height={100} />
        </Button>
        <Button className={styles.btn} onClick={copyUrl}>
          <Image src={shared} alt="telegram" width={100} height={100} />
        </Button>
      </div>

      <div className={`${styles.copySuccess} ${success ? styles.show : ""}`}>
        <p>Ссылка успешно скопирована!</p>
      </div>
    </div>
  );
};

export const ModalShared = memo(ModalSharedMemo);
