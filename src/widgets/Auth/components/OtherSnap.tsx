"use client";

import { FC, useEffect, useMemo, useState } from "react";
import styles from "../styles/other.module.scss";
import tg from "@/shared/images/socials/tg.svg";
import mail from "@/shared/images/socials/mail.svg";
import google from "@/shared/images/socials/google.svg";
import Image from "next/image";
import { IconCheck } from "../icons/IconCheck";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import { signIn } from "next-auth/react";
import NewWindow from "react-new-window";
import { isMobile } from "@/features/shared/scripts/isMobile";

interface IProps {
  setComponent: (value: string) => void;
  component: string;
}
export const OtherSnap: FC<IProps> = ({ component, setComponent }) => {
  const { user } = useTypeSelector((state) => state.auth);
  const [openWindow, setOpenWindow] = useState<boolean>(false);
  const buttons = useMemo(
    () => [
      {
        name: "mail",
        svg: mail,
        checked: user?.email ? true : false,
      },
      {
        name: "telegram",
        svg: tg,
        checked: user?.telegram_id ? true : false,
      },
      {
        name: "google",
        svg: google,
        onClick: () => {
          if (isMobile.any()) {
            signIn("google");
          } else {
            setOpenWindow(true);
          }
        },
      },
    ],
    [user]
  );

  useEffect(() => {
    setComponent(buttons.find((btn) => !btn.checked)?.name || "mail");
  }, [buttons]);

  return (
    <>
      <div className={styles.body}>
        {buttons.map((btn) => {
          return (
            <button
              disabled={btn.checked}
              className={`${styles.button} ${
                component === btn.name ? styles.active : ""
              }
              ${btn.checked ? styles.default : ""}`}
              onClick={(e) =>
                btn.onClick ? btn.onClick() : setComponent(btn.name)
              }
              key={btn.name}
            >
              {btn.checked ? <IconCheck /> : <></>}
              <Image src={btn.svg} width={26} height={23} alt={btn.name} />
            </button>
          );
        })}
        {openWindow && <NewWindow url="/sing-in" />}
      </div>
    </>
  );
};
