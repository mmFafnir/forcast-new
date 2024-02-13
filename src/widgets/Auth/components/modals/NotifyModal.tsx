"use client";

import Button from "@/shared/UI/Button";
import IconX from "@/shared/icons/IconX";
import MyScrollbar from "@/shared/UI/MyScrollbar";
import { FC, ReactNode, useEffect, useState } from "react";
import { TypeIconNotify, getIconNotify } from "../../helpper/getIconNotify";
import { IconTrash } from "../../icons/IconTrash";
import { useTypeDispatch } from "@/shared/hooks/useTypeDispatch";
import {
  changeStatusNotification,
  deleteAllNotification,
  deleteNotification,
  getNotification,
} from "../../slice/asyncActions";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import styles from "../../styles/modal.notify.module.scss";
import Link from "next/link";
import IconLoader from "@/shared/icons/IconLoader";
import Empty from "@/shared/UI/Empty";
import Loader from "@/shared/UI/Loader";

interface IPropsItem {
  title?: string;
  text?: string | ReactNode;
  icon: TypeIconNotify;
  onlyText?: string | ReactNode;
  id: number;
  url?: string | null;
}

const Item: FC<IPropsItem> = ({ id, title, url, text, icon, onlyText }) => {
  const dispatch = useTypeDispatch();

  const [loading, setLoading] = useState<boolean>(false);

  const onChangeStatus = () => dispatch(changeStatusNotification(id));
  const onDelete = () => {
    setLoading(true);
    dispatch(deleteNotification(id)).finally(() => {
      setLoading(false);
    });
  };

  return (
    <div className={styles.item}>
      {getIconNotify(icon)}
      <div>
        {title && <p className={styles.itemTitle}>{title}</p>}
        {text && url ? (
          <Link onClick={onChangeStatus} href={url} className={styles.itemText}>
            {text}
          </Link>
        ) : (
          <p className={styles.itemText}>{text}</p>
        )}

        {onlyText && <p className={styles.onlyText}>{onlyText}</p>}
      </div>
      <button onClick={onDelete} disabled={loading}>
        {loading ? (
          <span className="loader-loading">
            <IconLoader />
          </span>
        ) : (
          <IconX />
        )}
      </button>
    </div>
  );
};

interface IProps {
  open: boolean;
}
export const NotifyModal: FC<IProps> = ({ open }) => {
  const { notification } = useTypeSelector((state) => state.auth);
  const dispatch = useTypeDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingTrash, setLoadingTrash] = useState<boolean>(false);

  const onDeleteAll = () => {
    setLoadingTrash(true);
    dispatch(deleteAllNotification()).finally(() => {
      setLoadingTrash(true);
    });
  };

  useEffect(() => {
    setLoading(true);
    dispatch(getNotification()).finally(() => {
      setLoading(false);
    });
  }, []);

  console.log(notification);

  return (
    <div className={`${styles.body} notify-modal ${open ? styles.open : ""}`}>
      <div className={styles.header}>
        <p>Уведомления</p>

        {notification.length > 0 && (
          <Button type="text" onClick={onDeleteAll}>
            {loadingTrash ? (
              <span className="loader-loading">
                <IconLoader />
              </span>
            ) : (
              <IconTrash />
            )}
          </Button>
        )}
      </div>
      <div className={styles.content}>
        {loading && (
          <div className="loader-hover">
            <Loader />
          </div>
        )}
        {notification.length === 0 && !loading && (
          <Empty text="Сообщений нет" />
        )}
        <MyScrollbar>
          {notification.map((item) => (
            <Item
              key={item.id}
              url={item.url}
              id={item.id}
              text={item.message}
              icon="match"
            />
          ))}
        </MyScrollbar>
      </div>
    </div>
  );
};
