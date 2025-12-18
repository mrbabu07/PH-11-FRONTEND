
// import React, { useContext, useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { AuthContext } from "../../Context/AuthProvider";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import axios from "axios"; // ✅ Needed for JSON

// const Profile = () => {
//   const { user } = useContext(AuthContext);
//   const axiosSecure = useAxiosSecure();
//   const [profile, setProfile] = useState(null);
//   const [districts, setDistricts] = useState([]);
//   const [upazilas, setUpazilas] = useState([]);
//   const [isEditing, setIsEditing] = useState(false);
//   const [loading, setLoading] = useState(true);

//   
//   useEffect(() => {
//     axios.get("/district.json").then(res => setDistricts(res.data.districts || []));
//     axios.get("/upazila.json").then(res => setUpazilas(res.data.upazilas || []));
//   }, []);

//   
//   useEffect(() => {
//     if (!user?.email) return;
//     axiosSecure
//       .get(`/users/role/${user.email}`)
//       .then((res) => {
//         setProfile(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Profile load error:", err);
//         toast.error("Failed to load profile");
//         setLoading(false);
//       });
//   }, [user?.email, axiosSecure]);

//   const handleEdit = () => setIsEditing(true);

//   const handleCancel = () => {
//     
//     axiosSecure.get(`/users/role/${user.email}`).then((res) => setProfile(res.data));
//     setIsEditing(false);
//   };

//   const handleSave = async (e) => {
//     e.preventDefault();
//     try {
//       const updateData = {
//         name: profile.name,
//         bloodGroup: profile.bloodGroup,
//         district: profile.district,      
//         upazila: profile.upazila,        
//         photoURL: profile.photoURL,
//       };
//       await axiosSecure.patch("/users/profile", updateData);
//       toast.success("Profile updated!");
//       setIsEditing(false);
//     } catch (err) {
//       toast.error("Failed to update profile");
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProfile((prev) => ({ ...prev, [name]: value }));
//   };


//   const filteredUpazilas = upazilas.filter(u => u.district_id === profile?.district);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <span className="loading loading-spinner text-primary"></span>
//       </div>
//     );
//   }

//   if (!profile) return <div className="p-6">Profile not found</div>;

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
//       <h2 className="text-2xl font-bold mb-6 text-center">My Profile</h2>

//       <form onSubmit={handleSave}>
//         <div className="flex justify-end mb-6">
//           {isEditing ? (
//             <div className="flex gap-2">
//               <button type="button" className="btn btn-ghost" onClick={handleCancel}>
//                 Cancel
//               </button>
//               <button type="submit" className="btn btn-primary">
//                 Save Changes
//               </button>
//             </div>
//           ) : (
//             <button type="button" className="btn btn-outline" onClick={handleEdit}>
//               Edit Profile
//             </button>
//           )}
//         </div>

//         {/* Avatar */}
//         <div className="mb-5 flex justify-center">
//           <div className="avatar">
//             <div className="w-24 rounded-full">
//               <img
//                 src={profile.photoURL || "https://via.placeholder.com/96"}
//                 alt="Profile"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Name */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-1">Full Name</label>
//           {isEditing ? (
//             <input
//               type="text"
//               name="name"
//               value={profile.name || ""}
//               onChange={handleChange}
//               className="input input-bordered w-full"
//               required
//             />
//           ) : (
//             <p className="p-2 bg-base-200 rounded">{profile.name}</p>
//           )}
//         </div>

//         {/* Email */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-1">Email</label>
//           <p className="p-2 bg-base-200 rounded">{profile.email}</p>
//         </div>

//         {/* Blood Group */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-1">Blood Group</label>
//           {isEditing ? (
//             <select
//               name="bloodGroup"
//               value={profile.bloodGroup || ""}
//               onChange={handleChange}
//               className="select select-bordered w-full"
//             >
//               <option value="">Select Blood Group</option>
//               {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
//                 <option key={bg} value={bg}>{bg}</option>
//               ))}
//             </select>
//           ) : (
//             <p className="p-2 bg-base-200 rounded">
//               {profile.bloodGroup || "Not set"}
//             </p>
//           )}
//         </div>

//         {/* District - Dropdown (shows name, stores ID) */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-1">District</label>
//           {isEditing ? (
//             <select
//               name="district"
//               value={profile.district || ""}
//               onChange={handleChange}
//               className="select select-bordered w-full"
//             >
//               <option value="">Select District</option>
//               {districts.map((d) => (
//                 <option key={d.id} value={d.id}>{d.name}</option>
//               ))}
//             </select>
//           ) : (
//             <p className="p-2 bg-base-200 rounded">
//               {districts.find(d => d.id === profile.district)?.name || profile.district || "Not set"}
//             </p>
//           )}
//         </div>

//         {/* Upazila - Dropdown (shows & stores name) */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-1">Upazila</label>
//           {isEditing ? (
//             <select
//               name="upazila"
//               value={profile.upazila || ""}
//               onChange={handleChange}
//               disabled={!profile?.district}
//               className="select select-bordered w-full"
//             >
//               <option value="">Select Upazila</option>
//               {filteredUpazilas.map((u) => (
//                 <option key={u.id} value={u.name}>{u.name}</option>
//               ))}
//             </select>
//           ) : (
//             <p className="p-2 bg-base-200 rounded">
//               {profile.upazila || "Not set"}
//             </p>
//           )}
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Profile;



