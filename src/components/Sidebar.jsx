import React from "react";
import Image from "next/image";
import { Tooltip } from "@mui/material";
export default function Sidebar(props) {
  console.log(props.sidebarOPen, "--------");
  return (
    <>
      <div
        className={`w-[320px] md:block lg:block  ${
          props.sidebarOPen ? "sm:block xs:block" : "sm:hidden xs:hidden"
        }  p-4 min-h-screen bg-black`}
      >
        <div className="flex justify-between cursor-pointer hover:bg-[rgb(20,20,20)] p-2 rounded-xl">
          <div className="flex space-x-2">
            <Image
              src="/logo.svg"
              width={30}
              height={30}
              alt="Picture of the author"
            />
            <div className="mt-1">New Chat</div>
          </div>
          <Tooltip title="New Chat" placement="right-start">
            <Image
              src="/sign-icon.svg"
              width={20}
              height={20}
              alt="Note-Icon"
            />
          </Tooltip>
        </div>
        <div className="bottom-0 fixed mb-4">
          <div className="flex space-x-2 cursor-pointer hover:bg-[rgb(20,20,20)] p-2 rounded-xl">
            <div className="tooltip">
              <Image
                src="/logo.svg"
                width={35}
                height={35}
                alt="upgrade-icon"
              />
            </div>
            <div>
              <div className="text-[12px]">Upgrade plan</div>
              <div className="text-[12px] text-[rgb(128,124,124)]">
                Get GPT-4, DALL.E, and more
              </div>
            </div>
          </div>
          <div className="flex space-x-2 mt-2 cursor-pointer hover:bg-[rgb(20,20,20)] p-2 rounded-xl">
            <div className="bg-[#84E0C2] rounded-full w-[35px] h-[35px]">
              <p className="relative -translate-x-2/4 -translate-y-2/4 left-2/4 top-2/4 text-center">
                AD
              </p>
            </div>
            <div className="mt-1">Pavani Adina</div>
          </div>
        </div>
      </div>
    </>
  );
}
