"use client";
import { FC, useEffect, useState } from "react";
import { Input } from "../ui/Input";
import styles from "../styles/search.module.scss";
import Modal from "@/shared/UI/Modal";
import { EnumModals } from "@/shared/UI/Modal/EnumModals";
import { Select } from "../ui/Select";
import { getMatches } from "../api/getMatches";
import { TypeSportGroup } from "@/shared/types/sport";
import { GroupHome } from "@/entities/group";
import MyScrollbar from "@/shared/UI/MyScrollbar";

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
    value: "",
    label: "Все",
  },
  {
    value: 0,
    label: "Предстоящие",
  },
  {
    value: 1,
    label: "Live",
  },
  {
    value: 3,
    label: "Завершенные",
  },
];

export const ModalSearch: FC = () => {
  const [data, setData] = useState<TypeSportGroup[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<string | number>("");
  const [search, setSearch] = useState<string>("");

  const fetchMatches = (value: string) => {
    setLoading(true);
    getMatches({
      search: value,
      time_status: status,
      sport_type: 1,
      order_by_cf: "desc",
    })
      .then((res) => {
        console.log(res);
        setData(res);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onSearch = (value: string) => {
    if (value === search) return;
    setSearch(value);
    fetchMatches(value);
  };

  useEffect(() => {
    if (search.trim().length === 0) return;
    console.log(status);
    fetchMatches(search);
  }, [status]);
  return (
    <Modal
      title={"Поиск"}
      name={EnumModals.SEARCH}
      stylesWrapper={{ flex: "0 1 854px" }}
      styleChildren={{ paddingBottom: "15px" }}
    >
      <div className={styles.body}>
        <div className={styles.header}>
          <Input onSearch={onSearch} />
        </div>
        <div className="flex item-center">
          <Select setValue={setStatus} data={statusMatchData} />
        </div>
        <div>
          <div className={styles.content}>
            <MyScrollbar>
              <GroupHome data={data} loading={loading} />
            </MyScrollbar>
          </div>
          {/* <Found /> */}
        </div>
      </div>
    </Modal>
  );
};
