"use client";
import Modal from "@/shared/UI/Modal";
import { EnumModals } from "@/shared/UI/Modal/EnumModals";
import { useTypeDispatch } from "@/shared/hooks/useTypeDispatch";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import { useEffect, useState } from "react";
import { Wrapper } from "../ui/Wrapper";
import styles from "../../styles/auth.module.scss";
import Auth from "../Auth";
import { OtherSnap } from "../OtherSnap";
import { TelegramSnap } from "../Snaps/TelegramSnap";
import { setCookie } from "nookies";
import { setUser } from "../../slice/authSlice";
import { getUserInfo } from "../../api/getUserInfo";
import { SuccessNotify } from "../ui/SuccessNotify";

export const ModalAuth = () => {
  const dispatch = useTypeDispatch();

  const { click } = useTypeSelector((state) => state.modal);
  const { auth, token } = useTypeSelector((state) => state.auth);

  const [component, setComponent] = useState<string>("mail");

  useEffect(() => {
    if (auth) setComponent("success");
    if (!auth) setComponent("mail");
  }, [auth]);

  useEffect(() => {
    if (!token) return;
    setCookie(null, "_token", token, {
      maxAge: 30 * 24 * 60 * 60, // Две недели
      path: "/",
    });
    getUserInfo(token).then((res) => {
      dispatch(setUser(res));
    });
  }, [token]);

  return (
    <Modal
      name={EnumModals.LOGIN}
      stylesWrapper={{ flex: "0 1 100%", height: "100%" }}
      styleContent={{ flex: "0 1 500px", margin: "0 auto" }}
      classContent="modal-wrapper"
      styleBody={{ padding: 0 }}
      title="Вход или регистрация"
      titleAlight="center"
      hideRender
    >
      <Wrapper>
        <>
          {click === "prem" && (
            <div className={styles.cart}>
              <p>
                Для продолжения покупки войдите или зарегистрируйтесь, введя
                свой email
              </p>
            </div>
          )}
          {component !== "success" && (
            <OtherSnap auth component={component} setComponent={setComponent} />
          )}
          {component === "mail" && <Auth />}
          {component === "telegram" && <TelegramSnap mode="login" />}
          {component === "success" && <SuccessNotify />}
        </>
      </Wrapper>
    </Modal>
  );
};
