import React from "react";
import { assets, dummyUserData } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import MenuItems from "./MenuItems";
import { CirclePlus, LogOut } from "lucide-react";
import { UserButton, useClerk } from "@clerk/clerk-react";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const user = dummyUserData;
  const { signOut } = useClerk();
  return (
    <div
      className={`w-60 xl:w-72 bg-white border-r border-gray-100 flex flex-col justify-between items-center fixed h-full sm:relative z-50 ${
        sidebarOpen
          ? "translate-x-0 shadow-2xl"
          : "-translate-x-full sm:translate-x-0"
      } transition-all duration-300 ease-in-out`}
    >
      <div className="w-full">
        <img
          src={assets.logo}
          alt="logo"
          className="w-26 ml-7 my-2 cursor-pointer"
          onClick={() => navigate("/")}
        />
        <hr className="border-gray-100 mb-8" />

        <MenuItems setSidebarOpen={setSidebarOpen} />

        <Link
          to={"/create-post"}
          className="flex items-center justify-center gap-2 py-3 mt-6 mx-6 rounded-xl bg-gray-900 hover:bg-gray-800 active:scale-95 transition-all text-white font-medium shadow-md cursor-pointer"
        >
          <CirclePlus className="w-5 h-5" />
          Create post
        </Link>
      </div>
      <div className="w-full border-t border-gray-100 p-4 px-7 flex items-center justify-between">
        <div className="flex gap-2 items-center cursor-pointer">
          <UserButton />
          <div>
            <h1 className="text-sm font-semibold text-gray-900">
              {user.full_name}
            </h1>
            <p className="text-xs text-gray-400">
              @{user.username}
            </p>
          </div>
        </div>
        <LogOut
          className="w-5 h-5 text-gray-400 hover:text-gray-800 transition cursor-pointer"
          onClick={signOut}
        />
      </div>
    </div>
  );
};

export default Sidebar;
