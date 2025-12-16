import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { dummyUserData } from "../assets/assets";
import Loading from "../components/Loading";

const Layout = () => {
  const user = dummyUserData;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return user ? (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden relative">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 sm:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex-1 h-full w-full overflow-y-auto scroll-smooth">
        <Outlet />
      </div>

      <button
        className={`fixed top-4 right-4 z-50 p-2.5 rounded-full shadow-lg sm:hidden transition-transform duration-200 active:scale-90 ${
          sidebarOpen
            ? "bg-white text-gray-900 border border-gray-200"
            : "bg-white/90 backdrop-blur-sm text-gray-900 border border-gray-200"
        }`}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>
    </div>
  ) : (
    <Loading />
  );
};

export default Layout;
