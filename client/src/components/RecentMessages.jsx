import React, { useEffect, useState } from "react";
import { dummyRecentMessagesData } from "../assets/assets";
import { Link } from "react-router-dom";
import moment from "moment";

const RecentMessages = () => {
  const [messages, setMessages] = useState([]);
  const fetchRecentMessages = async () => {
    setMessages(dummyRecentMessagesData);
  };
  useEffect(() => {
    fetchRecentMessages();
  }, []);
  return (
    <div className="bg-white max-w-xs mt-4 p-4 min-h-20 rounded-xl shadow-sm border border-gray-100 text-xs text-gray-900">
      <h3 className="font-bold text-gray-800 mb-4">
        Recent messages
      </h3>
      <div className="flex flex-col max-h-54 overflow-y-scroll no-scrollbar">
        {messages.map((message, index) => (
          <Link
            to={`/messages/${message.from_user_id._id}`}
            key={index}
            className="flex items-start gap-3 py-2.5 px-2 -mx-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <img
              src={message.from_user_id.profile_picture}
              alt="profpic"
              className="w-9 h-9 rounded-full object-cover border border-gray-100"
            />
            <div className="w-full overflow-hidden">
              <div className="flex justify-between items-center mb-0.5">
                <p className="font-semibold text-gray-900 truncate">
                  {message.from_user_id.full_name}
                </p>
                <p className="text-[10px] text-gray-400 whitespace-nowrap ml-2">
                  {moment(message.createdAt).fromNow(true)}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-500 truncate pr-2">
                  {message.text
                    ? message.text
                    : "Wysłano zdjęcie/film"}
                </p>
                {!message.seen && (
                  <p className="bg-teal-600 text-white min-w-[16px] h-4 flex items-center justify-center rounded-full text-[10px] px-1 font-bold">
                    1
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentMessages;
