import { CSSProperties, FC, useEffect, useId, useState } from "react";
import styles from "../styles/title.sport.module.scss";
import Link from "next/link";
import SportsIcon from "@/shared/icons/sports";
import TotalMatches from "@/shared/UI/TotalMatches";
import { ArrowIcon } from "../icons/ArrowIcon";
import { usePathname } from "next/navigation";

interface IProps {
  isOpen: boolean;
  onToggle: () => void;
  href: string;
  iconStyle: CSSProperties;
  gameCount?: number | null;
}

export const TitleSport: FC<IProps> = ({
  isOpen,
  onToggle,
  href,
  iconStyle,
  gameCount,
}) => {
  const id = useId();
  const pathname = usePathname();

  const [click, setClick] = useState<string | null>(null);

  useEffect(() => {
    console.log(isOpen);
    if (isOpen) {
      const otherBtn = document.querySelectorAll(".sport-title-btn-active");
      otherBtn.forEach((btn) => {
        if (click != btn.id) {
          (btn as HTMLButtonElement).click();
        } else {
          setClick(null);
        }
      });
    }
  }, [isOpen]);

  return (
    <div
      className={`${styles.title} ${isOpen ? styles.open : ""} ${
        pathname.includes(href) ? styles.active : ""
      }`}
    >
      <button
        id={id}
        className={`${isOpen ? "sport-title-btn-active" : ""}`}
        onClick={() => {
          setClick(id);
          onToggle();
        }}
      >
        <i style={iconStyle}>
          <ArrowIcon />
        </i>
      </button>
      <Link href={href}>
        <SportsIcon icon="soccer" />
        <span>Футбол</span>
        <TotalMatches className={styles.total}>{gameCount || 0}</TotalMatches>
      </Link>
    </div>
  );
};
