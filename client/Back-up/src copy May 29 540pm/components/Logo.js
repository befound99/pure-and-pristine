import React from "react";

const Logo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 200"
    className="h-8 w-8"
  >
    {/* Cat body */}
    <circle cx="100" cy="100" r="80" fill="#0c131e" />

    {/* Cat head */}
    <circle cx="100" cy="60" r="50" fill="#0c131e" />

    {/* Cat ears */}
    <polygon points="50,60 100,20 150,60" fill="#0c131e" />

    {/* Cat eyes */}
    <circle cx="80" cy="50" r="10" fill="#05aab3" />
    <circle cx="120" cy="50" r="10" fill="#05aab3" />

    {/* Cat mouth */}
    <path
      d="M80 80 Q100 90 120 80"
      fill="none"
      stroke="#05aab3"
      strokeWidth="4"
    />

    {/* Slogan */}
    <text
      x="100"
      y="150"
      fill="#05aab3"
      fontFamily="Arial"
      fontSize="24"
      textAnchor="middle"
    >
      PurPri
    </text>
  </svg>
);

export default Logo;
