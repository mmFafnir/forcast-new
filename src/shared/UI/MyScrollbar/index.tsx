import React, { FC, ReactNode } from "react";
import Scrollbars, { ScrollbarProps } from "react-custom-scrollbars-2";
import styles from "./styles.module.scss";

interface IProps extends ScrollbarProps {
  children: ReactNode;
  scrollSize?: "big" | "small";
}

const MyScrollbar: FC<IProps> = ({
  children,
  scrollSize = "small",
  ...rest
}) => {
  return (
    <Scrollbars
      className={styles[scrollSize]}
      {...rest}
      renderTrackVertical={(opt) => (
        <div className={styles.track} style={opt.style}></div>
      )}
      renderThumbVertical={(opt) => (
        <div className={styles.trumb} style={opt.style}></div>
      )}
    >
      {children}
    </Scrollbars>
  );
};

export default MyScrollbar;
