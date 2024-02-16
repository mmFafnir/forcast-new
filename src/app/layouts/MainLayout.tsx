import { FC, ReactNode } from "react";
import { MobileHeader } from "@/widgets/Header";
import Sidebar from "@/widgets/Sidebar";

import styles from "../styles/mainLayout.module.scss";
import Footer from "@/widgets/Footer";
import Widgets from "@/widgets/Widgets";
import Tabs from "@/shared/UI/Tabs";
import RiskWidgets from "@/widgets/Widgets/components/RiskWidgets";
import { LeaguesWidget } from "@/widgets/Widgets/components/LeaguesWidget";
import CountriesWidget from "@/widgets/Widgets/components/CountriesWidget";
import { Toolkit } from "@/features/Toolkit";
import { ModalAuth, SettingsAuthModal, getUserInfo } from "@/widgets/Auth";
import { ModalSearch } from "@/features/search";
import { cookies } from "next/headers";
import { UserProvider } from "../providers/UserProvider";
import { ModalPremium } from "@/widgets/Premium";
import { TelegramProvider } from "../providers/TelegramProvider";
import { EventProvider } from "../providers/EventProvider";
import { PusherProvider } from "../providers/PusherProvider/components/Provider";
import { SidebarSettings } from "@/widgets/Settings";
import { ModalPremiumWhy } from "@/widgets/Premium/components/modal/ModalPremiumWhy";

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

const MainLayout: FC<IProps> = async ({ children }) => {
  const _token = cookies().get("_token")?.value;
  const user = await getUserInfo(_token);
  return (
    <UserProvider user={user}>
      <TelegramProvider user={user}>
        <PusherProvider>
          <EventProvider>
            <div className="container">
              <div className={styles.body}>
                <div className={styles.flex}>
                  <Sidebar />
                  <div className="flex flex-1">
                    <div className={styles.page}>
                      {children}
                      <MobileHeader />
                      <Footer />
                    </div>
                    <Widgets
                      widgets={[
                        <Tabs
                          style={{ height: "100%" }}
                          key={1}
                          minHeight="100%"
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
              <ModalPremiumWhy />
              <SettingsAuthModal />
              <SidebarSettings />
            </div>
          </EventProvider>
        </PusherProvider>
      </TelegramProvider>
    </UserProvider>
  );
};

export default MainLayout;
