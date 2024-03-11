"use client";
import { useEffect, useState } from "react";
import styles from "../../styles/table/table.history.module.scss";
import DataTable, { TableColumn } from "react-data-table-component";
import { TypeHistoryPrem } from "../../types/TypeHistoryPrem";
import dayjs from "dayjs";
import { fetchShoppingHistory } from "../../api/fetchShoppingHistory";
import MyScrollbar from "@/shared/UI/MyScrollbar";

const columns: TableColumn<TypeHistoryPrem>[] = [
  {
    name: "Дата",
    cell: (row) => (
      <p className={styles.date}>
        <span>{dayjs(row.start_date).format("DD MMM. YYYY")}</span>
        <span>Время: {dayjs(row.start_date).format("HH:mm")}</span>
      </p>
    ),
  },
  {
    name: "Тип",
    selector: (row) => row.rate_detail_name,
  },
  {
    name: "Срок до",
    cell: (row) => (
      <p className={styles.date}>
        <span>{dayjs(row.end_date).format("DD MMM. YYYY")}</span>
        <span>Время: {dayjs(row.end_date).format("HH:mm")}</span>
      </p>
    ),
  },
  {
    name: "Метод оплаты",
    selector: (row) => row.payment_method_name || "",
  },
  {
    name: "Сумма",
    cell: (row) => (
      <p>
        {row.sum} {row.currency}
      </p>
    ),
  },
];

export const HistoryTable = () => {
  const [data, setData] = useState<TypeHistoryPrem[]>([]);

  useEffect(() => {
    fetchShoppingHistory().then((res) => {
      setData(res);
    });
  }, []);

  return (
    <div className={styles.body}>
      <MyScrollbar
        autoHide={false}
        className={`${styles.scroll} horizontal-same`}
      >
        <DataTable
          className={`history-table ${styles.table}`}
          clearSelectedRows
          fixedHeader
          columns={columns}
          data={data}
        />
      </MyScrollbar>
    </div>
  );
};
