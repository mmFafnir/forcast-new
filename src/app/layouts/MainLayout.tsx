import { FC, ReactNode, use } from "react";
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
import { ModalPremium } from "@/widgets/Premium";
import { TelegramProvider } from "../providers/TelegramProvider";

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
  try {
    const { data } = await axios.get(`/auth_user_info`, {
      headers: {
        Authorization: `Bearer ${_token}`,
      },
    });
    return { ...data.data, favorite_count: data.favorite_count };
  } catch (error) {
    return null;
  }
}

const MainLayout: FC<IProps> = async ({ children }) => {
  const user = await getUser();
  return (
    <UserProvider user={user}>
      <TelegramProvider user={user}>
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
                      classNameTabs="sidebar-tabs"
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
          <ModalPremium />
        </div>
      </TelegramProvider>
    </UserProvider>
  );
};

export default MainLayout;
