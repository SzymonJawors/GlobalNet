import {
  BadgeCheck,
  Heart,
  MessageCircle,
  Share2,
} from "lucide-react";
import React, { useState } from "react";
import moment from "moment";
import { assets, dummyUserData } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const PostCard = ({ post }) => {
  const [likes, setLikes] = useState(post.likes_count);
  const currentUser = dummyUserData;

  const postWithHashtags = post.content.replace(
    /(#\w+)/g,
    '<span class="text-teal-600 font-medium hover:underline">$1</span>'
  );

  const handleLike = async () => {};
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 space-y-4 w-full max-w-2xl">
      <div
        onClick={() =>
          navigate("/profile/" + post.user._id)
        }
        className="inline-flex items-center gap-3 cursor-pointer"
      >
        <img
          src={post.user.profile_picture}
          alt="picture"
          className="w-10 h-10 rounded-full shadow-sm object-cover"
        />
        <div>
          <div className="flex items-center space-x-1">
            <span className="font-semibold text-gray-900">
              {post.user.full_name}
            </span>
            <BadgeCheck className="w-4 h-4 text-teal-500" />
          </div>
          <div className="text-sm text-gray-500">
            @{post.user.username} •{" "}
            {moment(post.createdAt).fromNow()}
          </div>
        </div>
      </div>
      {post.content && (
        <div
          className="text-gray-800 text-sm whitespace-pre-line leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: postWithHashtags,
          }}
        />
      )}
      <div className="grid grid-cols-2 gap-2">
        {post.image_urls.map((img, index) => (
          <img
            src={img}
            key={index}
            alt="img"
            className={`w-full h-48 object-cover rounded-lg ${
              post.image_urls.length === 1 &&
              "col-span-2 h-auto max-h-[500px]"
            }`}
          />
        ))}
      </div>
      <div className="flex items-center gap-6 text-gray-500 text-sm pt-3 border-t border-gray-200">
        <div className="flex items-center gap-2 hover:text-red-500 transition-colors">
          <Heart
            className={`w-4 h-4 cursor-pointer ${
              likes.includes(currentUser._id) &&
              "text-red-500 fill-red-500"
            }`}
            onClick={handleLike}
          />
          <span>{likes.length}</span>
        </div>
        <div className="flex items-center gap-2 hover:text-teal-600 transition-colors cursor-pointer">
          <MessageCircle className="w-4 h-4" />
          <span>{12}</span>
        </div>
        <div className="flex items-center gap-2 hover:text-teal-600 transition-colors cursor-pointer">
          <Share2 className="w-4 h-4" />
          <span>{7}</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
