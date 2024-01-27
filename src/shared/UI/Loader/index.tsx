import styles from "./styles.module.scss";
import spin from "./loader.svg";
import Image from "next/image";

const Loader = () => {
  return (
    <p className={"loader-spin"}>
      <Image
        className={styles.loader}
        src={spin}
        width={400}
        height={400}
        alt="loader icon"
      />
    </p>
  );
};

export default Loader;
