"use client";
import { useEffect, useState } from "react";

const useHydration = (): { isMounted: boolean } => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  return { isMounted };
};

export default useHydration;
