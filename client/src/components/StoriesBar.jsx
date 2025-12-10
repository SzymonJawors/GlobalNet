import React, { useEffect, useState } from "react";
import { dummyStoriesData } from "../assets/assets";
import { Plus } from "lucide-react";
import moment from "moment";
import StoryModal from "./StoryModal";
import StoryViewer from "./StoryViewer";

const StoriesBar = () => {
  const [stories, setStories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [viewStory, setViewStory] = useState(null);
  const fetchStories = async () => {
    setStories(dummyStoriesData);
  };
  useEffect(() => {
    fetchStories();
  }, []);
  return (
    <div className="w-screen sm:w-[calc(100vh-240px)] lg:max-w-2xl no-scrollbar overflow-x-auto px-4">
      <div className="flex gap-4 pb-5">
        <div
          onClick={() => setShowModal(true)}
          className="rounded-xl shadow-sm min-w-30 max-w-30 max-h-40 aspect-[3/4] cursor-pointer hover:shadow-md transition-all duration-200 border border-dashed border-gray-400 bg-gray-50 hover:bg-gray-100"
        >
          <div className="h-full flex flex-col items-center justify-center p-4">
            <div className="size-10 bg-gray-900 rounded-full flex items-center justify-center mb-3 shadow-md">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <p className="text-sm font-semibold text-gray-700 text-center">
              Create stories
            </p>
          </div>
        </div>
        {stories.map((story, index) => (
          <div
            onClick={() => setViewStory(story)}
            className={`relative rounded-xl shadow-sm min-w-30 max-w-30 max-h-40 cursor-pointer hover:shadow-md transition-all duration-200 bg-gradient-to-b from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800 active:scale-95 border border-gray-200`}
            key={index}
          >
            <img
              src={story.user.profile_picture}
              alt="profilepic"
              className="absolute size-9 top-3 left-3 z-10 rounded-full ring-2 ring-white shadow-sm object-cover"
            />
            <p className="absolute top-16 left-3 text-gray-200 text-sm font-medium truncate max-w-24 drop-shadow-sm">
              {story.content}
            </p>
            <p className="text-gray-300 absolute bottom-2 right-2 z-10 text-[10px] font-medium bg-black/30 px-1.5 py-0.5 rounded backdrop-blur-sm">
              {moment(story.createdAt).fromNow(true)}
            </p>
            {story.media_type !== "text" && (
              <div className="absolute inset-0 z-1 rounded-xl bg-black overflow-hidden">
                {story.media_type === "image" ? (
                  <img
                    src={story.media_url}
                    alt="story"
                    className="h-full w-full object-cover hover:scale-105 transition duration-500 opacity-80 hover:opacity-90"
                  />
                ) : (
                  <video
                    src={story.media_url}
                    className="h-full w-full object-cover hover:scale-105 transition duration-500 opacity-80 hover:opacity-90"
                  ></video>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      {showModal && (
        <StoryModal
          setShowModal={setShowModal}
          fetchStories={fetchStories}
        />
      )}
      {viewStory && (
        <StoryViewer
          viewStory={viewStory}
          setViewStory={setViewStory}
        />
      )}
    </div>
  );
};

export default StoriesBar;
