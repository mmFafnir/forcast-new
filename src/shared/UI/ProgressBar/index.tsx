"use client";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";

const ProgressBar = () => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 10));
    }, 600);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.body}>
      <div className={styles.progress}>ProgressBar</div>
    </div>
  );
};

export default ProgressBar;
