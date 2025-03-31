import React, { FC, useMemo, useState } from "react";
import { SidebarButtonProps } from "./SidebarButton.types";
import Image from "next/image";
import {
  DefaultAvatarIcon,
  NewChatIcon,
  SmallLogoIcon,
  DeleteIcon,
} from "@/assets/icons";

const SidebarButton: FC<SidebarButtonProps> = ({
  text,
  type = "content",
  className,
  active = false,
  onDelete,
  ...props
}) => {
  const [hover, setHover] = useState(false);
  const icon = useMemo(() => {
    if (type === "action") {
      return (
        <div className="rounded-full min-w-[40px] h-[40px] bg-gray-200 border border-gray-200 flex items-center justify-center">
          <Image src={SmallLogoIcon} alt="Logo" className="w-[20px] h-[20px]" />
        </div>
      );
    }
    if (type === "user") {
      return (
        <div className="rounded-full min-w-[40px] h-[40px] bg-white border border-gray-200 flex items-center justify-center">
          <Image
            src={DefaultAvatarIcon}
            alt="Logo"
            className="w-[40px] h-[40px] rounded-full"
          />
        </div>
      );
    }
    return <></>;
  }, [type]);

  const descriptionIcon = useMemo(() => {
    if (type === "action") {
      return (
        <Image src={NewChatIcon} alt="New chat" className="w-[20px] h-[20px]" />
      );
    }
    if (hover)
      return (
        <div className="flex justify-end items-end w-[20%] z-30 ">
          <div
            className="hover:bg-red-200 rounded-[4px] p-[2px]"
            onClick={() => {
              console.log("delete");

              if (onDelete) onDelete();
            }}
          >
            <Image
              src={DeleteIcon}
              alt="Delete"
              className="w-[20px] h-[20px]"
            />
          </div>
        </div>
      );
    return <></>;
  }, [type, hover]);

  return (
    <div
      className={`flex flex-row items-center cursor-pointer p-[10px] z-10 hover:bg-gray-200 rounded-xl justify-between ${className} ${
        active && "bg-gray-200"
      }`}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      {...props}
    >
      <div className="flex flex-row items-center gap-3 whitespace-nowrap w-[70%] overflow-hidden">
        {icon}
        <span className="font-sans font-medium text-black text-base text-ellipsis w-full overflow-hidden ">
          {text}
        </span>
      </div>
      {descriptionIcon}
    </div>
  );
};

export default SidebarButton;
