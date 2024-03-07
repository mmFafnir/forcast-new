import { FC, useState } from "react";
import { IconWrapCode } from "../icons/IconWrapCode";
import { IconOk } from "../icons/IconOk";
import { EnumStatus } from "@/shared/types/Enums";
import { checkPremium } from "../api/checkPremium";
import Button from "@/shared/UI/Button";
import styles from "../styles/promocode.module.scss";
import { TypePromoCode } from "../types/IFetchPromoCode";

interface IProps {
  free?: "1" | "0";
  bonus: string;
  bonusDay: string;
  setPremStatus: (value: TypePromoCode | null) => void;
}
export const PromoCode: FC<IProps> = ({
  bonus,
  bonusDay,
  setPremStatus,
  free,
}) => {
  const [code, setCode] = useState<string>("");
  const [codeSuccess, setCodeSuccess] = useState<string>("");
  const [status, setStatus] = useState<EnumStatus>(EnumStatus.DEFAULT);
  const [loading, setLoading] = useState(false);

  const [conditions, setСonditions] = useState<TypePromoCode | null>(null);

  const onSendCode = () => {
    setLoading(true);
    checkPremium(code)
      .then((res) => {
        if (res.code_id) {
          setStatus(EnumStatus.SUCCESS);
          setCodeSuccess(code);
          setPremStatus(res.ref_code_details);
          setСonditions(res.ref_code_details);
          return;
        }
        console.log(res);
        setStatus(EnumStatus.ERROR);
        setPremStatus(null);
      })
      .catch(() => {
        setStatus(EnumStatus.ERROR);
        setPremStatus(null);
      })
      .finally(() => setLoading(false));
  };

  console.log(free);

  return (
    <div className={styles.body}>
      <div className={styles.promo}>
        <div className={styles.code}>
          <IconWrapCode />
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Введите промокод"
          />
        </div>
        <Button
          disabled={code.trim().length === 0}
          loading={loading}
          className={styles.btn}
          type="gradient"
          onClick={onSendCode}
        >
          Применить
        </Button>
      </div>
      {status === EnumStatus.SUCCESS && (
        <>
          <div className={styles.success}>
            <IconOk />
            <p>
              Промокод {codeSuccess}: <span>Активирован</span>
            </p>
          </div>
          {free === "1" && conditions?.free_tariffe === "1" ? (
            <></>
          ) : (
            <div className={styles.discount}>
              {conditions?.bonus_percent === "1" && bonus != "0" && (
                <p>
                  Держи еще скидку: <span>{bonus}%</span>
                </p>
              )}
              {conditions?.bonus_day === "1" && bonusDay != "0" && (
                <p>
                  И бонусных дней для тестов: <span>+{bonusDay}</span>
                </p>
              )}
            </div>
          )}
        </>
      )}
      {status === EnumStatus.ERROR && (
        <p className={styles.error}>Неверный промокод</p>
      )}
    </div>
  );
};
