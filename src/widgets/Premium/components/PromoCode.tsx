import { FC, useState } from "react";
import styles from "../styles/promocode.module.scss";
import { IconWrapCode } from "../icons/IconWrapCode";
import Button from "@/shared/UI/Button";
import { IconOk } from "../icons/IconOk";
import { EnumStatus } from "@/shared/types/Enums";
import { checkPremium } from "../api/checkPremium";

interface IProps {
  bonus: string;
  bonusDay: string;
  setPremStatus: (value: boolean) => void;
}
export const PromoCode: FC<IProps> = ({ bonus, bonusDay, setPremStatus }) => {
  const [code, setCode] = useState<string>("");
  const [codeSuccess, setCodeSuccess] = useState<string>("");
  const [status, setStatus] = useState<EnumStatus>(EnumStatus.DEFAULT);
  const [loading, setLoading] = useState(false);
  const onSendCode = () => {
    setLoading(true);
    checkPremium(code)
      .then((res) => {
        if (res.code_id) {
          setStatus(EnumStatus.SUCCESS);
          setCodeSuccess(code);
          setPremStatus(true);
          return;
        }
        setStatus(EnumStatus.ERROR);
        setPremStatus(false);
      })
      .catch(() => {
        setStatus(EnumStatus.ERROR);
        setPremStatus(false);
      })
      .finally(() => setLoading(false));
  };

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
          <div className={styles.discount}>
            <p>
              Держи еще скидку: <span>{bonus}%</span>
            </p>
            <p>
              И бонусных дней для тестов: <span>+{bonusDay}</span>
            </p>
          </div>
        </>
      )}
      {status === EnumStatus.ERROR && (
        <p className={styles.error}>Неверный промокод</p>
      )}
    </div>
  );
};
