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
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import Button from "@/shared/UI/Button";

const sportsData = [
  {
    label: "Футбол",
    value: "soccer",
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
  const { modal } = useTypeSelector((state) => state.modal);
  const [data, setData] = useState<TypeSportGroup[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<string | number>("");
  const [sport, setSport] = useState<string | number>("");
  const [search, setSearch] = useState<string>("");
  const [searchRef, setSearchRef] = useState<HTMLInputElement | null>(null);

  const fetchMatches = (value: string) => {
    setLoading(true);
    getMatches({
      search: value,
      time_status: status,
      sport_type: 1,
      order_by_cf: "desc",
    })
      .then((res) => {
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

  const onClickBtn = () => {
    console.log(searchRef);
    if (!searchRef) return;
    onSearch(searchRef.value);
  };

  useEffect(() => {
    if (search.trim().length === 0) return;
    fetchMatches(search);
  }, [status]);

  return (
    <Modal
      title={"Поиск"}
      name={EnumModals.SEARCH}
      styleBody={{ paddingTop: "4.5%" }}
      classBody={styles.modal}
      stylesWrapper={{ flex: "0 1 900px" }}
      styleChildren={{ paddingBottom: "15px" }}
    >
      <div className={styles.body}>
        <div className={styles.header}>
          <Input
            searchRef={setSearchRef}
            focus={modal === EnumModals.SEARCH}
            onSearch={onSearch}
          />
          <Button onClick={onClickBtn} className={styles.btn} type="gradient">
            Поиск
          </Button>
        </div>
        <div className="flex item-center">
          <Select setValue={setSport} data={sportsData} />
          <Select setValue={setStatus} data={statusMatchData} />
        </div>
        <div>
          <div className={styles.content}>
            <MyScrollbar>
              <GroupHome data={data} loading={loading} />
            </MyScrollbar>
          </div>
        </div>
      </div>
    </Modal>
  );
};
