"use client";
import Button from "@/shared/UI/Button";
import { useEffect, useState } from "react";
import { IconShared } from "..";
import { ModalShared } from "./ModalShared";
import { isMobile } from "../scripts/isMobile";

export const SharedButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onMouseEnter = () => !isMobile.any() && setIsOpen(true);
  const onMouseLeave = () => !isMobile.any() && setIsOpen(false);

  const onClick = () => {
    if (!isMobile.any()) return;
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const outsideClose = (e: MouseEvent) => {
      if (!isMobile.any()) return;
      const target = e.target as HTMLElement;
      console.log(target);
      if (!target.closest(`.shared-modal`)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", outsideClose);
    return () => document.removeEventListener("click", outsideClose);
  }, []);

  return (
    <div
      className="shared-modal"
      style={{ position: "relative", zIndex: 5 }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Button className="shared-btn" onClick={onClick}>
        <IconShared />
      </Button>
      <ModalShared open={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};
