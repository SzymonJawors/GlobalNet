import React from "react";
import { dummyUserData } from "../assets/assets";
import {
  MapPin,
  MessageCircle,
  Plus,
  UserMinus,
  UserPlus,
} from "lucide-react";

const UserCard = ({ user }) => {
  const currentUser = dummyUserData;
  const handleFollow = async () => {};
  const handleConnectionRequest = async () => {};
  const isFollowing = currentUser?.following.includes(
    user._id
  );

  return (
    <div
      key={user._id}
      className="p-4 pt-6 flex flex-col justify-between w-72 shadow-sm border border-gray-100 rounded-xl bg-white"
    >
      <div className="text-center">
        <img
          src={user.profile_picture}
          alt="prof pic"
          className="rounded-full w-20 h-20 shadow-sm mx-auto object-cover border border-gray-100"
        />
        <p className="mt-4 font-bold text-gray-900 text-lg">
          {user.full_name}
        </p>
        {user.username && (
          <p className="text-gray-500 text-sm font-medium">
            @{user.username}
          </p>
        )}
        {user.bio && (
          <p className="text-gray-600 mt-3 text-center text-sm px-2 leading-relaxed line-clamp-2">
            {user.bio}
          </p>
        )}
      </div>
      <div className="flex items-center justify-center gap-2 mt-5 text-xs text-gray-600 font-medium">
        <div className="flex items-center gap-1.5 border border-gray-200 bg-gray-50 rounded-full px-3 py-1.5">
          <MapPin className="w-3.5 h-3.5 text-gray-400" />{" "}
          {user.location}
        </div>
        <div className="flex items-center gap-1.5 border border-gray-200 bg-gray-50 rounded-full px-3 py-1.5">
          <span className="font-bold text-gray-800">
            {user.followers.length}
          </span>{" "}
          Followers
        </div>
      </div>
      <div className="flex mt-6 gap-2">
        <button
          onClick={handleFollow}
          disabled={isFollowing}
          className={`
            w-full py-2.5 rounded-lg flex justify-center items-center gap-2 transition-all duration-200 font-medium text-sm
            ${
              isFollowing
                ? "bg-white border border-gray-200 text-gray-700 hover:border-red-200 hover:text-red-600 hover:bg-red-50"
                : "bg-gray-900 text-white hover:bg-gray-800 shadow-md active:scale-95"
            }`}
        >
          {isFollowing ? (
            <>
              <UserMinus className="w-4 h-4" />
              <span>Unfollow</span>
            </>
          ) : (
            <>
              <UserPlus className="w-4 h-4" />
              <span>Follow</span>
            </>
          )}
        </button>
        <button
          onClick={handleConnectionRequest}
          className="flex items-center justify-center w-12 border border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-400 hover:bg-gray-50 rounded-lg cursor-pointer active:scale-95 transition-all"
        >
          {currentUser?.connections.includes(user._id) ? (
            <MessageCircle className="w-5 h-5" />
          ) : (
            <Plus className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
};

export default UserCard;
