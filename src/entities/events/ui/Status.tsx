import React, { FC } from "react";

interface IProps {
  played: "0" | "1" | "2";
}

export const Status: FC<IProps> = ({ played }) => {
  if (played == "1")
    return (
      <svg width="30" height="31" viewBox="0 0 30 31" fill="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15 30.7109C23.2845 30.7109 30 23.9954 30 15.7109C30 7.42644 23.2845 0.710938 15 0.710938C6.7155 0.710938 0 7.42644 0 15.7109C0 23.9954 6.7155 30.7109 15 30.7109ZM23.0565 10.9634C23.1267 10.8911 23.1816 10.8055 23.2179 10.7115C23.2542 10.6175 23.2712 10.5172 23.2679 10.4165C23.2647 10.3158 23.2411 10.2168 23.1987 10.1254C23.1563 10.034 23.0959 9.95211 23.0212 9.88456C22.9464 9.81702 22.8588 9.76523 22.7636 9.73228C22.6684 9.69934 22.5675 9.68591 22.467 9.6928C22.3665 9.6997 22.2684 9.72677 22.1786 9.77241C22.0888 9.81805 22.0091 9.88132 21.9442 9.95844L12.96 19.8862L8.0175 15.1679C7.87369 15.0305 7.68116 14.9558 7.48228 14.9603C7.2834 14.9648 7.09445 15.0481 6.957 15.1919C6.81955 15.3358 6.74486 15.5283 6.74936 15.7272C6.75386 15.926 6.83719 16.115 6.981 16.2524L12.4815 21.5024L13.0387 22.0349L13.5555 21.4634L23.0565 10.9634Z"
          fill="#70A756"
        />
      </svg>
    );
  return (
    <svg width="30" height="31" viewBox="0 0 30 31" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M30 15.7109C30 23.9954 23.2845 30.7109 15 30.7109C6.7155 30.7109 0 23.9954 0 15.7109C0 7.42644 6.7155 0.710938 15 0.710938C23.2845 0.710938 30 7.42644 30 15.7109ZM9.1665 21.5444C9.0259 21.4038 8.94691 21.2131 8.94691 21.0142C8.94691 20.8153 9.0259 20.6246 9.1665 20.4839L13.9395 15.7109L9.1665 10.9379C9.02988 10.7965 8.95429 10.607 8.95599 10.4104C8.9577 10.2137 9.03658 10.0256 9.17564 9.88657C9.31469 9.74752 9.5028 9.66864 9.69945 9.66693C9.8961 9.66522 10.0855 9.74082 10.227 9.87744L15 14.6504L19.773 9.87744C19.9145 9.74082 20.1039 9.66522 20.3006 9.66693C20.4972 9.66864 20.6853 9.74752 20.8244 9.88657C20.9634 10.0256 21.0423 10.2137 21.044 10.4104C21.0457 10.607 20.9701 10.7965 20.8335 10.9379L16.0605 15.7109L20.8335 20.4839C20.9701 20.6254 21.0457 20.8148 21.044 21.0115C21.0423 21.2081 20.9634 21.3962 20.8244 21.5353C20.6853 21.6744 20.4972 21.7532 20.3006 21.7549C20.1039 21.7567 19.9145 21.6811 19.773 21.5444L15 16.7714L10.227 21.5444C10.0864 21.685 9.89562 21.764 9.69675 21.764C9.49788 21.764 9.30715 21.685 9.1665 21.5444Z"
        fill={played == "0" ? "#6c6d71" : "#CB5353"}
      />
    </svg>
  );
};
