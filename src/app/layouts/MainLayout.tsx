import Header from "@/widgets/Header";
import Sidebar from "@/widgets/Sidebar";
import React, { FC, ReactNode } from "react";

import styles from "../styles/mainLayout.module.scss";
import Footer from "@/widgets/Footer";
import Widgets from "@/widgets/Widgets";
import Tabs from "@/shared/UI/Tabs";
import RiskWidgets from "@/widgets/Widgets/components/RiskWidgets";
import { LeaguesWidget } from "@/widgets/Widgets/components/LeaguesWidget";
import CountriesWidget from "@/widgets/Widgets/components/CountriesWidget";
import { Toolkit } from "@/features/Toolkit";
import { ModalAuth } from "@/widgets/Auth";
import { ModalSearch } from "@/features/search";

interface IProps {
  children: ReactNode;
}

const tabs = [
  {
    title: "Популярные лиги",
    id: "leagues",
    content: <LeaguesWidget />,
  },
  {
    title: "Страны",
    id: "countries",
    content: <CountriesWidget />,
  },
];

const MainLayout: FC<IProps> = ({ children }) => {
  return (
    <div className="container">
      <div className={styles.body}>
        <Header />
        <div className={styles.flex}>
          <Sidebar />
          <div className="flex flex-1">
            <div className={styles.page}>
              {children}
              <Footer />
            </div>
            <Widgets
              widgets={[
                <Tabs
                  key={1}
                  minHeight="350px"
                  maxHeight="350px"
                  tabs={tabs}
                  classNameBody="adaptive-mac"
                />,
                <RiskWidgets key={2} />,
              ]}
            />
          </div>
        </div>
      </div>
      <Toolkit />
      <ModalAuth />
      <ModalSearch />
    </div>
  );
};

export default MainLayout;
