import React, { useEffect, useState } from "react";
import api from "../services/api";

// import your local image
import profilePic from "../assets/profile.png";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [locationInput, setLocationInput] = useState("");

  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioInput, setBioInput] = useState("");

  // Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile");

        setUser(res.data.user);
        setLocationInput(res.data.user.location || "");
        setBioInput(res.data.user.bio || "");

        setLoading(false);
      } catch (err) {
        console.log("Profile fetch error:", err);
      }
    };

    fetchProfile();
  }, []);

  // Update profile
  const updateProfile = async (updatedFields) => {
    try {
      const res = await api.put("/profile", updatedFields);
      setUser(res.data.user);
    } catch (err) {
      console.log("Profile update error:", err);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#f7f9fc] p-6 flex justify-center">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT SECTION */}
        <div className="lg:col-span-2 space-y-6">

          {/* PROFILE HEADER */}
          <div className="bg-white rounded-2xl p-6 shadow">
            <div className="flex items-center gap-6">

              {/* PROFILE IMAGE */}
              <img
                src={profilePic}
                className="w-24 h-24 rounded-full object-cover border shadow-sm"
                alt="profile"
              />

              <div>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-gray-500">{user.email}</p>

                <button className="mt-3 px-4 py-2 rounded-lg border text-sm font-medium">
                  Upload new photo
                </button>
              </div>
            </div>
          </div>

          {/* PERSONAL INFO */}
          <div className="bg-white rounded-2xl p-6 shadow">
            <h2 className="text-xl font-semibold mb-4">Personal Info</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
              <div>
                <p className="text-gray-400 text-sm">Full Name</p>
                <p className="font-medium mt-1">{user.name}</p>
              </div>

              <div>
                <p className="text-gray-400 text-sm">Email</p>
                <p className="font-medium mt-1">{user.email}</p>
              </div>

              <div>
                <p className="text-gray-400 text-sm">Phone</p>
                <p className="font-medium mt-1">{user.phone || "+91 88128 XXXXX"}</p>
              </div>
            </div>
          </div>

          {/* LOCATION */}
          <div className="bg-white rounded-2xl p-6 shadow">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Location</h2>

              {!isEditingLocation && (
                <button
                  onClick={() => setIsEditingLocation(true)}
                  className="text-blue-600 font-medium"
                >
                  Edit
                </button>
              )}
            </div>

            {isEditingLocation ? (
              <div className="mt-4 flex items-center gap-3">
                <input
                  className="border rounded-lg px-4 py-2 w-full"
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                />

                <button
                  onClick={() => {
                    updateProfile({ location: locationInput });
                    setIsEditingLocation(false);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  Save
                </button>

                <button
                  onClick={() => {
                    setLocationInput(user.location || "");
                    setIsEditingLocation(false);
                  }}
                  className="px-4 py-2 bg-gray-200 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <p className="mt-3 font-medium">
                {user.location || "No location added"}
              </p>
            )}
          </div>

          {/* BIO */}
          <div className="bg-white rounded-2xl p-6 shadow">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Bio</h2>

              {!isEditingBio && (
                <button
                  onClick={() => setIsEditingBio(true)}
                  className="text-blue-600 font-medium"
                >
                  Edit
                </button>
              )}
            </div>

            {isEditingBio ? (
              <>
                <textarea
                  className="w-full border rounded-lg px-4 py-2 mt-3"
                  rows={4}
                  value={bioInput}
                  onChange={(e) => setBioInput(e.target.value)}
                ></textarea>

                <div className="flex gap-3 mt-3">
                  <button
                    onClick={() => {
                      updateProfile({ bio: bioInput });
                      setIsEditingBio(false);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                  >
                    Save
                  </button>

                  <button
                    onClick={() => {
                      setBioInput(user.bio || "");
                      setIsEditingBio(false);
                    }}
                    className="px-4 py-2 bg-gray-200 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <p className="mt-3 text-gray-600">
                {user.bio || "No bio added yet"}
              </p>
            )}
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="bg-white rounded-2xl p-6 shadow h-fit">
          <h3 className="text-lg font-semibold mb-4">Complete your profile</h3>

          {/* PROGRESS CIRCLE */}
          <div className="flex justify-center mb-6">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full">
                <circle cx="64" cy="64" r="55" stroke="#e5e7eb" strokeWidth="10" fill="none" />
                <circle
                  cx="64"
                  cy="64"
                  r="55"
                  stroke="#10b981"
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray={345}
                  strokeDashoffset={345 - (345 * 40) / 100}
                  strokeLinecap="round"
                  transform="rotate(-90 64 64)"
                />
              </svg>
              <p className="absolute inset-0 flex items-center justify-center text-xl font-semibold">
                40%
              </p>
            </div>
          </div>

          {/* CHECKLIST */}
          <ul className="space-y-3 text-sm">
            <li className="flex justify-between">
              <span>Setup account</span> <span>10%</span>
            </li>

            <li className="flex justify-between">
              <span>Personal Info</span> <span>10%</span>
            </li>

            <li className="flex justify-between text-green-600">
              <span>Location</span> <span>+20%</span>
            </li>

            <li className="flex justify-between">
              <span>Biography</span> <span>15%</span>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}
