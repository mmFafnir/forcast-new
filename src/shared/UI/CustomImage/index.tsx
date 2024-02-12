"use client";

import Image from "next/image";
import { FC, useState } from "react";

import imgError from "./errorImage.svg";

interface IProps {
  src: string;
  width: number;
  alt: string;
  height?: number;
  className?: string;
  errorImage?: string;
}

const CustomImage: FC<IProps> = ({
  src,
  width,
  height,
  alt,
  className,
  errorImage,
}) => {
  const [image, setImage] = useState<string>(src);

  const onError = (e: any) => {
    setImage(errorImage || imgError);
  };

  return (
    <Image
      onError={onError}
      src={image}
      className={className}
      width={width}
      height={height}
      alt={alt}
    />
  );
};

export default CustomImage;
