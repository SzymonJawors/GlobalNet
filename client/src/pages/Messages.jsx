import React from "react";
import { dummyConnectionsData } from "../assets/assets";
import { Eye, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Messages = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen relative bg-gray-50">
      <div className="max-w-5xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Messages
          </h1>
          <p className="text-gray-500">
            Chat with friends and family
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {dummyConnectionsData.map((user) => (
            <div
              key={user._id}
              className="flex items-start gap-4 p-5 bg-white shadow-sm border border-gray-100 rounded-xl hover:border-gray-300 transition-all duration-200"
            >
              <img
                src={user.profile_picture}
                alt="user prof"
                className="rounded-full size-12 object-cover border border-gray-100 flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="mb-3">
                  <p className="font-bold text-gray-900 truncate text-lg">
                    {user.full_name}
                  </p>
                  <p className="text-gray-500 text-xs font-medium">
                    @{user.username}
                  </p>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed mb-4 h-10">
                  {user.bio}
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      navigate(`/messages/${user._id}`)
                    }
                    className="flex-1 h-10 flex items-center justify-center text-sm font-semibold rounded-lg bg-gray-900 text-white hover:bg-gray-800 active:scale-95 transition-all shadow-sm gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Chat</span>
                  </button>
                  <button
                    onClick={() =>
                      navigate(`/profile/${user._id}`)
                    }
                    className="size-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-400 hover:bg-gray-50 active:scale-95 transition-all bg-white"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Messages;
