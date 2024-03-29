"use client";
import React, { FC } from "react";
import Image from "next/image";
import soccer from "./images/soccer.png";
import top from "./images/top.svg";

const getImage = (key: string) => {
  switch (key) {
    case "soccer":
      return soccer;

    case "top":
      return top;

    default:
      return soccer;
  }
};

export type TypeSportIcon = string;

interface IProps {
  icon: TypeSportIcon;
  width?: number;
  height?: number;
}

const SportsIcon: FC<IProps> = ({ icon, width = 20, height = 20 }) => {
  return (
    <Image
      src={getImage(icon)}
      width={width}
      height={height}
      alt={icon + "icon"}
    />
  );
};

export default SportsIcon;
