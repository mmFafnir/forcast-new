"use client";
import { FC, MouseEvent, useEffect, useMemo } from "react";
import styles from "../styles/other.module.scss";
import tg from "@/shared/images/socials/tg.svg";
import apple from "@/shared/images/socials/apple.svg";
import vk from "@/shared/images/socials/vk.svg";
import y from "@/shared/images/socials/y.svg";
import mail from "@/shared/images/socials/mail.svg";
import google from "@/shared/images/socials/google.svg";
import Image from "next/image";
import { IconCheck } from "../icons/IconCheck";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import { signIn, useSession } from "next-auth/react";

interface IProps {
  setComponent: (value: string) => void;
  component: string;
}
export const OtherSnap: FC<IProps> = ({ component, setComponent }) => {
  const { user } = useTypeSelector((state) => state.auth);
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
        onClick: (e: MouseEvent) => {
          e.preventDefault();
          signIn("google", { callbackUrl: "true" }).then((res) => {
            const authWindow = window.open(
              "",
              "GoogleAuthWindow",
              "width=800,height=600"
            );
            if (res?.error) {
              authWindow && authWindow.close();
            } else {
              if (authWindow) authWindow.location = res?.url || "";
            }

            console.log(res);
          });
        },
      },
      // {
      //   name: "apple",
      //   svg: apple,
      // },
      // {
      //   name: "vkontakte",
      //   svg: vk,
      // },
      // {
      //   name: "yahoo",
      //   svg: y,
      // },
    ],
    [user]
  );

  const { data } = useSession();

  useEffect(() => {
    setComponent(buttons.find((btn) => !btn.checked)?.name || "mail");
  }, [buttons]);

  useEffect(() => {
    console.log("data sesston", data);
  }, []);

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
                btn.onClick ? btn.onClick(e) : setComponent(btn.name)
              }
              key={btn.name}
            >
              {btn.checked ? <IconCheck /> : <></>}
              <Image src={btn.svg} width={26} height={23} alt={btn.name} />
            </button>
          );
        })}
      </div>
    </>
  );
};
