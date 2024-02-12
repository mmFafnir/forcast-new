"use client";

import { FC, ReactNode } from "react";
import styles from "../styles/prem.match.module.scss";
import { Premium } from "../ui/Premium";
import { useTypeDispatch } from "@/shared/hooks/useTypeDispatch";
import { setClick, setModal } from "@/shared/UI/Modal/modalSlice";
import { EnumModals } from "@/shared/UI/Modal/EnumModals";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";

interface IProps {
  text?: string | ReactNode;
}
export const PremMatchBanner: FC<IProps> = ({ text }) => {
  const { auth } = useTypeSelector((state) => state.auth);
  const dispatch = useTypeDispatch();

  const onModalOpen = () => {
    if (!auth) return dispatch(setModal(EnumModals.LOGIN));
    dispatch(setClick("prem"));
    dispatch(setModal(EnumModals.PREMIUM));
  };

  return (
    <div className={styles.body} onClick={onModalOpen}>
      <Premium />
      <p className={styles.text}>
        {text || (
          <>
            <i>ПО РЕФЕРАЛЬНОЙ ССЫЛКЕ</i> со СКИДКОЙ <span>25%</span>
          </>
        )}
      </p>
    </div>
  );
};
