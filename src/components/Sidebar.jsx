import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Tooltip } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { deleteSession } from "@/redux/actions/sessionActions";
import moment from "moment";

export default function Sidebar(props) {
  const sessionList = useSelector((state) => state.session.sessions);
  const sessionData = useSelector((state) => state.session.sessionData);
  const [data, setData] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    setData(sessionList);
  }, [sessionList.length]);

  useEffect(() => {
    console.log(props.sidebarOpen, "-there --->")
  }, [props.sidebarOpen]);

  const handleOnClick = (sessionId) => {
    router.push(`?sessionId=${sessionId}`);
    props.setSession(sessionId);
  };

  const handleDelete = (sessionId) => {
    dispatch(deleteSession(sessionId));
  };

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
              width={30}
              height={30}
              alt="Picture of the author"
            />
            <div className="mt-1">New Chat</div>
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
        <div className="overflow-y-scroll max-h-[80vh]">
          {data.map((item, index) => {
            return (
              <div
                className="cursor-pointer  hover:bg-[rgb(20,20,20)] p-2 rounded-xl flex justify-between"
                key={index}
              >
                <div onClick={() => handleOnClick(item.sessionId)}>
                  {sessionData[item.sessionId]
                    ? sessionData[item.sessionId][0].message
                    : ""}
                </div>
                <p> {moment.unix(item.createdAt / 1000).fromNow()}</p>
                <Image
                  src="/delete.png"
                  width={20}
                  height={20}
                  alt="Delete-Icon"
                  className="w-[20px] h-[20px]  items-center justify-center"
                  onClick={() => handleDelete(item.sessionId)}
                />
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
