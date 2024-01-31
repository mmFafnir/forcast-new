"use client";
import { FC, useEffect, useRef, useState } from "react";
import styles from "../styles/confirmation.module.scss";
import Loader from "@/shared/UI/Loader";
import { confirm } from "../api/confirm";
import { useTypeDispatch } from "@/shared/hooks/useTypeDispatch";
import { setUser } from "../slice/authSlice";
import { setCookie } from "nookies";
import { closeAllModal } from "@/shared/UI/Modal/modalSlice";

interface IInputsProps {
  digits: string[];
  setDigits: (digits: string[]) => void;
}
const Inputs: FC<IInputsProps> = ({ digits, setDigits }) => {
  const inputsRef = useRef(new Array(digits.length));
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (index: number, newValue: string) => {
    const oldDigits = digits[index];
    const newDigits = newValue.trim().replace(oldDigits, "");

    if (newDigits < "0" || newDigits > "9") return;
    setDigits(updateArray(digits, index, newDigits));

    const inputs = inputsRef.current;
    if (index < inputs.length - 1) {
      inputs[index + 1].focus();
    } else {
      inputs[index].blur();
    }
  };

  const updateArray = (array: string[], index: number, newValue: string) => {
    const copy = [...array];
    copy[index] = newValue;
    return copy;
  };

  const handleKeyDown = (index: number, keyPressed: string) => {
    console.log(keyPressed);
    if (keyPressed !== "Backspace") return;
    if (digits[index]) {
      setDigits(updateArray(digits, index, ""));
    } else if (index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  return (
    <div className={styles.inputs}>
      {loading && (
        <div className="loader-hover">
          <Loader />
        </div>
      )}
      {digits.map((num, index) => (
        <input
          ref={(ref) => {
            inputsRef.current[index] = ref;
          }}
          key={index}
          onInput={(e) => handleChange(index, e.currentTarget.value)}
          value={num}
          className={styles.input}
          type="number"
          onKeyDown={(e) => handleKeyDown(index, e.nativeEvent.key)}
          maxLength={1}
          max={9}
          disabled={loading}
        />
      ))}
    </div>
  );
};

const defaultDigits = ["", "", "", "", "", ""];

interface IProps {
  email: string;
}
export const Confirmation: FC<IProps> = ({ email }) => {
  const dispatch = useTypeDispatch();

  const [digits, setDigits] = useState<string[]>(defaultDigits);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const onConfirm = () => {
    setLoading(true);
    confirm({
      email,
      code: digits.join(""),
    })
      .then((res) => {
        dispatch(setUser(res.data));
        setCookie(null, "_token", res.token, {
          path: "/",
        });

        dispatch(closeAllModal());
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (digits.join("").length === 6) {
      onConfirm();
    }
  }, [digits]);

  return (
    <div className={styles.body}>
      {loading && (
        <div className="loader-hover">
          <Loader />
        </div>
      )}
      <div className={styles.header}>
        <p className={styles.title}>Введи код из письма</p>
        <p className={styles.text}>
          Письмо с кодом отправлено на почту {email}
        </p>
      </div>
      <Inputs digits={digits} setDigits={setDigits} />
      <div className={styles.footer}>
        {error && <p className={styles.error}>Неверный код</p>}
        <p className={styles.timer}>
          Повторная отправка через <span>40 сек</span>
        </p>
        <button className={styles.resend}>Отправить код повторно</button>
      </div>
    </div>
  );
};
