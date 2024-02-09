"use client";

import { FC, useEffect, useState } from "react";

interface IProps {
  width: number;
}

const useWindowWidth = ({ width }: IProps) => {
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {}, []);

  return { show };
};

export default useWindowWidth;
