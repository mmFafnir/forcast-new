import { CSSProperties, FC, ReactNode } from "react";
import styles from "./style.module.scss";

interface IProps {
  children: ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
  stylesWrapper?: CSSProperties;
}
const Modal: FC<IProps> = ({ children, setOpen, open, stylesWrapper = {} }) => {
  const onClose = () => setOpen(false);
  return (
    <div className={`${styles.body} ${open ? styles.show : ""}`}>
      <div className={styles.bg} onClick={onClose}></div>
      <div className={styles.wrapper} style={stylesWrapper}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
