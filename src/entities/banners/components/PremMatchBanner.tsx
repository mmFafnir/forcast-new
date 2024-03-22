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
  prem?: boolean;
  bodyClass?: string;
  click?: string;
}
export const PremMatchBanner: FC<IProps> = ({
  text,
  prem = true,
  bodyClass,
  click,
}) => {
  const { auth, user } = useTypeSelector((state) => state.auth);
  const dispatch = useTypeDispatch();

  const onModalOpen = () => {
    if (!auth) return dispatch(setModal(EnumModals.LOGIN));
    dispatch(setClick(click ? click : "prem"));
    dispatch(setModal(EnumModals.PREMIUM));
  };

  if (user?.premium == "1") return <></>;
  return (
    <div className={`${styles.body} ${bodyClass}`} onClick={onModalOpen}>
      {prem && <Premium />}
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
