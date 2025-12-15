// src/Pages/Profile.jsx
import React, { useContext, useEffect, useState } from "react";
;

import toast from "react-hot-toast";
import { AuthContext } from "../../Context/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch profile on load
  useEffect(() => {
    if (!user?.email) return;

    axiosSecure
      .get(`/users/role/${user.email}`)
      .then((res) => {
        setProfile(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Profile load error:", err);
        toast.error("Failed to load profile");
        setLoading(false);
      });
  }, [user?.email, axiosSecure]);

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    // Re-fetch to reset changes
    axiosSecure.get(`/users/role/${user.email}`).then((res) => setProfile(res.data));
    setIsEditing(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      // Only send editable fields (exclude email)
      const updateData = {
        name: profile.name,
        bloodGroup: profile.bloodGroup,
        district: profile.district,
        upazila: profile.upazila,
        photoURL: profile.photoURL,
      };

      await axiosSecure.patch("/users/profile", updateData);
      toast.success("Profile updated!");
      setIsEditing(false);
    } catch (err) {
      toast.error("Failed to update profile");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  if (!profile) return <div className="p-6">Profile not found</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">My Profile</h2>

      <form onSubmit={handleSave}>
        {/* Edit / Save Controls */}
        <div className="flex justify-end mb-6">
          {isEditing ? (
            <div className="flex gap-2">
              <button type="button" className="btn btn-ghost" onClick={handleCancel}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </div>
          ) : (
            <button type="button" className="btn btn-outline" onClick={handleEdit}>
              Edit Profile
            </button>
          )}
        </div>

        {/* Avatar */}
        <div className="mb-5 flex justify-center">
          <div className="avatar">
            <div className="w-24 rounded-full">
              <img
                src={profile.photoURL || "https://via.placeholder.com/96"}
                alt="Profile"
              />
            </div>
          </div>
        </div>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Full Name</label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={profile.name || ""}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          ) : (
            <p className="p-2 bg-base-200 rounded">{profile.name}</p>
          )}
        </div>

        {/* Email (read-only always) */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <p className="p-2 bg-base-200 rounded">{profile.email}</p>
        </div>

        {/* Blood Group */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Blood Group</label>
          {isEditing ? (
            <select
              name="bloodGroup"
              value={profile.bloodGroup || ""}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="">Select Blood Group</option>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
          ) : (
            <p className="p-2 bg-base-200 rounded">
              {profile.bloodGroup || "Not set"}
            </p>
          )}
        </div>

        {/* District */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">District</label>
          {isEditing ? (
            <input
              type="text"
              name="district"
              value={profile.district || ""}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          ) : (
            <p className="p-2 bg-base-200 rounded">
              {profile.district || "Not set"}
            </p>
          )}
        </div>

        {/* Upazila */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Upazila</label>
          {isEditing ? (
            <input
              type="text"
              name="upazila"
              value={profile.upazila || ""}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          ) : (
            <p className="p-2 bg-base-200 rounded">
              {profile.upazila || "Not set"}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Profile;