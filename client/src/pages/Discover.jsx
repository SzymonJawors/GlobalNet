import React, { useState } from "react";
import { dummyConnectionsData } from "../assets/assets";
import { Search } from "lucide-react";
import UserCard from "../components/UserCard";
import Loading from "../components/Loading";

const Discover = () => {
  const [input, setInput] = useState("");
  const [users, setUsers] = useState(dummyConnectionsData);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    if (e.key === "Enter") {
      setUsers([]);
      setLoading(true);
      setTimeout(() => {
        setUsers(dummyConnectionsData);
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6 md:p-8">
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Discover People
          </h1>
          <p className="text-gray-500 text-lg">
            Connect with amazing people and grow your
            network
          </p>
        </div>

        <div className="mb-10 max-w-2xl">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-gray-900 transition-colors w-5 h-5" />
            <input
              type="text"
              placeholder="Search people by name, username, bio, or location..."
              className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
              onChange={(e) => setInput(e.target.value)}
              value={input}
              onKeyUp={handleSearch}
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loading height="auto" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center md:justify-items-start">
            {users.map((user) => (
              <UserCard user={user} key={user._id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Discover;
