import React, { useEffect, useState } from "react";
import { assets, dummyPostsData } from "../assets/assets";
import Loading from "../components/Loading";
import StoriesBar from "../components/StoriesBar";
import PostCard from "../components/PostCard";
import RecentMessages from "../components/RecentMessages";

const Feed = () => {
  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeeds = async () => {
    setFeeds(dummyPostsData);
    setLoading(false);
  };

  useEffect(() => {
    fetchFeeds();
  }, []);

  return !loading ? (
    <div className="h-full overflow-y-scroll no-scrollbar py-8 px-2 xl:pr-5 flex items-start justify-center xl:gap-8 bg-gray-50">
      <div className="w-full max-w-2xl">
        <StoriesBar />
        <div className="p-2 sm:p-4 space-y-6 mt-2">
          {feeds.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>

      <div className="max-xl:hidden sticky top-6 w-80 space-y-6">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-3">
          <h3 className="text-gray-900 font-bold text-sm tracking-wide">
            Sponsored
          </h3>
          <img
            src={assets.sponsored_img}
            alt="sponsor"
            className="w-full h-auto rounded-lg object-cover border border-gray-100"
          />
          <div>
            <p className="text-sm font-semibold text-gray-900">
              Sponsor Brand
            </p>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              Promote your product to thousands of
              developers in the community.
            </p>
          </div>
        </div>
        <RecentMessages />
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Feed;
