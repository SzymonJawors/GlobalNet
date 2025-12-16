import React, { useState } from "react";
import { dummyUserData } from "../assets/assets";
import { Pencil } from "lucide-react";

const ProfileModal = ({ setShowEdit }) => {
  const user = dummyUserData;
  const [editForm, setEditForm] = useState({
    username: user.username,
    bio: user.bio,
    location: user.location,
    profile_picture: null,
    cover_photo: null,
    full_name: user.full_name,
  });
  const handleSaveProfile = async (e) => {
    e.preventDefault();
  };
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-50 h-screen overflow-y-scroll bg-black/80 backdrop-blur-sm">
      <div className="max-w-2xl sm:py-10 mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Edit profile
          </h1>
          <form
            className="space-y-6"
            onSubmit={handleSaveProfile}
          >
            <div className="flex flex-col items-start gap-4">
              <label
                htmlFor="profile_picture"
                className="flex flex-col text-sm font-semibold text-gray-700 mb-1 cursor-pointer"
              >
                Profile Picture
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  id="profile_picture"
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      profile_picture: e.target.files[0],
                    })
                  }
                />
                <div className="group/profile relative mt-2">
                  <img
                    src={
                      editForm.profile_picture
                        ? URL.createObjectURL(
                            editForm.profile_picture
                          )
                        : user.profile_picture
                    }
                    alt="prof pic"
                    className="size-28 rounded-full object-cover border-4 border-white shadow-sm ring-1 ring-gray-100"
                  />
                  <div className="absolute hidden group-hover/profile:flex inset-0 bg-black/40 rounded-full items-center justify-center transition-all">
                    <Pencil className="w-6 h-6 text-white" />
                  </div>
                </div>
              </label>
            </div>
            <div className="flex flex-col items-start gap-4">
              <label
                htmlFor="cover_photo"
                className="block w-full text-sm font-semibold text-gray-700 mb-1 cursor-pointer"
              >
                Background Photo
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  id="cover_photo"
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      cover_photo: e.target.files[0],
                    })
                  }
                />
                <div className="group/cover relative mt-2 w-full h-40 rounded-xl overflow-hidden border border-gray-100">
                  <img
                    src={
                      editForm.cover_photo
                        ? URL.createObjectURL(
                            editForm.cover_photo
                          )
                        : user.cover_photo
                    }
                    alt="bg photo"
                    className="w-full h-full object-cover bg-gradient-to-r from-gray-200 to-slate-200"
                  />
                  <div className="absolute hidden group-hover/cover:flex inset-0 bg-black/40 items-center justify-center transition-all">
                    <Pencil className="w-6 h-6 text-white" />
                  </div>
                </div>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
                  placeholder="Enter your full name"
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      full_name: e.target.value,
                    })
                  }
                  value={editForm.full_name}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Username
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">
                    @
                  </span>
                  <input
                    type="text"
                    className="w-full p-3 pl-8 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
                    placeholder="username"
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        username: e.target.value,
                      })
                    }
                    value={editForm.username}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Bio
              </label>
              <textarea
                rows={3}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all resize-none"
                placeholder="Tell us about yourself"
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    bio: e.target.value,
                  })
                }
                value={editForm.bio}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
                placeholder="Where are you based?"
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    location: e.target.value,
                  })
                }
                value={editForm.location}
              />
            </div>
            <div className="flex justify-end space-x-4 pt-8 border-t border-gray-100 mt-6">
              <button
                onClick={() => setShowEdit(false)}
                type="button"
                className="px-6 py-2.5 border border-gray-200 rounded-xl text-gray-600 font-medium hover:bg-gray-50 hover:text-gray-900 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-gray-900 text-white font-medium rounded-xl hover:bg-black shadow-lg hover:shadow-xl active:scale-95 transition-all cursor-pointer"
              >
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
