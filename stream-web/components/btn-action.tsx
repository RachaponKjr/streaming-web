import React from "react";

const ActionButton = ({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) => (
  <button className="flex items-center gap-2 px-4 h-max cursor-pointer text-nowrap w-max py-2.5 bg-[#1f212d] text-white rounded-xl hover:bg-[#2a2d3e] transition border border-gray-800 font-medium text-sm">
    {icon}
    <span>{text}</span>
  </button>
);

export default ActionButton;
