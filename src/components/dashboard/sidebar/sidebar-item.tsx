import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface Props {
  data: {
    title: string;
    href: string;
    icon: React.ReactNode;
  };
  selected: boolean;
  notifications?: number;
}

const SidebarItem = ({ data, selected, notifications }: Props) => {
  return (
    <li className="cursor-pointer my-[5px]">
      <Link
        href={data.href}
        className={cn(
          "flex items-center justify-between group rounded-lg hover:bg-[#1D1D1D]",
          selected ? "bg-[#1D1D1D]" : ""
        )}
      >
        <div className="flex items-center gap-2 transition-all p-[5px] cursor-pointer">
          {data.icon}
          <p
            className={cn(
              "text-[14px] font-medium group-hover:text-[#9D9D9D] transition-all truncate w-32  ",
              selected ? "text-[#9D9D9D]" : "text-[#545454]"
            )}
          >
            {data.title}
          </p>
        </div>
        {notifications && (
          <div className="bg-[#FF4D4D] rounded-full text-white text-[10px] px-[5px] py-[2px]">
            {notifications}
          </div>
        )}
      </Link>
    </li>
  );
};

export default SidebarItem;
