import React, { useState } from "react";
import {
  ArrowLeft,
  Sparkle,
  TextIcon,
  Upload,
} from "lucide-react";
import toast from "react-hot-toast";

const StoryModal = ({ setShowModal, fetchStories }) => {
  const bgColors = [
    "#111827",
    "#000000",
    "#374151",
    "#0f766e",
    "#059669",
    "#1e3a8a",
    "#7c3aed",
    "#be185d",
    "#b45309",
    "#78350f",
  ];
  const [mode, setMode] = useState("text");
  const [background, setBackground] = useState(bgColors[0]);
  const [text, setText] = useState("");
  const [media, setMedia] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleMediaUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setMedia(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };
  const handleCreateStory = async () => {};
  return (
    <div className="fixed inset-0 z-50 min-h-screen bg-black/90 backdrop-blur-sm text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-zinc-900 p-5 rounded-2xl border border-zinc-800 shadow-2xl">
        <div className="text-center mb-5 flex items-center justify-between">
          <button
            onClick={() => setShowModal(false)}
            className="text-white p-2 cursor-pointer hover:bg-zinc-800 rounded-full transition-colors"
          >
            <ArrowLeft />
          </button>
          <h2 className="text-lg font-semibold">
            Create stories
          </h2>
          <span className="w-10"></span>
        </div>
        <div
          className="rounded-xl h-96 flex items-center justify-center relative overflow-hidden ring-1 ring-white/10"
          style={{ backgroundColor: background }}
        >
          {mode === "text" && (
            <textarea
              className="bg-transparent text-white w-full h-full p-8 text-2xl font-medium text-center resize-none focus:outline-none placeholder-white/50 flex items-center justify-center"
              placeholder="Start typing..."
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
          )}
          {mode === "media" &&
            previewUrl &&
            (media?.type.startsWith("image") ? (
              <img
                src={previewUrl}
                alt="your image"
                className="object-contain w-full h-full"
              />
            ) : (
              <video
                src={previewUrl}
                className="object-contain w-full h-full"
              />
            ))}
        </div>
        <div className="flex flex-wrap mt-6 gap-3 justify-center">
          {bgColors.map((color) => (
            <button
              key={color}
              className={`w-8 h-8 rounded-full cursor-pointer transition-transform hover:scale-110 border-2 ${
                background === color
                  ? "border-white"
                  : "border-transparent"
              }`}
              style={{ backgroundColor: color }}
              onClick={() => setBackground(color)}
            />
          ))}
        </div>
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => {
              setMode("text");
              setMedia(null);
              setPreviewUrl(null);
            }}
            className={`flex-1 flex items-center cursor-pointer justify-center gap-2 p-3 rounded-xl font-medium transition-all ${
              mode === "text"
                ? "bg-white text-black shadow-lg"
                : "bg-zinc-800 text-gray-400 hover:bg-zinc-700"
            }`}
          >
            <TextIcon size={18} /> Text
          </button>
          <label
            className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl font-medium cursor-pointer transition-all ${
              mode === "media"
                ? "bg-white text-black shadow-lg"
                : "bg-zinc-800 text-gray-400 hover:bg-zinc-700"
            }`}
          >
            <input
              onChange={(e) => {
                handleMediaUpload(e);
                setMode("media");
              }}
              type="file"
              accept="image/*, video/*"
              className="hidden"
            />
            <Upload size={18} /> Image/Video
          </label>
        </div>
        <button
          onClick={() =>
            toast.promise(handleCreateStory(), {
              loading: "Saving...",
              success: <p>Created!</p>,
              error: (e) => <p>{e.message}</p>,
            })
          }
          className="flex items-center justify-center gap-2 text-black font-semibold py-3.5 mt-6 w-full rounded-xl bg-white hover:bg-gray-200 active:scale-95 transition-all cursor-pointer shadow-lg"
        >
          <Sparkle size={18} /> Share Story
        </button>
      </div>
    </div>
  );
};

export default StoryModal;
