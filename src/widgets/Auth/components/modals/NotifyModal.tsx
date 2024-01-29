import Button from "@/shared/UI/Button";
import styles from "../../styles/modal.notify.module.scss";
import SportsIcon from "@/shared/icons/sports";
import IconX from "@/shared/icons/IconX";
import MyScrollbar from "@/shared/UI/MyScrollbar";
import { FC, ReactNode } from "react";
import { TypeIconNotify, getIconNotify } from "../../helpper/getIconNotify";
import { IconTrash } from "../../icons/IconTrash";

interface IPropsItem {
  title?: string;
  text?: string | ReactNode;
  icon: TypeIconNotify;
  onlyText?: string | ReactNode;
}

const Item: FC<IPropsItem> = ({ title, text, icon, onlyText }) => {
  return (
    <div className={styles.item}>
      {getIconNotify(icon)}
      <div>
        {title && <p className={styles.itemTitle}>{title}</p>}
        {text && <p className={styles.itemText}>{text}</p>}
        {onlyText && <p className={styles.onlyText}>{onlyText}</p>}
      </div>
      <button>
        <IconX />
      </button>
    </div>
  );
};

interface IProps {
  open: boolean;
}
export const NotifyModal: FC<IProps> = ({ open }) => {
  return (
    <div className={`${styles.body} notify-modal ${open ? styles.open : ""}`}>
      <div className={styles.header}>
        <p>Уведомления</p>
        <Button type="text">
          <IconTrash />
        </Button>
      </div>
      <div className={styles.content}>
        <MyScrollbar>
          <Item
            title="Начался матч"
            text={`“АВСТРАЛИЯ И ОКЕАНИЯ OFC Championship U16 Women”`}
            icon="match"
          />
          <Item
            onlyText={
              <>
                Пользователь <a href="#">@klarkKent</a> оставил комментарий
              </>
            }
            icon="comment"
          />
          <Item
            title="Начался матч"
            text={`“АВСТРАЛИЯ И ОКЕАНИЯ OFC Championship U16 Women”`}
            icon="match"
          />
          <Item
            title="Начался матч"
            text={`“АВСТРАЛИЯ И ОКЕАНИЯ OFC Championship U16 Women”`}
            icon="bell"
          />
          <Item
            title="Начался матч"
            text={`“АВСТРАЛИЯ И ОКЕАНИЯ OFC Championship U16 Women”`}
            icon="match"
          />
        </MyScrollbar>
      </div>
    </div>
  );
};
