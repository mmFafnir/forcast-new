"use client";
import Button from "@/shared/UI/Button";
import { useState } from "react";
import { IconShared } from "..";
import { ModalShared } from "./ModalShared";

export const SharedButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onToggle = () => setIsOpen((prev) => !prev);
  return (
    <div style={{ position: "relative", zIndex: 5 }}>
      <Button className="shared-btn" onClick={onToggle}>
        <IconShared />
      </Button>
      <ModalShared open={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};
