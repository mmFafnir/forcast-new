"use client";
import Link from "next/link";
import IconCup from "@/shared/icons/IconCup";

import bgBtn from "../image/bg-btn.svg";
import Button from "@/shared/UI/Button";
import styles from "../styles/premium.module.scss";
import { useTypeSelector } from "@/shared/hooks/useTypeSelector";
import { useTypeDispatch } from "@/shared/hooks/useTypeDispatch";
import { EnumModals } from "@/shared/UI/Modal/EnumModals";
import { setModal } from "@/shared/UI/Modal/modalSlice";

const EventPremium = () => {
  const dispatch = useTypeDispatch();
  const { auth } = useTypeSelector((state) => state.auth);

  const onOpenPrem = () => dispatch(setModal(EnumModals.PREMIUM));
  const onOpenLogin = () => dispatch(setModal(EnumModals.LOGIN));

  return (
    <div className={styles.premium}>
      <div className={styles.cup}>
        <IconCup />
      </div>
      <h3>Коэффициент 1.59</h3>
      <Button
        onClick={auth ? onOpenPrem : onOpenLogin}
        type="gradient"
        className={styles.btn}
        style={{ backgroundImage: `url(${bgBtn.src})` }}
      >
        <svg width="13" height="18" viewBox="0 0 13 18" fill="none">
          <path
            d="M10.9145 7.07269V4.74727C10.9378 3.56928 10.4936 2.43001 9.67897 1.57876C8.86437 0.727504 7.74575 0.233584 6.56787 0.205078C5.39 0.233584 4.27137 0.727504 3.45678 1.57876C2.64218 2.43001 2.19795 3.56928 2.22128 4.74727V7.07269H0.591309V16.3092C0.591309 16.5974 0.705794 16.8738 0.90958 17.0776C1.11337 17.2814 1.38976 17.3958 1.67796 17.3958H11.4578C11.746 17.3958 12.0224 17.2814 12.2262 17.0776C12.4299 16.8738 12.5444 16.5974 12.5444 16.3092V7.07269H10.9145ZM7.1112 12.6309V14.1359H6.02455V12.582C5.76003 12.4459 5.55 12.2234 5.42931 11.9515C5.30862 11.6796 5.28453 11.3746 5.36103 11.0872C5.43753 10.7997 5.61003 10.547 5.8499 10.3711C6.08977 10.1951 6.38259 10.1065 6.67977 10.1198C6.97695 10.1332 7.26062 10.2478 7.48372 10.4446C7.70682 10.6414 7.85592 10.9085 7.9063 11.2017C7.95667 11.4949 7.90528 11.7965 7.76066 12.0564C7.61603 12.3164 7.38687 12.5191 7.1112 12.6309ZM9.82781 7.07269H3.30793V4.74727C3.2845 3.85743 3.61423 2.9945 4.22507 2.34701C4.8359 1.69953 5.67818 1.32013 6.56787 1.29173C7.45756 1.32013 8.29984 1.69953 8.91068 2.34701C9.52151 2.9945 9.85124 3.85743 9.82781 4.74727V7.07269Z"
            fill="white"
          />
        </svg>
        <span>Открыть лучшую ставку</span>
      </Button>
      <Link href={"/"}>Что такое Premium?</Link>
    </div>
  );
};

export default EventPremium;
