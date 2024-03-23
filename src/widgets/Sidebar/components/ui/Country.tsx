import { TypeCountry } from "@/shared/types/country";
import styles from "../../styles/title.sport.module.scss";
import { FC, memo, useRef } from "react";
import { ArrowIcon } from "../../icons/ArrowIcon";
import useAccordion, {
  IAccordionStylesIcon,
} from "@/shared/hooks/useAccardion";
import Link from "next/link";
import { PinButton } from "@/features/favorites";
import { TypeLeague } from "@/shared/types/leagues";
import { usePathname } from "next/navigation";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";

interface IProps {
  country: TypeCountry;
}

const iconStyles: IAccordionStylesIcon = {
  open: {
    transform: `rotate(90deg)`,
  },
  close: {},
};

const CountryMemo: FC<IProps> = ({ country }) => {
  const { countryId, leagueId } = useTypeSelector((state) => state.filters);

  const listRef = useRef<HTMLDivElement | null>(null);
  const { iconStyle, onToggle, currentHeight, isOpen } = useAccordion({
    iconStyles,
    ref: listRef,
    defaultOpen: false,
    defaultHeight: 0,
  });

  return (
    <div>
      <div
        className={`${styles.title} ${styles.titleSCountry} ${
          isOpen ? styles.open : ""
        } ${!leagueId && countryId == country.id ? styles.active : ""}`}
      >
        <button onClick={onToggle}>
          <i style={iconStyle}>
            <ArrowIcon />
          </i>
        </button>
        <Link href={`/soccer/${country.url}`}>
          <span title={country.translation || country.name}>
            {country.translation || country.name}
          </span>
        </Link>
      </div>
      <div className={styles.list} style={{ height: currentHeight + "px" }}>
        <div ref={listRef}>
          {country.league.map((lig) => (
            <League
              key={lig.id}
              league={{ ...lig, country_url: country.url }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const League = ({ league }: { league: TypeLeague }) => {
  const pathname = usePathname();
  const { leagueId } = useTypeSelector((state) => state.filters);

  return (
    <div
      className={`${styles.title} ${styles.titleLeague} ${
        leagueId == league.id ? styles.active : ""
      }`}
    >
      <Link
        title={league.league_name}
        href={`/soccer/${league.country_url}/${league.url}`}
        className={styles.name}
      >
        <span>
          {league.translate && league.translate.length > 0
            ? league.translate[0].translation
            : league.league_name}
        </span>
      </Link>
      <PinButton leagues={league} />
    </div>
  );
};

export const Country = memo(CountryMemo);
