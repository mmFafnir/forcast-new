"use client";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

const SingIn = () => {
  const { data: session, status } = useSession();
  const { auth } = useTypeSelector((state) => state.auth);
  useEffect(() => {
    if (auth) return window.close();
    signIn("google");
  }, [session, status]);
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        zIndex: "200000",
        left: 0,
        top: 0,
        background: "white",
      }}
    ></div>
  );
};

export default SingIn;
