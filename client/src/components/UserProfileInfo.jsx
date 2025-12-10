import {
  Calendar,
  MapPin,
  PenBox,
  Verified,
} from "lucide-react";
import React from "react";
import moment from "moment";

const UserProfileInfo = ({
  user,
  posts,
  profileId,
  setShowEdit,
}) => {
  return (
    <div className="relative py-4 px-6 md:px-8 bg-white">
      <div className="flex flex-col md:flex-row items-start gap-6">
        <div className="w-32 h-32 border-4 border-white shadow-lg absolute -top-16 rounded-full bg-white">
          <img
            src={user.profile_picture}
            alt="prof pic"
            className="absolute rounded-full w-full h-full object-cover z-2"
          />
        </div>
        <div className="w-full pt-16 md:pt-0 md:pl-36">
          <div className="flex flex-col md:flex-row items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-gray-900">
                  {user.full_name}
                </h1>
                <Verified className="w-5 h-5 text-teal-500" />
              </div>
              <p className="text-gray-500 font-medium">
                {user.username
                  ? `@${user.username}`
                  : "Add a username"}
              </p>
            </div>
            {!profileId && (
              <button
                onClick={() => setShowEdit(true)}
                className="flex items-center gap-2 border border-gray-300 hover:border-gray-800 hover:bg-gray-50 px-4 py-2 rounded-xl font-medium transition-all duration-200 mt-4 md:mt-0 cursor-pointer active:scale-95 text-gray-700 hover:text-gray-900"
              >
                <PenBox className="w-4 h-4" /> Edit profile
              </button>
            )}
          </div>
          <p className="text-gray-800 text-sm max-w-2xl mt-4 leading-relaxed whitespace-pre-line">
            {user.bio}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500 mt-4">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-gray-400" />
              {user.location
                ? user.location
                : "Add location"}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-gray-400" />
              Joined{" "}
              <span className="font-medium text-gray-700">
                {moment(user.createdAt).format("MMMM YYYY")}
              </span>
            </span>
          </div>
          <div className="flex items-center gap-8 mt-6 border-t border-gray-100 pt-4">
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg sm:text-xl font-bold text-gray-900">
                {posts.length}
              </span>
              <span className="text-xs sm:text-sm text-gray-500">
                Posts
              </span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg sm:text-xl font-bold text-gray-900">
                {user.followers.length}
              </span>
              <span className="text-xs sm:text-sm text-gray-500">
                Followers
              </span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg sm:text-xl font-bold text-gray-900">
                {user.following.length}
              </span>
              <span className="text-xs sm:text-sm text-gray-500">
                Following
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileInfo;
