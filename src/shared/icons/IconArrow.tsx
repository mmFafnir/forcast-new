import React from "react";

const IconArrow = () => {
  return (
    <span className="icon-arrow">
      <svg
        width="16"
        height="9"
        viewBox="0 0 16 9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.1632 1.70711L8.7992 8.07107C8.40868 8.46159 7.77551 8.46159 7.38499 8.07107L1.02103 1.70711C0.630501 1.31658 0.630501 0.683417 1.02103 0.292893C1.41155 -0.0976317 2.04472 -0.0976317 2.43524 0.292893L8.09209 5.94975L13.7489 0.292893C14.1395 -0.0976312 14.7726 -0.0976311 15.1632 0.292893C15.5537 0.683418 15.5537 1.31658 15.1632 1.70711Z"
          fill="white"
        />
      </svg>

      <svg
        width="12"
        height="8"
        viewBox="0 0 12 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: "rotate: 180deg" }}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.5911 2.05535L6.64199 7.00443C6.33829 7.30814 5.8459 7.30814 5.5422 7.00443L0.593115 2.05535C0.289414 1.75165 0.289414 1.25926 0.593115 0.955558C0.896814 0.651858 1.38921 0.651858 1.69291 0.955558L6.09209 5.35474L10.4913 0.955558C10.795 0.651858 11.2874 0.651858 11.5911 0.955558C11.8948 1.25926 11.8948 1.75165 11.5911 2.05535Z"
          fill="white"
        />
      </svg>
    </span>
  );
};

export default IconArrow;
