"use client";
import { useEffect, useState } from "react";
import styles from "../../styles/table/table.history.module.scss";
import DataTable, { TableColumn } from "react-data-table-component";
import { TypeHistoryPrem } from "../../types/TypeHistoryPrem";
import dayjs from "dayjs";
import { fetchShoppingHistory } from "../../api/fetchShoppingHistory";
import MyScrollbar from "@/shared/UI/MyScrollbar";
import Loader from "@/shared/UI/Loader";
import Empty from "@/shared/UI/Empty";

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
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    fetchShoppingHistory()
      .then((res) => {
        setData(res);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.body}>
      {loading ? (
        <div
          className="loader-hover--no-bg"
          style={{ alignItems: "flex-start" }}
        >
          <Loader />
        </div>
      ) : (
        <MyScrollbar
          autoHide={false}
          className={`${styles.scroll} horizontal-same`}
        >
          {data.length === 0 && <Empty text="История покупок пуста" />}
          {data.length > 0 && (
            <DataTable
              className={`history-table ${styles.table}`}
              clearSelectedRows
              fixedHeader
              columns={columns}
              data={data}
            />
          )}
        </MyScrollbar>
      )}
    </div>
  );
};
