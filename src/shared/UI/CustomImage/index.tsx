"use client";

import Image from "next/image";
import { FC, useEffect, useState } from "react";

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
  const [loading, setLoading] = useState<boolean>(true);
  const [image, setImage] = useState<string>(src);

  function onImageLoad() {
    setLoading(false);
    setImage(src);
  }

  const onError = (e: any) => {
    setImage(errorImage || imgError);
  };

  useEffect(() => {
    setImage(src);
  }, [src]);
  return (
    <>
      <Image
        onLoad={onImageLoad}
        onError={onError}
        src={image}
        className={className}
        width={width}
        height={height}
        alt={alt}
      />
    </>
  );
};

export default CustomImage;
