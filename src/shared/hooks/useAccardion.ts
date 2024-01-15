"use client";

import { CSSProperties, MutableRefObject, useEffect, useState } from "react";

interface ISize {
  width: number;
  height: number;
}

export interface IAccordionStylesIcon {
  close: CSSProperties;
  open: CSSProperties;
}

interface IProps {
  iconStyles: IAccordionStylesIcon;
  defaultOpen?: boolean;
  offResizeObserver?: boolean;
  ref: MutableRefObject<HTMLDivElement | null>;
}
const useAccordion = ({
  iconStyles,
  ref,
  defaultOpen = true,
  offResizeObserver = false,
}: IProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);
  const [size, setSize] = useState<ISize>({ width: 0, height: 0 });
  const [currentHeight, setCurrentHeight] = useState<number | string>("auto");
  const [iconStyle, setIconStyle] = useState<CSSProperties>(iconStyles.open);

  const onToggle = () => setIsOpen((prev) => !prev);
  useEffect(() => {
    if (!ref.current) return;
    setIconStyle(isOpen ? iconStyles.open : iconStyles.close);
    setCurrentHeight(isOpen ? ref.current.clientHeight : 0);
  }, [isOpen]);

  useEffect(() => {
    if (!ref.current || offResizeObserver) return;
    if ("ResizeObserver" in window) {
      const observer = new ResizeObserver((entries) => {
        const { width, height } = entries[0].contentRect;
        setSize({ width, height });
      });
      observer.observe(ref.current);
      return () => observer.disconnect();
    }
  }, [ref]);

  useEffect(() => {
    if (!ref.current) return;

    setCurrentHeight(isOpen ? ref.current.clientHeight : 0);
  }, [size]);

  return { iconStyle, onToggle, currentHeight };
};

export default useAccordion;
