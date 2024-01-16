"use client";
import React, { FC } from "react";
import Image from "next/image";
import soccer from "./images/soccer.png";

const getImage = (key: string) => {
  switch (key) {
    case "soccer":
      return soccer;
    default:
      return soccer;
  }
};

export type TypeSportIcon = string;

interface IProps {
  icon: TypeSportIcon;
}

const SportsIcon: FC<IProps> = ({ icon }) => {
  return (
    <Image src={getImage(icon)} width={20} height={20} alt={icon + "icon"} />
  );
};

export default SportsIcon;
