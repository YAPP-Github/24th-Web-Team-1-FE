import React from "react";

interface Props {
  fill: string;
}

export default function ChoiceFillCircleSvg({ fill }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <circle cx="8" cy="8" r="7.5" stroke={fill} />
      <circle cx="8" cy="8" r="3.5" fill={fill} stroke={fill} />
    </svg>
  );
}
