import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@mui/material";
import Image from "next/image";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
const Popup = ({ open, close, data }) => {
  const sessionList = useSelector((state) => state.session.sessions);
  const [createdAt, setCreatedAt] = useState("");
  useEffect(() => {
    const sessionId = window.location.href.split("sessionId=")[1];

    const currentSession = sessionList.find(
      (item) => item.sessionId == sessionId
    );
    setCreatedAt(currentSession.createdAt);
  }, [sessionList.length]);

  return (
    <Dialog
      open={open}
      maxWidth="lg"
      PaperProps={{
        sx: {
          borderRadius: 4,
        },
      }}
    >
      <DialogContent sx={{ padding: 0 }}>
        <div className="popup-grid">
          <div className="justify-between flex">
            <div className="font-bold text-white pb-6">Share link to Chat</div>
            <div onClick={close} className="cursor-pointer">
              <Image src="/close.png" width={24} height={24} alt="Close-Icon" />
            </div>
          </div>
          <div className="popup-v-line"></div>
          <div className="text-white pt-6 pb-6">
            You have shared this chat before. If you want to update the shared
            chat content, delete this link and create a new shared link.
          </div>
          <div className="border border-zinc-600 rounded-xl ">
            <div className="h-52 overflow-y-scroll p-4">
              {data.map((item, index) => {
                return (
                  <div className="my-3 text-white" key={index}>
                    <span style={{ fontWeight: "bold", fontSize: "18px" }}>
                      {item.type}:
                    </span>
                    <br />
                    {item.message}
                  </div>
                );
              })}
            </div>
            <div className="rounded-b-lg p-4 bg-[rgb(71,70,70)]">
              <div className="justify-between flex">
                <div>
                  <p className="text-white">{data[0]?.message}</p>
                  <p className="text-white">
                    {" "}
                    {moment.unix(createdAt / 1000).format("MMM DD YYYY")}
                  </p>
                </div>
                <div className="items-center justify-center flex">
                  <Image
                    src="/more.png"
                    width={32}
                    height={32}
                    alt="More-Icon"
                    className="cursor-pointer h-6 w-6"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="pt-4 justify-end flex">
            <button className="bg-[#99EDC3] text-white p-2 rounded-xl cursor-pointer">
              Copy Link
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default Popup;
