// import MainPage from "@/components/MainPage";
// import Sidebar from "@/components/Sidebar";
// import Image from "next/image";
// import { Tooltip } from "@mui/material";
// export default function Home() {
//   return (
//     <div className="flex h-full">
//       <div className="flex justify-between lg:hidden md:hidden sm:flex xs:flex absolute p-4 w-full">
//         <div>
//           <Image
//             src="/hamburger-icon.jpg"
//             width={24}
//             height={24}
//             alt="Hamburger-ICon"
//           />
//         </div>
//         <div className="flex space-x-1 hover:bg-zinc-800 p-2 rounded-xl w-[15%]">
//           <div className="font-bold">ChatGPT</div>
//           <p className="text-[rgb(224,215,215)] font-bold">3.5</p>
//         </div>
//         <div>
//           <Tooltip title="New Chat" placement="right-start">
//             <Image
//               src="/sign-icon.svg"
//               width={20}
//               height={20}
//               alt="Note-Icon"
//             />
//           </Tooltip>
//         </div>
//       </div>
//       <Sidebar />

//       <MainPage />
//     </div>
//   );
// }

"use client"
import { useState } from 'react';
import MainPage from "@/components/MainPage";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import { Tooltip } from "@mui/material";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
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
          <div className="font-bold">ChatGPT</div>
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
       <Sidebar sidebarOPen={sidebarOpen}/>
      <MainPage />
    </div>
  );
}
