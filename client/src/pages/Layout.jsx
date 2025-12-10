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
    <div className="w-full flex h-screen bg-gray-50">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex-1 h-full overflow-hidden">
        <Outlet />
      </div>

      {/* Mobile Menu Toggle Button - Floating Style */}
      {sidebarOpen ? (
        <button
          className="fixed top-4 right-4 z-[100] p-2.5 bg-white border border-gray-200 rounded-full shadow-lg text-gray-900 sm:hidden hover:bg-gray-100 active:scale-90 transition-all duration-200"
          onClick={() => setSidebarOpen(false)}
        >
          <X className="w-6 h-6" />
        </button>
      ) : (
        <button
          className="fixed top-4 right-4 z-[100] p-2.5 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full shadow-lg text-gray-900 sm:hidden hover:bg-white active:scale-90 transition-all duration-200"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
      )}
    </div>
  ) : (
    <Loading />
  );
};

export default Layout;
