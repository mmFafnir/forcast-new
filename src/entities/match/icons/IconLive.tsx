import React from "react";

export const IconLive = () => {
  return (
    <svg width="23" height="23" viewBox="0 0 23 23" fill="none">
      <g filter="url(#filter0_d_2218_12674)">
        <circle
          cx="11.3403"
          cy="11.5"
          r="6.36621"
          stroke="#EB6C6C"
          shapeRendering="crispEdges"
        />
      </g>
      <circle cx="11.3402" cy="11.4999" r="2.4657" fill="#EB6C6C" />
      <defs>
        <filter
          id="filter0_d_2218_12674"
          x="0.474121"
          y="0.633789"
          width="21.7324"
          height="21.7324"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_2218_12674"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_2218_12674"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};
