import React, { useState } from "react";
import { dummyUserData } from "../assets/assets";
import { Image, X } from "lucide-react";
import toast from "react-hot-toast";

const CreatePost = () => {
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = dummyUserData;

  const handleSubmit = async () => {};

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6 md:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create post
          </h1>
          <p className="text-gray-500">
            Share your thoughts with the world
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4 mb-4">
            <img
              src={user.profile_picture}
              alt="prof pic"
              className="w-12 h-12 rounded-full object-cover border border-gray-100"
            />
            <div>
              <h2 className="font-bold text-gray-900">
                {user.full_name}
              </h2>
              <p className="text-xs font-medium text-gray-400">
                @{user.username}
              </p>
            </div>
          </div>
          <textarea
            className="w-full resize-none min-h-[120px] text-lg outline-none placeholder-gray-400 text-gray-800"
            placeholder="What's on your mind?"
            onChange={(e) => setContent(e.target.value)}
            value={content}
          />
          {images.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-4">
              {images.map((image, i) => (
                <div key={i} className="relative group">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="img"
                    className="h-24 rounded-lg object-cover border border-gray-100"
                  />
                  <div
                    onClick={() =>
                      setImages(
                        images.filter(
                          (_, index) => index !== i
                        )
                      )
                    }
                    className="absolute hidden group-hover:flex justify-center items-center top-0 right-0 bottom-0 left-0 bg-black/50 backdrop-blur-sm rounded-lg cursor-pointer transition-all"
                  >
                    <X className="w-6 h-6 text-white" />
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="flex items-center justify-between pt-4 mt-2 border-t border-gray-100">
            <label
              htmlFor="images"
              className="flex items-center justify-center p-2 rounded-full hover:bg-gray-50 transition-colors cursor-pointer text-gray-400 hover:text-gray-900"
            >
              <Image className="w-6 h-6" />
            </label>
            <input
              type="file"
              id="images"
              accept="image/*"
              hidden
              multiple
              onChange={(e) =>
                setImages([...images, ...e.target.files])
              }
            />
            <button
              disabled={loading}
              onClick={() =>
                toast.promise(handleSubmit(), {
                  loading: "Uploading...",
                  success: <p>Post published!</p>,
                  error: <p>Failed to publish</p>,
                })
              }
              className="text-sm bg-gray-900 hover:bg-gray-800 text-white font-semibold px-6 py-2.5 rounded-xl shadow-sm active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Publish post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
