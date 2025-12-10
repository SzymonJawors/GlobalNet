import { BadgeCheck, X } from "lucide-react";
import React, { useEffect, useState } from "react";

const StoryViewer = ({ viewStory, setViewStory }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timer, progressInterval;
    if (viewStory && viewStory.media_type !== "video") {
      setProgress(0);
      const duration = 10000;
      const setTime = 100;
      let elapsed = 0;
      progressInterval = setInterval(() => {
        elapsed += setTime;
        setProgress((elapsed / duration) * 100);
      }, setTime);
      timer = setTimeout(() => {
        setViewStory(null);
      }, duration);
    }
    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [viewStory, setViewStory]);

  const handleClose = () => {
    setViewStory(null);
  };

  if (!viewStory) return null;

  const renderContent = () => {
    switch (viewStory.media_type) {
      case "image":
        return (
          <img
            src={viewStory.media_url}
            alt="img"
            className="max-w-full max-h-screen object-contain drop-shadow-2xl"
          />
        );
      case "video":
        return (
          <video
            onEnded={() => setViewStory(null)}
            src={viewStory.media_url}
            alt="video"
            className="max-h-screen max-w-full"
            controls
            autoPlay
          />
        );
      case "text":
        return (
          <div className="w-full h-full flex items-center justify-center p-8 text-white text-3xl font-bold text-center leading-relaxed">
            {viewStory.content}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className="fixed inset-0 h-screen w-screen z-[100] flex items-center justify-center bg-black"
      style={{
        backgroundColor:
          viewStory.media_type === "text"
            ? viewStory.background_color
            : "#09090b",
      }}
    >
      <div className="absolute top-0 left-0 w-full h-1.5 bg-white/20 z-50">
        <div
          className="h-full bg-white transition-all duration-100 linear shadow-[0_0_10px_rgba(255,255,255,0.5)]"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="absolute top-6 left-4 flex items-center gap-3 py-2 pl-2 pr-4 backdrop-blur-md rounded-full bg-black/30 border border-white/10 z-50 shadow-lg">
        <img
          src={viewStory.user?.profile_picture}
          alt="profile picture"
          className="size-9 rounded-full object-cover border-2 border-white/20"
        />
        <div className="text-white flex flex-col justify-center">
          <div className="flex items-center gap-1">
            <span className="text-sm font-semibold tracking-wide shadow-black drop-shadow-md">
              {viewStory.user?.full_name}
            </span>
            <BadgeCheck
              size={16}
              className="text-blue-500 fill-blue-500/10"
            />
          </div>
        </div>
      </div>

      <button
        onClick={handleClose}
        className="absolute top-6 right-4 text-white z-50 p-2 rounded-full hover:bg-white/10 transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="w-full h-full flex items-center justify-center relative">
        {renderContent()}
      </div>
    </div>
  );
};

export default StoryViewer;
