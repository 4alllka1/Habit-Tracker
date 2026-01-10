import React from "react";

interface Props {
  children: React.ReactNode;
  px?: number;
  py?: number;
  hover?: boolean;
  brightBorder?: boolean;
}

function BaseCard({
  children,
  px = 6,
  py = 4,
  hover = true,
  brightBorder = false,
}: Props) {
  let hoverStyle = "";
  if (hover && brightBorder) {
    hoverStyle = "hover:scale-[1.02] hover:border-primary-400";
  } else if (hover) {
    hoverStyle = "hover:scale-[1.02]";
  }
  return (
    <div
      className={`inline-block rounded-2xl border border-2 border-neutral-300 transition-all duration-400 ${hoverStyle}`}
      style={{ padding: `${py * 4}px ${px * 4}px` }}
    >
      {children}
    </div>
  );
}

export default BaseCard;
