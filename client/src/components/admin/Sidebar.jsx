import { NavLink } from "react-router-dom";

import {
  UsersIcon,
  PresentationChartLineIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon,
  Bars2Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { useState } from "react";
import UserInfo from "../profile/UserInfo";

export default function Sidebar() {
  const [isToggled, SetisToggled] = useState(false);

  function toggleSidebar() {
    SetisToggled((prev) => !prev);
  }

  return (
    <>
      <aside
        className={`fixed ${
          isToggled ? "left-0" : "left-[-100%]"
        } top-0 bg-white duration-700 lg:sticky w-72 p-4 border-r-4 h-[98vh] flex flex-col z-20 `}
      >
        <UserInfo />

        <div>
          <hr className="border-t-1 border-gray-300 mb-2 mt-8" />
          <NavLink
            to="/admin/dashboard"
            className="flex items-start gap-2 p-2 mb-2 mt-4 bg-edf3fa"
          >
            <PresentationChartLineIcon className="icon-lg pl-2" />
            <span className="text-[16px]">Dashboard</span>
          </NavLink>

          <hr className="border-t-1 border-gray-300 mb-2 mt-2" />

          <NavLink
            to="/admin/tests"
            className="flex items-start gap-2 p-2 mb-2"
          >
            <ClipboardDocumentListIcon className="icon-lg" />
            <span className="text-[16px]">Tests</span>
          </NavLink>

          <hr className="border-t-1 border-gray-300 mb-2" />

          <NavLink
            to="/admin/users"
            className="flex items-start gap-2 p-2 mb-2"
          >
            <UsersIcon className="icon-lg" />
            <span className="text-[16px]">Users</span>
          </NavLink>

          <hr className="border-t-1 border-gray-300 mb-2" />

          <NavLink to="/admin/results" className="flex items-start gap-2 p-2">
            <ChartBarIcon className="icon-lg" />
            <span className="text-[16px]">Results</span>
          </NavLink>

          <hr className="border-t-1 border-gray-300 mb-2" />
        </div>
      </aside>

      <button
        className="bg-[#F5F0E5] fixed right-4 top-4 p-3 aspect-square lg:hidden z-20 rounded-3xl"
        onClick={toggleSidebar}
      >
        {!isToggled && <Bars2Icon className="icon-lg" />}
        {isToggled && <XMarkIcon className="icon-lg" />}
      </button>
    </>
  );
}
