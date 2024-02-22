"use client";

import { FC, useEffect, useState } from "react";
import styles from "./pagination.module.scss";
import RCPagination from "rc-pagination";
import "./pagination.scss";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";

export type TypeLink = {
  active: boolean;
  label: string;
  url: string;
};

interface IProps {
  total: number;
  pageSize: number;
  setPage: (page: number) => void;
}

const Pagination: FC<IProps> = ({ total, pageSize, setPage }) => {
  const filters = useTypeSelector((state) => state.filters);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const onChange = (value: number) => {
    setPage(value);
    setCurrentPage(value);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);
  if (total <= pageSize) return <></>;
  return (
    <RCPagination
      className={styles.body}
      onChange={onChange}
      total={total}
      prevIcon={"<"}
      jumpNextIcon={"..."}
      jumpPrevIcon={"..."}
      nextIcon={">"}
      showTitle={false}
      current={currentPage}
      pageSize={pageSize}
      showSizeChanger={false}
    />
  );
};

export default Pagination;
