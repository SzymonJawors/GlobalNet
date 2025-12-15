import React, { useEffect, useRef, useState } from "react";
import {
  dummyMessagesData,
  dummyUserData,
} from "../assets/assets";
import { Image, SendHorizonal } from "lucide-react";

const ChatBox = () => {
  const messages = dummyMessagesData;
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [user, setUser] = useState(dummyUserData);

  const messagesEndRef = useRef(null);

  const sendMessage = async () => {};

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    user && (
      <div className="flex flex-col h-full bg-white">
        <div className="flex items-center gap-3 p-3 md:px-6 border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
          <img
            src={user.profile_picture}
            alt="prof pic"
            className="size-10 rounded-full object-cover border border-gray-100"
          />
          <div>
            <p className="font-bold text-gray-900">
              {user.full_name}
            </p>
            <p className="text-xs text-gray-400 font-medium">
              @{user.username}
            </p>
          </div>
        </div>

        <div className="flex-1 p-4 md:px-8 overflow-y-auto bg-gray-50/50">
          <div className="space-y-4 max-w-3xl mx-auto pb-4">
            {messages
              .toSorted(
                (a, b) =>
                  new Date(a.createdAt) -
                  new Date(b.createdAt)
              )
              .map((message, index) => {
                const isSentByMe =
                  message.to_user_id === user._id;

                return (
                  <div
                    className={`flex flex-col ${
                      !isSentByMe
                        ? "items-start"
                        : "items-end"
                    }`}
                    key={index}
                  >
                    <div
                      className={`p-3 px-4 text-sm max-w-[85%] md:max-w-md shadow-sm ${
                        !isSentByMe
                          ? "bg-white text-gray-800 rounded-2xl rounded-tl-none border border-gray-100"
                          : "bg-gray-900 text-white rounded-2xl rounded-tr-none"
                      }`}
                    >
                      {message.message_type === "image" && (
                        <img
                          src={message.media_url}
                          alt="media pic"
                          className="w-full rounded-lg mb-2 object-cover"
                        />
                      )}
                      <p className="leading-relaxed">
                        {message.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="p-4 bg-white border-t border-gray-100">
          <div className="flex items-center gap-3 pl-4 pr-2 py-2 bg-gray-50 w-full max-w-2xl mx-auto border border-gray-200 focus-within:border-gray-400 focus-within:ring-1 focus-within:ring-gray-200 transition-all rounded-full">
            <input
              onKeyDown={(e) =>
                e.key === "Enter" && sendMessage()
              }
              onChange={(e) => setText(e.target.value)}
              type="text"
              className="flex-1 outline-none text-gray-800 bg-transparent placeholder-gray-400 ml-1"
              placeholder="Type a message..."
              value={text}
            />
            <label
              htmlFor="image"
              className="hover:bg-gray-200 p-2 rounded-full transition-colors cursor-pointer"
            >
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  className="size-6 rounded object-cover"
                  alt="img"
                />
              ) : (
                <Image className="size-5 text-gray-500" />
              )}
              <input
                type="file"
                id="image"
                accept="image/*"
                hidden
                onChange={(e) =>
                  setImage(e.target.files[0])
                }
              />
            </label>
            <button
              onClick={sendMessage}
              className="bg-gray-900 hover:bg-black active:scale-95 transition-all cursor-pointer text-white p-2.5 rounded-full shadow-md"
            >
              <SendHorizonal size={18} />
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ChatBox;
