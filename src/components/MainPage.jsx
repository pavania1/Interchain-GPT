"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Tooltip } from "@mui/material";
import axios from "axios";

export default function MainPage() {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = () => {
    console.log("Submitted message:", message);
    let copyData = [
      {
        message,
        type: "Question",
      },
    ];

    setData((prev) => [...prev, ...copyData]);
    setMessage("");
    axios
      .post("https://api.resolute.vitwit.com/gpt/predict", {
        input_str: message,
      })
      .then((response) => {
        console.log(response);
        if (response.data.result.length == 0) {
          console.log("Entered pending case");
          let copyData = [
            {
              message: "Your request is inserted into a queue.",
              type: "Pending",
            },
          ];

          setData((prev) => [...prev, ...copyData]);
        } else {
          console.log("Entered Success case");

          // persistent store to history (use db or local storage)

          //storage
          /*

            Map<Key: string, Value: {Promt, Answer}[] >

          */
          let copyData = [
            {
              message: response.data.result,
              type: "Answer",
            },
          ];

          setData((prev) => [...prev, ...copyData]);
        }
      })

      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="bg-[#171717] w-full p-4 overflow-y-hidden h-[100vh] ">
      <div className="flex space-x-1 hover:bg-zinc-800 p-2 rounded-xl w-[15%] xs:hidden sm:hidden lg:flex md:flex">
        <div className="font-bold">ChatGPT</div>
        <p className="text-[rgb(224,215,215)] font-bold">3.5</p>
      </div>

      <div className="max-w-[1280px] h-[100%]">
        <div className="flex flex-col my-6  items-center overflow-y-scroll h-[80%] ">
          {data.length > 0 ? (
            <div className="">
              {data.map((item, index) => {
                return (
                  <div className="my-6" key={index}>
                    {item.type}:{item.message}
                  </div>
                );
              })}
            </div>
          ) : (
            <>
              <div className="">
                <Image src="/logo.svg" width={50} height={50} alt="logo-icon" />
              </div>
              <div className="font-bold text-2xl mt-2">
                How can I help you today?
              </div>
            </>
          )}
        </div>
        <div className="border rounded-xl border-zinc-600 p-2 flex mx-auto lg:w-[60%] md:w-[60%] sm:w-full xs:w-full">
          <textarea
            type="text"
            value={message}
            onChange={handleMessageChange}
            placeholder="Enter your message..."
            className="w-full bg-transparent outline-none border-none text-[rgb(173,171,171)]"
          />

          <button
            className="border rounded-xl border-zinc-600 p-2 bg-white"
            onClick={handleSubmit}
          >
            <Image src="/arrow.png" width={24} height={24} alt="enter-icon" />
          </button>
        </div>
        <div className="mt-2 text-sm text-[rgb(173,171,171)] text-center">
          ChatGPT can make mistakes. Consider checking important information.
        </div>
      </div>
    </div>
  );
}
