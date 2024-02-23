"use client";
import Image from "next/image";
import styles from "../styles/mobile.module.scss";
import IconPerson from "@/shared/icons/IconPerson";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTypeDispatch } from "@/shared/hooks/useTypeDispatch";
import {
  closeSidebar,
  closeWidgets,
  openSidebar,
  openWidgets,
  toggleSidebar,
  toggleWidgets,
} from "@/features/closeSidebar/slice/closeSidebarSlice";
import { closeAllModal, setModal } from "@/shared/UI/Modal/modalSlice";
import { EnumModals } from "@/shared/UI/Modal/EnumModals";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import { useEffect, useState } from "react";

enum EnumMenu {
  MAIN = "/",
  SPORT = "sport",
  LEAGUES = "leagues",
  PROFILE = "profile",
  SETTING = "settings",
}

export const MobileHeader = () => {
  const pathname = usePathname();

  const { auth } = useTypeSelector((state) => state.auth);
  const { modal } = useTypeSelector((state) => state.modal);
  const { activeSidebar, activeWidgets } = useTypeSelector(
    (state) => state.closeSidebar
  );
  const dispatch = useTypeDispatch();
  const [isActive, setIsActive] = useState<EnumMenu | null>(EnumMenu.MAIN);

  const callbackClose = (callback?: () => void) => {
    dispatch(openSidebar());
    dispatch(closeWidgets());
    dispatch(closeAllModal());
    if (callback) callback();
  };

  const checkPathnameMain = () => (pathname === "/" ? EnumMenu.MAIN : null);

  const onToggleSidebar = () => {
    setIsActive(!activeSidebar ? EnumMenu.SPORT : checkPathnameMain());
    !activeSidebar ? dispatch(closeSidebar()) : dispatch(openSidebar());
  };

  const onToggleWidgets = () => {
    setIsActive(!activeWidgets ? EnumMenu.LEAGUES : checkPathnameMain());
    activeWidgets ? dispatch(closeWidgets()) : dispatch(openWidgets());
  };

  const onToggleAuthModal = () => {
    setIsActive(
      modal !== EnumModals.LOGIN ? EnumMenu.PROFILE : checkPathnameMain()
    );
    if (modal === EnumModals.LOGIN) return;
    dispatch(setModal(EnumModals.LOGIN));
  };

  const onToggleUserModal = () => {
    setIsActive(
      modal !== EnumModals.SETTINGS ? EnumMenu.PROFILE : checkPathnameMain()
    );
    if (modal === EnumModals.SETTINGS) return;
    dispatch(setModal(EnumModals.SETTINGS));
  };

  const onToggleSettingsModal = () => {
    setIsActive(
      modal !== EnumModals.SETTINGS_MOBILE
        ? EnumMenu.SETTING
        : checkPathnameMain()
    );
    if (modal === EnumModals.SETTINGS_MOBILE) return;
    dispatch(setModal(EnumModals.SETTINGS_MOBILE));
  };

  const onClickMain = () => {
    callbackClose();
    setIsActive(checkPathnameMain());
  };

  useEffect(() => {
    if (modal) return;
    if (isActive === EnumMenu.PROFILE || isActive === EnumMenu.SETTING) {
      setIsActive(checkPathnameMain());
    }
  }, [modal]);

  useEffect(() => {
    if (pathname === "/")
      return callbackClose(() => setIsActive(EnumMenu.MAIN));

    if (pathname !== "/") setIsActive(null);
    callbackClose();
  }, [pathname]);

  return (
    <>
      <div className={styles.body}>
        <button
          className={isActive == EnumMenu.SPORT ? styles.active : ""}
          onClick={() => callbackClose(onToggleSidebar)}
        >
          <svg width="18" height="19" viewBox="0 0 18 19" fill="none">
            <path
              d="M9 0.674072C4.15457 0.674072 0.212402 4.61624 0.212402 9.46167C0.212402 14.3071 4.15457 18.2493 9 18.2493C13.8454 18.2493 17.7876 14.3071 17.7876 9.46167C17.7876 4.61624 13.8454 0.674072 9 0.674072ZM15.0415 13.5175H13.131C13.0718 13.5173 13.0137 13.5017 12.9625 13.472C12.9112 13.4424 12.8687 13.3998 12.8391 13.3485L12.1572 12.1791C12.1123 12.1026 12.0993 12.0116 12.1209 11.9256L12.7487 9.39407C12.7613 9.34307 12.7856 9.2957 12.8197 9.25573C12.8538 9.21576 12.8967 9.18429 12.9451 9.16382L14.1323 8.66107C14.1903 8.63647 14.254 8.62858 14.3163 8.63828C14.3786 8.64798 14.4369 8.6749 14.4846 8.71599L16.2434 10.2293C16.2868 10.2666 16.32 10.3144 16.3398 10.368C16.3597 10.4217 16.3656 10.4795 16.3571 10.536C16.2114 11.5353 15.8623 12.4941 15.3313 13.3531C15.3013 13.4032 15.2588 13.4447 15.208 13.4735C15.1573 13.5023 15.0999 13.5175 15.0415 13.5175ZM3.86771 8.66445L5.05488 9.1672C5.10326 9.18767 5.14621 9.21914 5.18032 9.25911C5.21442 9.29908 5.23873 9.34645 5.25133 9.39745L5.87914 11.929C5.90074 12.0149 5.88769 12.106 5.8428 12.1824L5.16092 13.3485C5.13132 13.3998 5.08877 13.4424 5.03754 13.472C4.98631 13.5017 4.92818 13.5173 4.86898 13.5175H2.95853C2.90075 13.5175 2.84392 13.5027 2.79348 13.4746C2.74303 13.4464 2.70066 13.4057 2.67039 13.3565C2.1394 12.4975 1.79027 11.5387 1.64461 10.5394C1.63605 10.4829 1.64198 10.425 1.66186 10.3714C1.68174 10.3177 1.71491 10.27 1.75826 10.2327L3.51705 8.71937C3.56465 8.6786 3.62266 8.65188 3.68459 8.64218C3.74651 8.63248 3.80991 8.64019 3.86771 8.66445ZM14.7229 4.97873L13.9595 7.14943C13.9442 7.1938 13.9197 7.23448 13.8878 7.26888C13.8559 7.30329 13.8171 7.33066 13.774 7.34927L12.5243 7.87863C12.467 7.9029 12.404 7.91084 12.3425 7.9016C12.2809 7.89235 12.2231 7.86628 12.1754 7.82625L9.79849 5.83256C9.76051 5.80114 9.72986 5.76179 9.7087 5.71727C9.68753 5.67275 9.67636 5.62414 9.67597 5.57485V4.15616C9.676 4.10057 9.68974 4.04585 9.71598 3.99684C9.74222 3.94784 9.78013 3.90606 9.82637 3.87521L11.6359 2.66945C11.6831 2.63793 11.7375 2.61881 11.794 2.61387C11.8506 2.60892 11.9075 2.6183 11.9595 2.64114C13.0007 3.09525 13.9246 3.78069 14.6612 4.64539C14.7 4.6906 14.7261 4.74523 14.7369 4.80377C14.7477 4.8623 14.7429 4.92266 14.7229 4.97873ZM6.36372 2.66945L8.17363 3.87521C8.21987 3.90606 8.25778 3.94784 8.28402 3.99684C8.31026 4.04585 8.324 4.10057 8.32403 4.15616V5.57485C8.32403 5.62422 8.31321 5.67299 8.29234 5.71774C8.27146 5.76248 8.24104 5.80211 8.2032 5.83383L5.82633 7.82752C5.77863 7.86755 5.7208 7.89362 5.65922 7.90287C5.59764 7.91211 5.5347 7.90416 5.47736 7.8799L4.22597 7.34927C4.1826 7.3309 4.14355 7.30368 4.11132 7.26934C4.07909 7.235 4.05439 7.1943 4.03881 7.14986L3.27539 4.97915C3.25555 4.92288 3.25096 4.86235 3.26209 4.80373C3.27322 4.74511 3.29967 4.69048 3.33876 4.64539C4.07578 3.77982 5.00052 3.09377 6.04264 2.63945C6.09442 2.6173 6.15091 2.60845 6.20699 2.61369C6.26306 2.61893 6.31694 2.63809 6.36372 2.66945ZM7.09504 16.504L6.26148 14.4047C6.24242 14.357 6.23449 14.3055 6.2383 14.2543C6.2421 14.203 6.25755 14.1533 6.28345 14.109L6.92435 13.0105C6.95395 12.9592 6.9965 12.9166 7.04773 12.887C7.09896 12.8573 7.15709 12.8417 7.21629 12.8415H10.7837C10.8429 12.8417 10.901 12.8573 10.9523 12.887C11.0035 12.9166 11.046 12.9592 11.0756 13.0105L11.717 14.109C11.7429 14.1533 11.7585 14.203 11.7623 14.2542C11.7662 14.3055 11.7584 14.3569 11.7394 14.4047L10.9117 16.5032C10.8915 16.5545 10.859 16.6 10.8171 16.6359C10.7752 16.6718 10.7251 16.6968 10.6713 16.7089C9.57308 16.961 8.43199 16.961 7.33374 16.7089C7.28032 16.6967 7.23068 16.6716 7.18909 16.6359C7.14751 16.6002 7.11523 16.5549 7.09504 16.504Z"
              fill="white"
            />
          </svg>
        </button>

        <button
          className={isActive === EnumMenu.LEAGUES ? styles.active : ""}
          onClick={() => callbackClose(onToggleWidgets)}
        >
          <Image
            style={{ borderRadius: "50%" }}
            src={"/country-icon.svg"}
            width={200}
            height={200}
            alt="icon"
          />
        </button>

        <Link
          onClick={onClickMain}
          href={"/"}
          className={isActive === EnumMenu.MAIN ? styles.active : ""}
        >
          <Image src={"/logo-mobile.svg"} width={200} height={200} alt="icon" />
        </Link>

        <button
          className={isActive === EnumMenu.PROFILE ? styles.active : ""}
          onClick={() =>
            callbackClose(auth ? onToggleUserModal : onToggleAuthModal)
          }
        >
          <IconPerson />
        </button>

        <button
          className={isActive === EnumMenu.SETTING ? styles.active : ""}
          onClick={() => callbackClose(onToggleSettingsModal)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
          >
            <path
              d="M10.0023 13.9617C9.07402 13.9617 8.18378 13.5929 7.52741 12.9365C6.87103 12.2802 6.50228 11.3899 6.50228 10.4617C6.50228 9.53341 6.87103 8.64318 7.52741 7.9868C8.18378 7.33042 9.07402 6.96167 10.0023 6.96167C10.9305 6.96167 11.8208 7.33042 12.4772 7.9868C13.1335 8.64318 13.5023 9.53341 13.5023 10.4617C13.5023 11.3899 13.1335 12.2802 12.4772 12.9365C11.8208 13.5929 10.9305 13.9617 10.0023 13.9617ZM17.4323 11.4317C17.4723 11.1117 17.5023 10.7917 17.5023 10.4617C17.5023 10.1317 17.4723 9.80167 17.4323 9.46167L19.5423 7.83167C19.7323 7.68167 19.7823 7.41167 19.6623 7.19167L17.6623 3.73167C17.5423 3.51167 17.2723 3.42167 17.0523 3.51167L14.5623 4.51167C14.0423 4.12167 13.5023 3.78167 12.8723 3.53167L12.5023 0.881672C12.482 0.763889 12.4206 0.657099 12.3291 0.580223C12.2376 0.503348 12.1218 0.46135 12.0023 0.461672H8.00228C7.75228 0.461672 7.54228 0.641672 7.50228 0.881672L7.13228 3.53167C6.50228 3.78167 5.96228 4.12167 5.44228 4.51167L2.95228 3.51167C2.73228 3.42167 2.46228 3.51167 2.34228 3.73167L0.342281 7.19167C0.212281 7.41167 0.272281 7.68167 0.462281 7.83167L2.57228 9.46167C2.53228 9.80167 2.50228 10.1317 2.50228 10.4617C2.50228 10.7917 2.53228 11.1117 2.57228 11.4317L0.462281 13.0917C0.272281 13.2417 0.212281 13.5117 0.342281 13.7317L2.34228 17.1917C2.46228 17.4117 2.73228 17.4917 2.95228 17.4117L5.44228 16.4017C5.96228 16.8017 6.50228 17.1417 7.13228 17.3917L7.50228 20.0417C7.54228 20.2817 7.75228 20.4617 8.00228 20.4617H12.0023C12.2523 20.4617 12.4623 20.2817 12.5023 20.0417L12.8723 17.3917C13.5023 17.1317 14.0423 16.8017 14.5623 16.4017L17.0523 17.4117C17.2723 17.4917 17.5423 17.4117 17.6623 17.1917L19.6623 13.7317C19.7823 13.5117 19.7323 13.2417 19.5423 13.0917L17.4323 11.4317Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
    </>
  );
};

// const onCloseModal = () => dispatch(closeAllModal());
