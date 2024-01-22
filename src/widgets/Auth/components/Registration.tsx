"use client";
import { FC } from "react";
import styles from "../styles/auth.module.scss";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Button from "@/shared/UI/Button";
import { OtherRegister } from "./OtherRegister";

interface IFormInputs {
  email: string;
  password: string;
  promo_code: string;
}

export const Registration: FC = () => {
  const { handleSubmit, control, reset } = useForm<IFormInputs>();
  const onSubmit: SubmitHandler<IFormInputs> = (data) => console.log(data);

  return (
    <div className={styles.body}>
      <div className={styles.wrapper}>
        <p className={styles.title}>Регистрация</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            rules={{ required: "Обязательно поле" }}
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
            rules={{ required: "Обязательно поле" }}
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
          <Controller
            name="promo_code"
            control={control}
            render={({ field }) => (
              <div className={styles.inputDiv}>
                <input
                  className={styles.inputDashed}
                  {...field}
                  placeholder="Введите промокод"
                />
              </div>
            )}
          />
          <Button className={styles.submit} htmlType="submit" type="gradient">
            Зарегистрироваться
          </Button>
        </form>
        <p className={styles.or}>или</p>
        <OtherRegister />
        <p>Уже есть аккаунт?</p>
      </div>
    </div>
  );
};
