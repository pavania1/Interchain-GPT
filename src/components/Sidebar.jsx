import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Tooltip } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { deleteSession } from "@/redux/actions/sessionActions";
import moment from "moment";
import Popup from "./Popup";
import { updateSession } from "@/redux/actions/sessionActions";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";

export default function Sidebar(props) {
  const sessionList = useSelector((state) => state.session.sessions);
  const sessionData = useSelector((state) => state.session.sessionData);
  const [data, setData] = useState([]);
  const [shareData, setShareData] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [editSessionId, setEditSessionId] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const arrayOfDates = groupDataByDate(sessionList);
    setData(arrayOfDates);
    console.log(arrayOfDates, "arrayOfDates-->");
  }, [JSON.stringify(sessionList)]);

  const handleOnClick = (sessionId) => {
    router.push(`?sessionId=${sessionId}`);
    props.setSession(sessionId);
  };

  const handleDelete = (sessionId) => {
    dispatch(deleteSession(sessionId));
  };

  const handleShareClick = (item) => {
    setShareData(sessionData[item.sessionId]);
    setIsPopupOpen(true);
  };

  const handleRename = (sessionId) => {
    setIsRenaming(true);
    setEditSessionId(sessionId);
    setNewTitle("");
  };

  useEffect(() => {
    const arrayOfDates = groupDataByDate(sessionList);
    setData(arrayOfDates);
    console.log(arrayOfDates, "......arrayofDates");
  }, []);

  return (
    <>
      <div
        className={`w-[320px] md:block lg:block  ${
          props.sidebarOpen ? "sm:block xs:block" : "sm:hidden xs:hidden"
        }  p-4 min-h-screen bg-black`}
      >
        <div className="flex justify-between cursor-pointer hover:bg-[rgb(20,20,20)] p-2 rounded-xl">
          <div className="flex space-x-2">
            <Image
              src="/logo.svg"
              width={28}
              height={28}
              alt="Logo"
            />
            <div className="mt-1 text-white text-sm font-medium">New Chat</div>
          </div>
          <Tooltip title="New Chat" placement="right-start">
            <div
              onClick={() => {
                props.setSession("");
                router.push("/");
              }}
            >
              <Image
                src="/sign-icon.svg"
                width={20}
                height={20}
                alt="Note-Icon"
              />
            </div>
          </Tooltip>
        </div>
        {isPopupOpen && (
          <Popup
            data={shareData}
            open
            close={() => {
              setIsPopupOpen(false);
            }}
          />
        )}
        <div className="overflow-y-scroll max-h-[80vh]">
          {Object.keys(data).map((item, index) => {
            if (data[item].length === 0) {
              return null;
            }
            return (
              <div
                className="cursor-pointer  flex flex-col justify-between mt-6"
                key={index}
              >
                <p>{item}</p>

                {data[item].map((msg, msgId) =>
                  isRenaming && msg.sessionId === editSessionId ? (
                    <input
                      key={msgId}
                      type="text"
                      value={newTitle}
                      onChange={(e) => {
                        setNewTitle(e.target.value);
                        dispatch(updateSession(editSessionId, e.target.value));
                      }}
                      onBlur={() => {
                        setEditSessionId("");
                      }}
                      onKeyUp={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (e.key === "Enter") {
                          setEditSessionId("");
                        }
                      }}
                      placeholder="Enter new title"
                      className="text-black"
                    />
                  ) : (
                    <div key={msgId} className="flex hover:bg-[rgb(20,20,20)] p-2 rounded-xl ">
                      <div
                       
                        onClick={() => handleOnClick(msg.sessionId)}
                      >
                        {msg.title
                          ? msg.title
                          : sessionData[msg.sessionId]
                          ? sessionData[msg.sessionId][0].message
                          : ""}
                      </div>
                      <Popover placement="bottom" offset={20} showArrow>
                        <PopoverTrigger>
                          <Button>
                            <Image
                              src="/more.png"
                              width={24}
                              height={24}
                              alt="more-icon"
                              className="w-6 h-6"
                            />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <div className="px-2 py-2 bg-zinc-800 rounded-xl w-48">
                            <div className="space-y-4">
                              <div>
                                <div
                                  className="flex space-x-2 cursor-pointer  hover:bg-zinc-700 p-2 rounded-lg"
                                  onClick={() => handleShareClick(msg)}
                                >
                                  <Image
                                    src="/share.png"
                                    width={20}
                                    height={20}
                                    alt="Share-Icon"
                                  />
                                  <p>Share</p>
                                </div>
                              </div>
                              <div
                                className="flex space-x-2 cursor-pointer hover:bg-zinc-700 p-2 rounded-lg"
                                onClick={() => handleRename(msg.sessionId)}
                              >
                                <Image
                                  src="/rename.png"
                                  width={20}
                                  height={20}
                                  alt="Rename-Icon"
                                />
                                <p> Rename</p>
                              </div>
                              <div
                                className="flex space-x-2 cursor-pointer  hover:bg-zinc-700 p-2 rounded-lg"
                                onClick={() => handleDelete(msg.sessionId)}
                              >
                                <Image
                                  src="/delete.png"
                                  width={20}
                                  height={20}
                                  alt="Delete-Icon"
                                />
                                <p> Delete Chat</p>
                              </div>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  )
                )}
              </div>
            );
          })}
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
              <div className="text-[12px] text-white">Upgrade plan</div>
              <div className="text-[12px] text-[rgb(128,124,124)]">
                Get GPT-4, DALL.E, and more
              </div>
            </div>
          </div>
          <div className="flex space-x-2 mt-2 cursor-pointer hover:bg-[rgb(20,20,20)] p-2 rounded-xl">
            <div className="bg-[#84E0C2] rounded-full w-[35px] h-[35px]">
              <p className="relative -translate-x-2/4 -translate-y-2/4 left-2/4 top-2/4 text-center text-white">
                ID
              </p>
            </div>
            <div className="mt-1 text-white">User ID</div>
          </div>
        </div>
      </div>
    </>
  );
}
// function timestampToDate(timestamp) {
//   return new Date(timestamp * 1000);
// }

const groupDataByDate = (data) => {
  const today = new Date();
  const groupedData = {
    today: [],
    yesterday: [],
    lastWeek: [],
    lastMonth: [],
    older: [],
  };

  data.forEach((item) => {
    const createdAt = new Date(item.createdAt);
    const diffTime = today - createdAt;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      groupedData.today.push(item);
    } else if (diffDays === 1) {
      groupedData.yesterday.push(item);
    } else if (diffDays <= 7) {
      groupedData.lastWeek.push(item);
    } else if (diffDays <= 30) {
      groupedData.lastMonth.push(item);
    } else {
      groupedData.older.push(item);
    }
  });

  return groupedData;
};
