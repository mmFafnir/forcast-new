"use client";
import { FC } from "react";
import { Input } from "../ui/Input";
import styles from "../styles/search.module.scss";
import Modal from "@/shared/UI/Modal";
import { EnumModals } from "@/shared/UI/Modal/EnumModals";
import { Select } from "../ui/Select";
import Empty from "@/shared/UI/Empty";

const sportsData = [
  {
    label: "Все виды спорта",
    value: "",
  },
  {
    label: "Футбол",
    value: "soccer",
  },
  {
    label: "Баскетбол",
    value: "basket",
  },
  {
    label: "Волейбол",
    value: "vol",
  },
];

const statusMatchData = [
  {
    value: 0,
    label: "Все",
  },
  {
    value: 1,
    label: "Предстоящие",
  },
  {
    value: 2,
    label: "Live",
  },
  {
    value: 3,
    label: "Завершенные",
  },
];

export const ModalSearch: FC = () => {
  return (
    <Modal
      title={"Поиск"}
      name={EnumModals.SEARCH}
      stylesWrapper={{ flex: "0 1 854px" }}
    >
      <div className={styles.body}>
        <div className={styles.header}>
          <Input />
        </div>
        <div>
          <div className="flex item-center">
            <Select data={sportsData} />
            <Select data={statusMatchData} />
          </div>
          <div className={styles.content}>
            <Empty />
          </div>
          {/* <Found /> */}
        </div>
      </div>
    </Modal>
  );
};
