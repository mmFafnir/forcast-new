"use client";
import { FC, useEffect } from "react";
import styles from "../styles/button.notify.module.scss";
import Button from "@/shared/UI/Button";
import { IconBell } from "@/features/notification/icons/IconBell";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import { selectActiveNotifyCount } from "@/widgets/Auth/slice/selectors";
import { useTypeDispatch } from "@/shared/hooks/useTypeDispatch";
import { EnumModals } from "@/shared/UI/Modal/EnumModals";
import { closeAllModal, setModal } from "@/shared/UI/Modal/modalSlice";

interface IProps {
  className?: string;
}
export const NotifyButton: FC<IProps> = ({ className = "" }) => {
  const dispatch = useTypeDispatch();
  const notifyCountActive = useTypeSelector(selectActiveNotifyCount);
  const { modal } = useTypeSelector((state) => state.modal);
  const openModal = () => dispatch(setModal(EnumModals.NOTIFICATION));
  const closeModal = () => {
    modal === EnumModals.NOTIFICATION && dispatch(closeAllModal());
  };

  useEffect(() => {
    if (modal !== EnumModals.NOTIFICATION) return;
    const onCloseModal = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        !target.closest(`.notify-modal`) &&
        !target.closest(`.${styles.body}`)
      ) {
        closeModal();
      }
    };
    document.addEventListener("click", onCloseModal);

    return () => document.removeEventListener("click", onCloseModal);
  }, [modal]);

  return (
    <>
      <Button
        onClick={modal === EnumModals.NOTIFICATION ? closeModal : openModal}
        iconButton={true}
        type="text"
        className={`${styles.body} ${className}`}
      >
        {notifyCountActive > 0 && (
          <p>
            <span>{notifyCountActive}</span>
          </p>
        )}
        <IconBell />
      </Button>
    </>
  );
};
