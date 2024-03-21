"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ymSend } from "../helpers/ymSend";

export function WebVitals() {
  const [isStart, setIsStart] = useState<boolean>(true);
  const pathname = usePathname();
  //   useReportWebVitals((metric) => {
  //     console.log(metric);
  //   });

  useEffect(() => {
    if (isStart) {
      setIsStart(false);
      return;
    }
    ymSend("hit", window.location.href);
  }, [pathname]);

  return <></>;
}
