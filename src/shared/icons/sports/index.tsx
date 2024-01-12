import React, { FC } from "react";
import Image from "next/image";
import soccer from "./images/soccer.png";

const images = { soccer: soccer };
export type TypeSportIcon = "soccer";

interface IProps {
  icon: TypeSportIcon;
}

const SportsIcon: FC<IProps> = ({ icon }) => {
  return (
    <Image src={images[icon]} width={20} height={20} alt={icon + "icon"} />
  );
};

export default SportsIcon;
