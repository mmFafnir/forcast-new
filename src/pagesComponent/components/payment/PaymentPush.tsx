"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const PaymentPush = () => {
  const navigation = useRouter();
  useEffect(() => {
    setTimeout(() => {
      navigation.push("/");
    }, 5000);
  }, []);
  return (
    <div>
      <h1>Пуши</h1>
    </div>
  );
};
