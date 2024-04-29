import { NavLink } from "react-router-dom";
import { PresentationChartLineIcon, ClipboardDocumentListIcon, ChartBarIcon, Bars2Icon, XMarkIcon } from "@heroicons/react/24/outline";
import UserInfo from "./UserInfo";
import { useState } from "react";

export default function Sidebar() {
  const [isToggled, setIsToggled] = useState(false);

  function toggleSidebar() {
    setIsToggled(prev => !prev);
  }

  return (
    <>
      <aside className={`fixed ${isToggled ? "left-0" : "-left-full"} top-0 bg-white duration-700 lg:sticky w-72 lg:min-w-72 p-4 h-[98vh] flex flex-col z-20 border-r-4 shadow-md`}>
        <div className="p-6">
          <UserInfo />
        </div>

        <hr className="border-t-1 border-gray-300 mb-2 mt-2" />

        <NavLink to="/" className="flex items-start gap-2 p-2">
          <PresentationChartLineIcon className="w-6 h-6" />
          <span className="text-base">Dashboard</span>
        </NavLink>

        <hr className="border-t-1 border-gray-300 mb-2 mt-2" />

        <NavLink to="/tests/Technical" className="flex items-start gap-2 p-2">
          <ClipboardDocumentListIcon className="w-6 h-6" />
          <span className="text-base">Tests</span>
        </NavLink>

        <hr className="border-t-1 border-gray-300 mb-2 mt-2" />

        <NavLink to="/results" className="flex items-start gap-2 p-2">
          <ChartBarIcon className="w-6 h-6" />
          <span className="text-base">Results</span>
        </NavLink>

        <hr className="border-t-1 border-gray-300 mb-2 mt-2" />
      </aside>

      <button className="bg-[#F5F0E5] fixed right-4 top-4 p-3 aspect-square lg:hidden z-20 rounded-full" onClick={toggleSidebar}>
        {!isToggled ? <Bars2Icon className="w-6 h-6" /> : <XMarkIcon className="w-6 h-6" />}
      </button>
    </>
  );
}
