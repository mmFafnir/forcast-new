import Image from "next/image";
import Link from "next/link";
import React, { CSSProperties, FC } from "react";

import "./style.scss";

interface IProps {
  style?: CSSProperties;
}
const Logo: FC<IProps> = ({ style }) => {
  const styles = { ...style };
  return (
    <Link style={styles} className="logo" href={"/"}>
      <Image src={"/logo.svg"} width={160} height={30} alt="logo" />
    </Link>
  );
};

export default Logo;
