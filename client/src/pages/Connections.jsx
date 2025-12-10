import React, { useState } from "react";
import {
  Users,
  UserPlus,
  UserCheck,
  UserRoundPen,
  MessageSquare,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  dummyConnectionsData as connections,
  dummyFollowersData as followers,
  dummyFollowingData as following,
  dummyPendingConnectionsData as pendingConnections,
} from "../assets/assets";

const Connections = () => {
  const [currentTab, setCurrentTab] = useState("Followers");
  const navigate = useNavigate();
  const dataArray = [
    { label: "Followers", value: followers, icon: Users },
    {
      label: "Following",
      value: following,
      icon: UserCheck,
    },
    {
      label: "Pending",
      value: pendingConnections,
      icon: UserRoundPen,
    },
    {
      label: "Connections",
      value: connections,
      icon: UserPlus,
    },
  ];
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Connections
          </h1>
          <p className="text-gray-500">
            Manage your network and discover new connections
          </p>
        </div>

        {/* Stat Cards */}
        <div className="mb-8 flex flex-wrap gap-4 md:gap-6">
          {dataArray.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center gap-1 border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow h-24 w-36 md:w-40 rounded-xl"
            >
              <b className="text-2xl text-gray-900">
                {item.value.length}
              </b>
              <p className="text-gray-500 text-sm font-medium">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="inline-flex flex-wrap items-center bg-white p-1.5 rounded-xl shadow-sm border border-gray-100 mb-6">
          {dataArray.map((tab) => (
            <button
              onClick={() => setCurrentTab(tab.label)}
              key={tab.label}
              className={`cursor-pointer flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                currentTab === tab.label
                  ? "bg-gray-900 text-white shadow-md"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="ml-2">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Users Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dataArray
            .find((item) => item.label === currentTab)
            .value.map((user) => (
              <div
                key={user._id}
                className="flex flex-col justify-between p-5 bg-white shadow-sm border border-gray-100 rounded-xl hover:border-gray-300 transition-colors"
              >
                <div className="flex gap-4 items-start">
                  <img
                    src={user.profile_picture}
                    alt="prof pic"
                    className="rounded-full w-12 h-12 object-cover border border-gray-100"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 truncate">
                      {user.full_name}
                    </p>
                    <p className="text-gray-500 text-xs mb-1">
                      @{user.username}
                    </p>
                    <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                      {user.bio}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 mt-5">
                  <button
                    onClick={() =>
                      navigate(`/profile/${user._id}`)
                    }
                    className="w-full py-2 text-sm font-medium rounded-lg bg-gray-900 hover:bg-gray-800 text-white shadow-sm active:scale-95 transition-all"
                  >
                    View Profile
                  </button>

                  {currentTab === "Following" && (
                    <button className="w-full py-2 text-sm font-medium rounded-lg border border-gray-200 text-gray-600 hover:text-red-600 hover:border-red-200 hover:bg-red-50 active:scale-95 transition-all">
                      Unfollow
                    </button>
                  )}
                  {currentTab === "Pending" && (
                    <button className="w-full py-2 text-sm font-medium rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 active:scale-95 transition-all">
                      Accept Request
                    </button>
                  )}
                  {currentTab === "Connections" && (
                    <button
                      onClick={() =>
                        navigate(`/messages/${user._id}`)
                      }
                      className="w-full py-2 text-sm font-medium rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900 active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Message
                    </button>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Connections;
