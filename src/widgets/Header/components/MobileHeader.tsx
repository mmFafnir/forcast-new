"use client";
import styles from "../styles/mobile.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTypeDispatch } from "@/shared/hooks/useTypeDispatch";
import {
  closeSidebar,
  closeWidgets,
  openSidebar,
  openWidgets,
} from "@/features/closeSidebar/slice/closeSidebarSlice";
import { closeAllModal, setModal } from "@/shared/UI/Modal/modalSlice";
import { EnumModals } from "@/shared/UI/Modal/EnumModals";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { SportIcon } from "../icons/SportIcon";
import { LeagueIcon } from "../icons/LeagueIcon";
import { IconBell } from "@/features/notification/icons/IconBell";
import { selectActiveNotifyCount } from "@/widgets/Auth/slice/selectors";
import { IconSearch } from "@/features/search";
import { FavoriteIcon } from "../icons/FavoriteIcon";
import { MainIcon } from "../icons/MainIcon";
import { PersonIcon } from "../icons/PersonIcon";

enum EnumMenu {
  MAIN = "/",
  SPORT = "sport",
  LEAGUES = "leagues",
  PROFILE = "profile",
  SETTING = "settings",
}

interface IButton {
  name: string;
  onClick: () => void;
  href?: string;
  className?: string;
  icon: ReactNode;
}

export const MobileHeader = () => {
  const pathname = usePathname();

  const notifyCountActive = useTypeSelector(selectActiveNotifyCount);
  const { auth } = useTypeSelector((state) => state.auth);
  const { modal } = useTypeSelector((state) => state.modal);
  const { activeSidebar, activeWidgets } = useTypeSelector(
    (state) => state.closeSidebar
  );
  const dispatch = useTypeDispatch();
  const [isActive, setIsActive] = useState<string | null>("/");
  const [isShow, setIsShow] = useState<boolean>(false);

  const buttons = useMemo((): IButton[] => {
    const main = {
      name: "/",
      href: "/",
      icon: <MainIcon />,
      onClick: () => {
        callbackClose();
        setIsActive(checkPathname());
      },
    };
    let buttons = [
      {
        name: "sport",
        icon: <SportIcon />,
        onClick: () => {
          setIsActive(!activeSidebar ? EnumMenu.SPORT : checkPathname());
          !activeSidebar ? dispatch(closeSidebar()) : dispatch(openSidebar());
        },
      },
      {
        name: "search",
        icon: <IconSearch />,
        onClick: () => {
          setIsActive(modal !== EnumModals.SEARCH ? "search" : checkPathname());
          modal === EnumModals.SEARCH
            ? dispatch(closeAllModal())
            : dispatch(setModal(EnumModals.SEARCH));
        },
      },
      {
        name: "leagues",
        icon: <LeagueIcon />,
        onClick: () => {
          setIsActive(!activeWidgets ? EnumMenu.LEAGUES : checkPathname());
          activeWidgets ? dispatch(closeWidgets()) : dispatch(openWidgets());
        },
      },
      {
        name: "favorite",
        icon: <FavoriteIcon />,
        href: "/favorites",
        onClick: () => {
          callbackClose();
          setIsActive(checkPathname());
        },
      },
      {
        name: "profile",
        icon: <PersonIcon />,
        onClick: () => {
          auth ? onToggleUserModal() : onToggleAuthModal();
        },
      },

      {
        name: "notify",
        className: "notify-modal",
        icon: (
          <p className={styles.notify}>
            {notifyCountActive > 0 && <span></span>}
            <IconBell />
          </p>
        ),
        onClick: () => {
          if (modal === EnumModals.NOTIFICATION) {
            setIsActive(checkPathname());
            dispatch(closeAllModal());
            return;
          }
          setIsActive("notify");
          dispatch(setModal(EnumModals.NOTIFICATION));
        },
      },
    ];

    if (!auth) {
      buttons = buttons.filter((btn) => !"notify, favorite".includes(btn.name));
    }

    buttons.splice(Math.floor(buttons.length / 2), 0, main);
    return buttons;
  }, [auth, activeSidebar, modal, activeWidgets, notifyCountActive]);

  const onToggleUserModal = () => {
    setIsActive(
      modal !== EnumModals.SETTINGS ? EnumMenu.PROFILE : checkPathname()
    );
    if (modal === EnumModals.SETTINGS) return;
    dispatch(setModal(EnumModals.SETTINGS));
  };

  const onToggleAuthModal = () => {
    setIsActive(
      modal !== EnumModals.LOGIN ? EnumMenu.PROFILE : checkPathname()
    );
    if (modal === EnumModals.LOGIN) return;
    dispatch(setModal(EnumModals.LOGIN));
  };

  const callbackClose = (callback?: () => void) => {
    dispatch(openSidebar());
    dispatch(closeWidgets());
    dispatch(closeAllModal());
    if (callback) callback();
  };

  const checkPathname = () => {
    if (pathname == "/favorites") return "favorite";
    if (pathname === "/") return "/";
    return null;
  };

  useEffect(() => {
    if (modal || activeSidebar || activeWidgets) return;
    if (
      isActive === EnumMenu.PROFILE ||
      isActive === EnumMenu.SETTING ||
      isActive === EnumModals.SEARCH ||
      isActive !== EnumModals.NOTIFICATION
    ) {
      setIsActive(checkPathname());
    }
  }, [modal]);

  useEffect(() => {
    if (!activeSidebar && !activeWidgets) {
      if (modal) return;
      setIsActive(checkPathname());
    }
  }, [activeSidebar, activeWidgets]);

  useEffect(() => {
    callbackClose(() => setIsActive(checkPathname()));
  }, [pathname]);

  useEffect(() => {
    setIsShow(true);
  }, []);

  return (
    <>
      <div className={`${styles.body} ${isShow ? styles.show : ""}`}>
        {buttons.map((btn) => {
          if (btn.href)
            return (
              <Link
                key={btn.name}
                onClick={() => callbackClose(btn.onClick)}
                href={btn.href}
                className={isActive == btn.name ? styles.active : ""}
              >
                {btn.icon}
              </Link>
            );
          return (
            <button
              key={btn.name}
              className={`${isActive == btn.name ? styles.active : ""} ${
                btn.className || ""
              }`}
              onClick={() => callbackClose(btn.onClick)}
            >
              {btn.icon}
            </button>
          );
        })}
      </div>
    </>
  );
};
