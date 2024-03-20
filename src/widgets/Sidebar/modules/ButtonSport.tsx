import { FC, useEffect, useId, useRef } from "react";
import useAccordion, {
  IAccordionStylesIcon,
} from "@/shared/hooks/useAccardion";
import { CountriesList } from "../components/CountriesList";
import { TitleSport } from "../components/TitleSport";
import styles from "../styles/button.sport.module.scss";
interface IProps {
  href: string;
  gameCount?: number | null;
}

const iconStyles: IAccordionStylesIcon = {
  open: {
    transform: `rotate(90deg)`,
  },
  close: {},
};

export const ButtonSport: FC<IProps> = ({ gameCount, href }) => {
  const listRef = useRef<HTMLDivElement | null>(null);

  const { iconStyle, onToggle, isOpen } = useAccordion({
    iconStyles,
    ref: listRef,
    defaultOpen: false,
    defaultHeight: 0,
  });

  return (
    <div className={`${styles.sportBtn} ${isOpen ? styles.open : ""}`}>
      <TitleSport
        isOpen={isOpen}
        href={href}
        iconStyle={iconStyle}
        onToggle={onToggle}
        gameCount={gameCount}
      />
      <CountriesList isOpen={isOpen} listRef={listRef} />
    </div>
  );
};
