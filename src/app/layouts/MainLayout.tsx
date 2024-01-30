import { FC, ReactNode } from "react";
import Header from "@/widgets/Header";
import Sidebar from "@/widgets/Sidebar";

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
import { cookies } from "next/headers";
import axios from "@/shared/core/axios";
import { UserProvider } from "../providers/UserProvider";
import { ScrollbarProvider } from "../providers/ScrollbarProvider";

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

async function getUser() {
  const _token = cookies().get("_token")?.value;
  if (_token === undefined) return null;
  const { data } = await axios.get(`/auth_user_info`, {
    headers: {
      Authorization: `Bearer ${_token}`,
    },
  });
  return data.data;
}

const MainLayout: FC<IProps> = async ({ children }) => {
  const user = await getUser();
  return (
    <UserProvider user={user}>
      <div className="container">
        <div className={styles.body}>
          <div className={styles.flex}>
            <Sidebar />
            <div className="flex flex-1">
              <div className={styles.page}>
                <Header />
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
    </UserProvider>
  );
};

export default MainLayout;
