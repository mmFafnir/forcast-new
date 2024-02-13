"use client";
import Modal from "@/shared/UI/Modal";
import { EnumModals } from "@/shared/UI/Modal/EnumModals";
import styles from "../../styles/modal.premium.why.module.scss";
import { IconBack } from "../../icons/IconBack";
import Image, { StaticImageData } from "next/image";

import { FC, ReactNode } from "react";
import { premiumWhyItems } from "../../const/premiumWhyItems";
import Button from "@/shared/UI/Button";
import { useTypeDispatch } from "@/shared/hooks/useTypeDispatch";
import { setModal } from "@/shared/UI/Modal/modalSlice";

interface IProps {
  index: ReactNode;
  text: string[];
  title: string;
  image: StaticImageData;
}
const Item: FC<IProps> = ({ index, text, title, image }) => {
  return (
    <div className={styles.item}>
      <span className={styles.index}>{index}</span>
      <div className={styles.img}>
        <Image src={image} width={400} height={400} alt={title} />
      </div>
      <div className={styles.right}>
        <h3>{title}</h3>
        <div className={styles.text}>
          {text.map((p, index) => (
            <p key={index}>{p}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export const ModalPremiumWhy = () => {
  const dispatch = useTypeDispatch();

  const onBack = () => dispatch(setModal(EnumModals.PREMIUM));
  return (
    <Modal
      name={EnumModals.PREMIUM_WHY}
      stylesWrapper={{ flex: "0 1 100%", height: "100%" }}
      classContent={styles.content}
      styleContent={{
        flex: "0 1 1081px",
        margin: "0 auto",
      }}
      styleBody={{ padding: 0 }}
      titleAlight="center"
      iconClose={<IconBack />}
      onCloseCallback={onBack}
      title={
        <h2 className={styles.title}>
          Зачем мне <span>PREMIUM?</span>
        </h2>
      }
    >
      <div className={styles.body}>
        <div className={styles.wrapper}>
          {premiumWhyItems.map((item, index) => (
            <Item key={index} {...item} />
          ))}
        </div>
        <Button onClick={onBack} className={styles.btn} type="gradient">
          <IconBack />
          <span>Вернуться к оформлению</span>
          <span className={styles.btnMobSpan}>
            Купить <i>PREMIUM</i>
          </span>
        </Button>
      </div>
    </Modal>
  );
};