import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../Context/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import axios from "axios";
import { Camera, Mail, Droplet, MapPin, Edit2, Save, X, User } from "lucide-react";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [profile, setProfile] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load district/upazila JSON
  useEffect(() => {
    axios.get("/district.json").then(res => setDistricts(res.data.districts || []));
    axios.get("/upazila.json").then(res => setUpazilas(res.data.upazilas || []));
  }, []);

  // Fetch profile
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
    axiosSecure.get(`/users/role/${user.email}`).then((res) => setProfile(res.data));
    setIsEditing(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const updateData = {
        name: profile.name,
        bloodGroup: profile.bloodGroup,
        district: profile.district,
        upazila: profile.upazila,
        photoURL: profile.photoURL,
      };
      await axiosSecure.patch("/users/profile", updateData);
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      toast.error("Failed to update profile");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Filter upazilas by selected district
  const filteredUpazilas = upazilas.filter(u => u.district_id === profile?.district);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-orange-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center animate-bounce">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2c-1.5 3.5-6 8-6 12a6 6 0 0012 0c0-4-4.5-8.5-6-12z"/>
            </svg>
          </div>
          <p className="text-gray-600 font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-orange-50 flex items-center justify-center p-4">
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg text-center">
          <p className="text-gray-600">Profile not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-orange-50 p-4 py-8">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-64 h-64 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-full mb-4 shadow-lg">
            <User className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-red-700 to-red-500 bg-clip-text text-transparent mb-2">
            My Profile
          </h2>
          <p className="text-gray-600">Manage your account information</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-red-100">
          {/* Cover Image */}
          <div className="h-32 bg-gradient-to-r from-red-600 via-red-500 to-orange-500 relative">
            <div className="absolute inset-0 bg-black/10"></div>
          </div>

          <form onSubmit={handleSave} className="p-8">
            {/* Action Buttons */}
            <div className="flex justify-end mb-6 gap-3">
              {isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all"
                  >
                    <X size={18} />
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                  >
                    <Save size={18} />
                    Save Changes
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={handleEdit}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium border-2 border-red-300 text-red-700 hover:bg-red-50 transition-all"
                >
                  <Edit2 size={18} />
                  Edit Profile
                </button>
              )}
            </div>

            {/* Avatar Section */}
            <div className="flex flex-col items-center -mt-24 mb-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gray-200">
                  <img
                    src={profile.photoURL || "https://via.placeholder.com/128"}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                {isEditing && (
                  <button
                    type="button"
                    className="absolute bottom-0 right-0 p-2 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition-all"
                  >
                    <Camera size={18} />
                  </button>
                )}
              </div>
              
              {/* Blood Group Badge */}
              {profile.bloodGroup && (
                <div className="mt-4 flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-full font-bold text-lg border-2 border-red-300">
                  <Droplet size={20} fill="currentColor" />
                  {profile.bloodGroup}
                </div>
              )}
            </div>

            {/* Form Fields */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="md:col-span-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <User size={16} />
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={profile.name || ""}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all outline-none"
                    required
                  />
                ) : (
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-gray-800 font-medium">{profile.name}</p>
                  </div>
                )}
              </div>

              {/* Email */}
              <div className="md:col-span-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Mail size={16} />
                  Email Address
                </label>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-gray-800 font-medium">{profile.email}</p>
                </div>
              </div>

              {/* Blood Group */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Droplet size={16} />
                  Blood Group
                </label>
                {isEditing ? (
                  <select
                    name="bloodGroup"
                    value={profile.bloodGroup || ""}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all outline-none"
                  >
                    <option value="">Select Blood Group</option>
                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                ) : (
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-gray-800 font-medium">
                      {profile.bloodGroup || "Not set"}
                    </p>
                  </div>
                )}
              </div>

              {/* District */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <MapPin size={16} />
                  District
                </label>
                {isEditing ? (
                  <select
                    name="district"
                    value={profile.district || ""}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all outline-none"
                  >
                    <option value="">Select District</option>
                    {districts.map((d) => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                ) : (
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-gray-800 font-medium">
                      {districts.find(d => d.id === profile.district)?.name || profile.district || "Not set"}
                    </p>
                  </div>
                )}
              </div>

              {/* Upazila */}
              <div className="md:col-span-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <MapPin size={16} />
                  Upazila
                </label>
                {isEditing ? (
                  <select
                    name="upazila"
                    value={profile.upazila || ""}
                    onChange={handleChange}
                    disabled={!profile?.district}
                    className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <option value="">Select Upazila</option>
                    {filteredUpazilas.map((u) => (
                      <option key={u.id} value={u.name}>{u.name}</option>
                    ))}
                  </select>
                ) : (
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-gray-800 font-medium">
                      {profile.upazila || "Not set"}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Info Box */}
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-gray-700">
                <span className="font-semibold text-red-700">Note:</span> Keep your profile updated to help others find you when they need blood donation.
              </p>
            </div>
          </form>
        </div>

        {/* Stats Card (Optional) */}
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-red-100 text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Droplet size={24} className="text-red-600" />
            </div>
            <p className="text-2xl font-bold text-gray-800">{profile.bloodGroup || "N/A"}</p>
            <p className="text-sm text-gray-600">Blood Type</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-red-100 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <MapPin size={24} className="text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-800">
              {districts.find(d => d.id === profile.district)?.name || "N/A"}
            </p>
            <p className="text-sm text-gray-600">District</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-red-100 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <User size={24} className="text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-800 capitalize">{profile.role || "Donor"}</p>
            <p className="text-sm text-gray-600">Role</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;