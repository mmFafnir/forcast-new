import Header from "@/widgets/Header";
import Sidebar from "@/widgets/Sidebar";
import React, { FC, ReactNode } from "react";

import styles from "../styles/mainLayout.module.scss";
import Footer from "@/widgets/Footer";

interface IProps {
  children: ReactNode;
}
const MainLayout: FC<IProps> = ({ children }) => {
  return (
    <div className="container">
      <div className={styles.body}>
        <Header />
        <div className={styles.flex}>
          <Sidebar />
          <div className={styles.page}>
            {children}
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
