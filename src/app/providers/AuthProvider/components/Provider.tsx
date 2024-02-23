"use client";

import { SessionProvider, useSession } from "next-auth/react";
import React, { FC, ReactNode, useEffect } from "react";

interface IProps {
  children: ReactNode;
}

export const AuthProvider: FC<IProps> = ({ children }) => {
  return <>{children};</>;
};
