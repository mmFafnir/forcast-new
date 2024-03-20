import { FC, ReactNode } from "react";
import { MobileHeader } from "@/widgets/Header";
import Footer from "@/widgets/Footer";
import Widgets from "@/widgets/Widgets";
import RiskWidgets from "@/widgets/Widgets/components/RiskWidgets";
import Sidebar from "@/widgets/Sidebar";
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
import { ModalHistoryShopping } from "@/widgets/Shopping";
import { LeaguesWidget } from "@/widgets/Widgets/components/LeaguesWidget";

import styles from "../styles/mainLayout.module.scss";

interface IProps {
  children: ReactNode;
}

const MainLayout: FC<IProps> = async ({ children }) => {
  const cookiesStore = cookies();

  const _token = cookiesStore.get("_token")?.value;
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
                  <div className={styles.layout}>
                    <div className={styles.page}>
                      {children}
                      <MobileHeader />
                      <Footer />
                    </div>
                    <Widgets
                      widgets={[
                        <LeaguesWidget key={1} />,
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
              <ModalHistoryShopping />
            </div>
          </EventProvider>
        </PusherProvider>
      </TelegramProvider>
    </UserProvider>
  );
};

export default MainLayout;
