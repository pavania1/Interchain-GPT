"use client";
import { useState, useEffect } from "react";
import MainPage from "@/components/MainPage";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import { Tooltip } from "@mui/material";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../redux/store";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const setSession = (sessionId) => {
    setSessionId(sessionId);
  };

  // useEffect(() => {
  //   let sessionId = window.location.href;
  //   console.log(sessionId, "sessionId");
  //   const p = sessionId.split("=")[1];
  //   const oldMessages = sessionData[p];
  //   if (oldMessages) {
  //     console.log(oldMessages, "----->old");
  //     setData([...oldMessages]);
  //   }
  // }, [window.location.href]);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="flex h-full relative">
          <div className="flex justify-between lg:hidden md:hidden sm:flex xs:flex absolute p-4 w-full">
            <div onClick={toggleSidebar}>
              <Image
                src="/hamburger-icon.jpg"
                width={24}
                height={24}
                alt="Hamburger-Icon"
              />
            </div>
            <div className="flex space-x-1 hover:bg-zinc-800 p-2 rounded-xl w-[15%]">
              <div className="font-bold">InterChainGPT</div>
              <p className="text-[rgb(224,215,215)] font-bold">3.5</p>
            </div>
            <div>
              <Tooltip title="New Chat" placement="right-start">
                <Image
                  src="/sign-icon.svg"
                  width={20}
                  height={20}
                  alt="Note-Icon"
                />
              </Tooltip>
            </div>
          </div>
          <Sidebar setSession={setSession} sidebarOPen={sidebarOpen} />
          <MainPage sessionId={sessionId} />
        </div>
      </PersistGate>
    </Provider>
  );
}
