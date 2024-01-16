"use client";

import React, { useEffect, useState } from "react";
import styles from "../styles/timezone.module.scss";
import { getTimezone } from "../api/getTimezone";
import { TypeTimezone } from "../types/TypeTimezone";
import Scrollbars from "react-custom-scrollbars-2";

export const TimezoneSelect = () => {
  const [open, setOpen] = useState<boolean>(false);

  const [data, setData] = useState<TypeTimezone[]>([]);
  const [currentData, setCurrentData] = useState<TypeTimezone | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const closeList = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(`.${styles.timezone}`)) setOpen(false);
    };

    setLoading(true);
    getTimezone()
      .then((res) => {
        setCurrentData(res[0]);
        setData(res);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });

    document.addEventListener("click", closeList);

    return () => document.removeEventListener("click", closeList);
  }, []);

  return (
    <div className={styles.timezone}>
      {currentData && (
        <button
          className={styles.title}
          onClick={() => setOpen((prev) => !prev)}
        >
          <svg width="17" height="18" viewBox="0 0 17 18" fill="none">
            <path
              d="M8.3042 0.695801C12.8906 0.695801 16.6084 4.41359 16.6084 9C16.6084 13.5864 12.8906 17.3042 8.3042 17.3042C3.71779 17.3042 0 13.5864 0 9C0 4.41359 3.71779 0.695801 8.3042 0.695801ZM8.3042 2.35664C6.54227 2.35664 4.85251 3.05656 3.60663 4.30244C2.36076 5.54831 1.66084 7.23807 1.66084 9C1.66084 10.7619 2.36076 12.4517 3.60663 13.6976C4.85251 14.9434 6.54227 15.6434 8.3042 15.6434C10.0661 15.6434 11.7559 14.9434 13.0018 13.6976C14.2476 12.4517 14.9476 10.7619 14.9476 9C14.9476 7.23807 14.2476 5.54831 13.0018 4.30244C11.7559 3.05656 10.0661 2.35664 8.3042 2.35664ZM8.3042 4.01748C8.5076 4.01751 8.70391 4.09218 8.85591 4.22734C9.0079 4.3625 9.10501 4.54874 9.12881 4.75074L9.13462 4.8479V8.65621L11.3826 10.9042C11.5315 11.0536 11.618 11.2541 11.6244 11.465C11.6308 11.6759 11.5568 11.8813 11.4172 12.0396C11.2777 12.1978 11.0832 12.297 10.8731 12.317C10.6631 12.337 10.4533 12.2763 10.2864 12.1473L10.2084 12.0784L7.71709 9.58711C7.58803 9.45793 7.50514 9.28982 7.48125 9.10878L7.47378 9V4.8479C7.47378 4.62766 7.56127 4.41644 7.717 4.2607C7.87274 4.10497 8.08396 4.01748 8.3042 4.01748Z"
              fill="white"
            />
          </svg>
          <p>{currentData.utc}</p>
        </button>
      )}
      <div className={`${styles.list} ${open ? styles.show : ""}`}>
        <Scrollbars universal={true}>
          {data.map((item) => (
            <button
              className={item.id == currentData?.id ? styles.active : ""}
              key={item.id}
              onClick={() => setCurrentData(item)}
            >{`${item.utc} (${item.zone})`}</button>
          ))}
        </Scrollbars>
      </div>
    </div>
  );
};
