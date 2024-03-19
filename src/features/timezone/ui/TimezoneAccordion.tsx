"use client";
import { FC, useRef, useState } from "react";
import styles from "../styles/timezone.mobile.module.scss";
import { TypeTimezone } from "../types/TypeTimezone";
import MyScrollbar from "@/shared/UI/MyScrollbar";
import IconArrow from "@/shared/icons/IconArrow";
import useAccordion, {
  IAccordionStylesIcon,
} from "@/shared/hooks/useAccardion";
import { setTimezone } from "../slice/timezoneSlice";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import { useTypeDispatch } from "@/shared/hooks/useTypeDispatch";
import { timezoneData } from "@/shared/core/timezone";
import { closeAllModal } from "@/shared/UI/Modal/modalSlice";
import IconTime from "@/shared/icons/IconTime";

const iconStyles: IAccordionStylesIcon = {
  open: {},
  close: {
    transform: `scale(1, -1)`,
  },
};
export const TimezoneAccordion: FC = () => {
  const { utcId } = useTypeSelector((state) => state.timezone);
  const dispatch = useTypeDispatch();

  const [currentData, setCurrentData] = useState<TypeTimezone | null>(
    timezoneData.find((time) => time.id === utcId) || null
  );

  const listRef = useRef<HTMLDivElement | null>(null);

  const { iconStyle, onToggle, currentHeight } = useAccordion({
    iconStyles,
    ref: listRef,
  });

  const onChange = (zone: TypeTimezone) => {
    setCurrentData(zone);
    dispatch(setTimezone({ timezone: zone.zone, id: zone.id }));
    dispatch(closeAllModal());
  };

  return (
    <div className={styles.body}>
      {currentData && (
        <button className={styles.title} onClick={onToggle}>
          <IconTime />
          <p>{currentData.utc}</p>
          <span style={iconStyle}>
            <IconArrow />
          </span>
        </button>
      )}
      <div
        className={styles.accWrapper}
        style={{ height: currentHeight + "px" }}
      >
        <div className={styles.content} ref={listRef}>
          <MyScrollbar>
            <div className={styles.list}>
              {timezoneData.map((item) => (
                <button
                  title={`${item.utc} ${item.zone}`}
                  className={item.id == currentData?.id ? styles.active : ""}
                  key={item.id}
                  onClick={() => onChange(item)}
                >{`${item.utc}`}</button>
              ))}
            </div>
          </MyScrollbar>
        </div>
      </div>
    </div>
  );
};
