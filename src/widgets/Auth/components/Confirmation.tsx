"use client";
import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "../styles/confirmation.module.scss";
import Loader from "@/shared/UI/Loader";
import { confirm } from "../api/confirm";
import { useTypeDispatch } from "@/shared/hooks/useTypeDispatch";
import { setUser, setUserEmail } from "../slice/authSlice";
import { setCookie } from "nookies";
import { login } from "../api/auth";
import { useTimer } from "react-timer-hook";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";

interface IInputsProps {
  digits: string[];
  setDigits: Dispatch<SetStateAction<string[]>>;
}
const Inputs: FC<IInputsProps> = ({ digits, setDigits }) => {
  const inputsRef = useRef(new Array(digits.length));
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (index: number, newValue: string) => {
    const oldDigits = digits[index];
    const newDigits = newValue.trim().replace(oldDigits, "");

    inputsRef.current[index].value = "";
    if (newDigits < "0" || newDigits > "9" || !/^\d+$/.test(newValue)) return;
    setDigits(updateArray(digits, index, newDigits));

    const inputs = inputsRef.current;
    if (index < inputs.length - 1) {
      inputs[index + 1].focus();
    } else {
      inputs[index].blur();
    }
  };

  const onCopyPaste = (values: string) => {
    let currentValues = values.length > 6 ? values.slice(0, 6) : values;
    currentValues.split("").forEach((num, index) => {
      setDigits((prev) => {
        return prev.map((value, j) => (index === j ? num : value));
      });
    });
  };

  const updateArray = (array: string[], index: number, newValue: string) => {
    const copy = [...array];
    copy[index] = newValue;
    return copy;
  };

  const moveFocus = (key: "ArrowRight" | "ArrowLeft", index: number) => {
    const inputs = inputsRef.current;

    if (key === "ArrowLeft" && index !== 0) {
      inputs[index - 1].focus();
    }
    if (key === "ArrowRight" && index < inputs.length - 1) {
      inputs[index + 1].focus();
    }
  };

  const handleKeyDown = (index: number, keyPressed: string) => {
    if (keyPressed === "ArrowRight" || keyPressed === "ArrowLeft")
      return moveFocus(keyPressed, index);
    if (keyPressed !== "Backspace") return;
    if (digits[index]) {
      setDigits(updateArray(digits, index, ""));
    } else if (index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  useEffect(() => {
    if (inputsRef.current[0]) {
      inputsRef.current[0].focus();
    }
  }, []);

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
          onInput={(e) =>
            e.currentTarget.value.length > 2
              ? onCopyPaste(e.currentTarget.value)
              : handleChange(index, e.currentTarget.value)
          }
          value={num}
          className={styles.input}
          type="tel"
          onKeyDown={(e) => handleKeyDown(index, e.nativeEvent.key)}
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
  callbackConfirm?: ({
    code,
    email,
  }: {
    code: string;
    email: string;
  }) => Promise<string | null>;
}

export const Confirmation: FC<IProps> = ({ email, callbackConfirm }) => {
  const { auth } = useTypeSelector((state) => state.auth);

  const dispatch = useTypeDispatch();
  const [digits, setDigits] = useState<string[]>(defaultDigits);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { seconds, restart } = useTimer({
    expiryTimestamp: new Date(),
    autoStart: true,
  });

  const onConfirm = () => {
    setLoading(true);
    if (callbackConfirm) {
      callbackConfirm({ code: digits.join(""), email: email })
        .then((res) => {
          if (!res) return;
          dispatch(setUserEmail(res));
        })
        .catch((err) => {
          console.log(err);
          setError(true);
        })
        .finally(() => {
          setLoading(false);
        });
      return;
    }

    confirm({
      email,
      code: digits.join(""),
    })
      .then((res) => {
        dispatch(setUser(res.data));
        setCookie(null, "_token", res.token, {
          path: "/",
        });
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onLogin = () => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + 40);
    restart(time);
    login({ email })
      .then((res) => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (digits.join("").length === 6) {
      onConfirm();
    }
  }, [digits]);

  useEffect(() => {
    setDigits(defaultDigits);
  }, [auth]);

  useEffect(() => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + 40);
    restart(time);
  }, []);

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
        {seconds > 0 ? (
          <p className={styles.timer}>
            Повторная отправка через <span>{seconds} сек</span>
          </p>
        ) : (
          <button
            disabled={seconds > 0}
            className={styles.resend}
            onClick={onLogin}
          >
            Отправить код повторно
          </button>
        )}
      </div>
    </div>
  );
};
