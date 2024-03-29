"use client";
import { FC, memo, useEffect, useId, useState } from "react";
import styles from "./styles.module.scss";
import { RadioInput } from "./ui/RadioInput";
import { Progress } from "./ui/Progress";
import { getRisks } from "./api/gerRisks";
import { getColorRisk } from "./scripts/getColorRisk";
import { getStatistics } from "./api/getStatistics";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import { IFetchStatistics } from "./types";
import Loader from "@/shared/UI/Loader";
import { usePathname } from "next/navigation";
import { useTypeDispatch } from "@/shared/hooks/useTypeDispatch";
import { setParamsLink } from "@/features/breadсrumbs/slice/linkSlice";

type TypeRisk = {
  id: number;
  name: string;
};
const RadiosRisk = ({ setRisk }: { setRisk: (risk: number) => void }) => {
  const [risks, setRisks] = useState<TypeRisk[]>([
    {
      id: 1,
      name: "Низкий риск",
    },
    {
      id: 2,
      name: "Средний риск",
    },
    {
      id: 4,
      name: "Высокий риск",
    },
  ]);
  const id = useId();
  useEffect(() => {
    if (risks.length > 0) return;
    getRisks().then((res) => {
      setRisks(res);
    });
  }, []);

  return (
    <div className={styles.tabs}>
      <RadioInput
        id={"all" + id}
        title={"Общая"}
        name={"risk-" + id}
        checked
        color={"rgb(217, 217, 217)"}
        value={0}
        setRisk={setRisk}
      />
      {risks.map((risk) => (
        <RadioInput
          setRisk={setRisk}
          value={risk.id}
          key={risk.id}
          id={String(risk.id + id)}
          title={risk.name}
          name={"risk-" + id}
          color={getColorRisk(risk.id)}
        />
      ))}
    </div>
  );
};

interface IProps {
  isMob?: boolean;
}
const RiskWidgets: FC<IProps> = ({ isMob }) => {
  const pathname = usePathname();
  const { countryId, leagueId, sportId } = useTypeSelector(
    (state) => state.filters
  );
  const { country, league, sport } = useTypeSelector((state) => state.links);
  const dispatch = useTypeDispatch();

  const [risk, setRisk] = useState<number>(0);
  const [data, setData] = useState<IFetchStatistics[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (
      pathname != "/soccer" &&
      pathname.includes("/soccer") &&
      countryId == "" &&
      leagueId == ""
    )
      return;
    setLoading(true);
    getStatistics({
      league_id: leagueId,
      country_id: countryId,
      sport_id: sportId,
    })
      .then((res) => {
        setData(res);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [countryId, leagueId, sportId]);

  useEffect(() => {
    if (
      pathname === "/privacy-policy" ||
      pathname === "/" ||
      pathname === "/faq" ||
      pathname === "/archive"
    ) {
      dispatch(
        setParamsLink({
          country: "",
          sport: "",
          league: "",
          match: "",
        })
      );
    }
  }, [pathname]);
  return (
    <div className={`${styles.body} ${isMob ? styles.mob : ""}`}>
      <div className={styles.header}>
        <p>Статистика{sport && ": " + (league || country || sport)}</p>
      </div>
      <div>
        <RadiosRisk setRisk={setRisk} />
        <div className={styles.content}>
          {loading && (
            <div className="loader-hover">
              <Loader />
            </div>
          )}
          {data.map((stat) => (
            <div
              key={stat.key}
              style={{ display: Number(stat.key) === risk ? "block" : "none" }}
            >
              {stat.item.avg === 0 && (
                <div className={styles.empty}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                  >
                    <path
                      d="M9 15.2499H11V9.24988H9V15.2499ZM10 7.24988C10.2833 7.24988 10.521 7.15388 10.713 6.96188C10.905 6.76988 11.0007 6.53254 11 6.24988C11 5.96654 10.904 5.72921 10.712 5.53788C10.52 5.34654 10.2827 5.25054 10 5.24988C9.71667 5.24988 9.47933 5.34588 9.288 5.53788C9.09667 5.72988 9.00067 5.96721 9 6.24988C9 6.53321 9.096 6.77088 9.288 6.96288C9.48 7.15488 9.71733 7.25054 10 7.24988ZM10 20.2499C8.61667 20.2499 7.31667 19.9872 6.1 19.4619C4.88333 18.9365 3.825 18.2242 2.925 17.3249C2.025 16.4249 1.31267 15.3665 0.788 14.1499C0.263333 12.9332 0.000666667 11.6332 0 10.2499C0 8.86654 0.262667 7.56655 0.788 6.34988C1.31333 5.13321 2.02567 4.07488 2.925 3.17488C3.825 2.27488 4.88333 1.56254 6.1 1.03788C7.31667 0.513211 8.61667 0.250545 10 0.249878C11.3833 0.249878 12.6833 0.512545 13.9 1.03788C15.1167 1.56321 16.175 2.27554 17.075 3.17488C17.975 4.07488 18.6877 5.13321 19.213 6.34988C19.7383 7.56655 20.0007 8.86654 20 10.2499C20 11.6332 19.7373 12.9332 19.212 14.1499C18.6867 15.3665 17.9743 16.4249 17.075 17.3249C16.175 18.2249 15.1167 18.9375 13.9 19.4629C12.6833 19.9882 11.3833 20.2505 10 20.2499Z"
                      fill="white"
                    />
                  </svg>
                  <p>Информации пока нет, попробуйте позже</p>
                </div>
              )}
              {stat.item.all_cards_count + stat.item.all_access_card_count >
                0 && (
                <>
                  <Progress
                    color="#57D0A5"
                    title="Всего"
                    total={stat.item.all_cards_count}
                    available={stat.item.all_access_card_count}
                  />
                  <Progress
                    color="#9C44BB"
                    title="Лучшие"
                    total={stat.item.best_bet}
                    available={stat.item.access_best_bet}
                  />
                  <div className={styles.odds}>
                    <p>Средний коэф</p>
                    <p>{stat.item.avg.toFixed(2)}</p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(RiskWidgets);
