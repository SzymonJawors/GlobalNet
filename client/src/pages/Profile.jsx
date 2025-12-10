import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  dummyPostsData,
  dummyUserData,
} from "../assets/assets";
import Loading from "../components/Loading";
import UserProfileInfo from "../components/UserProfileInfo";
import PostCard from "../components/PostCard";
import moment from "moment";

const Profile = () => {
  const { profileId } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("posts");
  const [showEdit, setShowEdit] = useState(false);

  const fetchUser = async () => {
    setUser(dummyUserData);
    setPosts(dummyPostsData);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return user ? (
    <div className="relative h-full overflow-y-scroll bg-gray-50 p-4 md:p-6 no-scrollbar">
      <div className="max-w-4xl mx-auto pb-10">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Cover Photo Area - Changed to Neutral Gradient */}
          <div className="h-40 md:h-60 bg-gradient-to-r from-gray-200 to-slate-200 relative">
            {user.cover_photo && (
              <img
                src={user.cover_photo}
                alt="user cover photo"
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <UserProfileInfo
            user={user}
            posts={posts}
            profileId={profileId}
            setShowEdit={setShowEdit}
          />
        </div>

        <div className="mt-8">
          {/* Tabs - Graphite Style */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-1.5 flex max-w-md mx-auto mb-8">
            {["posts", "media", "likes"].map((tab) => (
              <button
                onClick={() => setActiveTab(tab)}
                key={tab}
                className={`flex-1 px-4 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                  activeTab === tab
                    ? "bg-gray-900 text-white shadow-md"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Content Area */}
          {activeTab === "posts" && (
            <div className="flex flex-col items-center gap-6">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          )}

          {activeTab === "media" && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-1 rounded-xl overflow-hidden">
              {posts
                .filter(
                  (post) => post.image_urls.length > 0
                )
                .map((post) => (
                  <React.Fragment key={post._id}>
                    {post.image_urls.map((image, index) => (
                      <Link
                        target="_blank"
                        to={image}
                        key={`${post._id}-${index}`}
                        className="relative group aspect-square overflow-hidden bg-gray-100"
                      >
                        <img
                          src={image}
                          alt="img"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-2">
                          <p className="text-xs text-white/90 font-medium">
                            {moment(
                              post.createdAt
                            ).fromNow()}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </React.Fragment>
                ))}
            </div>
          )}

          {activeTab === "likes" && (
            <div className="text-center py-10 text-gray-400">
              Liked posts will appear here.
            </div>
          )}
        </div>
      </div>
      {showEdit && <p>Show profile edit</p>}
    </div>
  ) : (
    <Loading />
  );
};

export default Profile;
