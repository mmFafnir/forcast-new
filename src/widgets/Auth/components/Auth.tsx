"use client";
import { FC, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import styles from "../styles/auth.module.scss";
import { validEmail } from "@/shared/core/form-rules";
import Button from "@/shared/UI/Button";
import { Confirmation } from "./Confirmation";
import { login } from "../api/auth";
import { IconPen } from "../icons/IconPen";

interface IFormInputs {
  email: string;
}

interface IProps {
  callback?: (data: IFormInputs) => void;
  callbackConfirm?: (params: {
    code: string;
    email: string;
  }) => Promise<string | null>;
}
const Auth: FC<IProps> = ({ callback, callbackConfirm }) => {
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const {
    control,
    handleSubmit,
    formState: {},
  } = useForm<IFormInputs>();

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    setLoading(true);
    const asyncAction = async (data: IFormInputs) =>
      callback ? callback(data) : login(data);
    asyncAction(data)
      .then(() => {
        setStep(1);
        setEmail(data.email);
      })
      .finally(() => setLoading(false));
  };

  const onBackStep = () => setStep(0);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.body}>
      <div className={styles.flex}>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{
            required: "Обязательно полу",
            pattern: validEmail,
          }}
          render={({ field, fieldState: { error } }) => (
            <div className={`${styles.inputDiv} ${error && styles.error}`}>
              <input className={styles.input} {...field} placeholder="E-mail" />
              {error && (
                <span className={styles.errorMes}>{error.message}</span>
              )}
            </div>
          )}
        />
        {step === 1 && (
          <Button onClick={onBackStep} className={styles.back}>
            <IconPen />
          </Button>
        )}
      </div>

      {step === 0 && (
        <Button
          loading={loading}
          htmlType="submit"
          className={styles.btn}
          type="gradient"
        >
          Продолжить
        </Button>
      )}
      {step === 1 && (
        <Confirmation callbackConfirm={callbackConfirm} email={email} />
      )}
    </form>
  );
};

export default Auth;
