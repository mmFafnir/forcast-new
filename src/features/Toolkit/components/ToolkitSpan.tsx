"use client";
import { useTypeDispatch } from "@/shared/hooks/useTypeDispatch";
import { FC, ReactNode, useEffect, useRef } from "react";
import { setToolkitCor, setToolkitText } from "../slice/toolkitSlice";

interface IProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export const ToolkitSpan: FC<IProps> = ({
  children,
  title,
  className = "",
}) => {
  const dispatch = useTypeDispatch();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    ref.current.addEventListener("mouseenter", (e) => {
      dispatch(setToolkitText(title));
      dispatch(
        setToolkitCor({
          x: e.clientX,
          y: e.clientY,
        })
      );
    });
    ref.current.addEventListener("mouseleave", (e) => {
      dispatch(setToolkitText(null));
      setTimeout(() => {
        dispatch(setToolkitCor(null));
      }, 400);
    });
  }, []);

  return <div className={className}>{children}</div>;
};
