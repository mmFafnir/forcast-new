"use client";
import { FC, useEffect } from "react";
import styles from "../styles/auth.module.scss";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Button from "@/shared/UI/Button";
import { OtherRegister } from "./OtherRegister";
import { useTypeDispatch } from "@/shared/hooks/useTypeDispatch";
import { login } from "../slice/asyncActions";
import { validEmail } from "@/shared/core/form-rules";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import { EnumStatus } from "@/shared/types/Enums";

interface IFormInputs {
  email: string;
  password: string;
}

export const Login: FC = () => {
  const dispatch = useTypeDispatch();
  const { errorsValid, status } = useTypeSelector((state) => state.auth);
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<IFormInputs>();

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    dispatch(
      login({
        email: data.email,
        password: data.password,
      })
    );
  };

  useEffect(() => {
    console.log(errorsValid);
    errorsValid.forEach((err) => {
      // @ts-ignore
      setError(err.key, { message: err.message });
    });
  }, [errorsValid]);

  return (
    <div className={styles.body}>
      <div className={styles.wrapper}>
        <p className={styles.title}>Войти</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          {errors.root && (
            <p className="error-message">{errors.root.message}</p>
          )}
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: "Обязательно полу",
              pattern: validEmail,
            }}
            render={({ field, fieldState: { error } }) => (
              <div className={styles.inputDiv}>
                <input
                  className={styles.input}
                  {...field}
                  placeholder="E-mail"
                />
                {error && <span>{error.message}</span>}
              </div>
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{ required: "Обязательно полу" }}
            render={({ field, fieldState: { error } }) => (
              <div className={styles.inputDiv}>
                <input
                  className={styles.input}
                  {...field}
                  placeholder="Пароль"
                  type="password"
                />
                {error && <span>{error.message}</span>}
              </div>
            )}
          />
          <button type="button" className={styles.restore}>
            Забыли пароль?
          </button>
          <Button
            loading={status === EnumStatus.LOADING}
            className={styles.submit}
            htmlType="submit"
            type="gradient"
          >
            Войти
          </Button>
        </form>
        <p className={styles.or}>или</p>
        <OtherRegister />
        <p>Нет аккаунта?</p>
      </div>
    </div>
  );
};
