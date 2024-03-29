"use client";

import { closeAllModal } from "@/shared/UI/Modal/modalSlice";
import { useTypeDispatch } from "@/shared/hooks/useTypeDispatch";
import { useRouter } from "next/navigation";
import { FC, ReactNode, useEffect } from "react";

interface IProps {
  children: ReactNode;
}
export const EventProvider: FC<IProps> = ({ children }) => {
  const dispatch = useTypeDispatch();
  const router = useRouter();

  useEffect(() => {
    const pressKey = (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        dispatch(closeAllModal());
      }
    };

    document.addEventListener("keydown", pressKey);

    return () => document.removeEventListener("keydown", pressKey);
  }, []);

  return <>{children}</>;
};
