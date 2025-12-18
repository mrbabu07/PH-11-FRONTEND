// // src/Dashboard/AddProduct/EditRequest.jsx
// import React, { useContext, useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import axios from "axios";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { AuthContext } from "../../Context/AuthProvider";

// const EditRequest = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const axiosSecure = useAxiosSecure();
//   const { user } = useContext(AuthContext);

//   const [districts, setDistricts] = useState([]);
//   const [upazilas, setUpazilas] = useState([]);
//   const [formData, setFormData] = useState({
//     recipientName: "",
//     blood_group: "",
//     district: "",
//     upazila: "",
//     hospital: "",
//     address: "",
//     request_message: "",
//     donation_date: "",
//     donation_time: "",
//   });
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);

//   // Load districts & upazilas
//   useEffect(() => {
//     axios.get("/district.json").then(res => setDistricts(res.data.districts || []));
//     axios.get("/upazila.json").then(res => setUpazilas(res.data.upazilas || []));
//   }, []);

//   // Load request data
//   useEffect(() => {
//     const fetchRequest = async () => {
//       try {
//         const res = await axiosSecure.get(`/donation-request/${id}`);
//         setFormData(res.data);
//         setLoading(false);
//       } catch (err) {
//         console.error("Failed to load request", err);
//         toast.error("Failed to load request");
//         navigate("/dashboard/my-donation-requests");
//       }
//     };
//     fetchRequest();
//   }, [id, axiosSecure, navigate]);

//   const filteredUpazilas = upazilas.filter(u => u.district_id === formData.district);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);

//     try {
//       await axiosSecure.put(`/requests/${id}`, formData);
//       toast.success("Request updated successfully!");
//       navigate("/dashboard/my-request");
//     } catch (err) {
//       console.error("Update failed", err);
//       toast.error("Failed to update request");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <span className="loading loading-spinner text-primary"></span>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
//       <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg border p-8">
//         <h2 className="text-2xl font-bold mb-6 text-center">
//           Edit Blood Request
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Recipient Name */}
//           <div>
//             <label className="block mb-1">Recipient Name</label>
//             <input
//               type="text"
//               name="recipientName"
//               value={formData.recipientName || ""}
//               onChange={handleChange}
//               className="w-full border rounded-lg px-4 py-2"
//               required
//             />
//           </div>

//           {/* Blood Group */}
//           <div>
//             <label className="block mb-1">Blood Group</label>
//             <select
//               name="blood_group"
//               value={formData.blood_group || ""}
//               onChange={handleChange}
//               className="w-full border rounded-lg px-4 py-2"
//               required
//             >
//               <option value="">Select Blood Group</option>
//               {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
//                 <option key={bg} value={bg}>{bg}</option>
//               ))}
//             </select>
//           </div>

//           {/* District */}
//           <div>
//             <label className="block mb-1">District</label>
//             <select
//               name="district"
//               value={formData.district || ""}
//               onChange={handleChange}
//               className="w-full border rounded-lg px-4 py-2"
//               required
//             >
//               <option value="">Select District</option>
//               {districts.map((d) => (
//                 <option key={d.id} value={d.id}>{d.name}</option>
//               ))}
//             </select>
//           </div>

//           {/* Upazila */}
//           <div>
//             <label className="block mb-1">Upazila</label>
//             <select
//               name="upazila"
//               value={formData.upazila || ""}
//               onChange={handleChange}
//               disabled={!formData.district}
//               className="w-full border rounded-lg px-4 py-2"
//               required
//             >
//               <option value="">Select Upazila</option>
//               {filteredUpazilas.map((u) => (
//                 <option key={u.id} value={u.name}>{u.name}</option>
//               ))}
//             </select>
//           </div>

//           {/* Hospital */}
//           <div>
//             <label className="block mb-1">Hospital Name</label>
//             <input
//               type="text"
//               name="hospital"
//               value={formData.hospital || ""}
//               onChange={handleChange}
//               className="w-full border rounded-lg px-4 py-2"
//               required
//             />
//           </div>

//           {/* Address */}
//           <div>
//             <label className="block mb-1">Full Address</label>
//             <input
//               type="text"
//               name="address"
//               value={formData.address || ""}
//               onChange={handleChange}
//               className="w-full border rounded-lg px-4 py-2"
//               required
//             />
//           </div>

//           {/* Donation Date */}
//           <div>
//             <label className="block mb-1">Donation Date</label>
//             <input
//               type="date"
//               name="donation_date"
//               value={formData.donation_date || ""}
//               onChange={handleChange}
//               className="w-full border rounded-lg px-4 py-2"
//               required
//             />
//           </div>

//           {/* Donation Time */}
//           <div>
//             <label className="block mb-1">Donation Time</label>
//             <input
//               type="time"
//               name="donation_time"
//               value={formData.donation_time || ""}
//               onChange={handleChange}
//               className="w-full border rounded-lg px-4 py-2"
//               required
//             />
//           </div>

//           {/* Request Message */}
//           <div>
//             <label className="block mb-1">Request Message</label>
//             <textarea
//               name="request_message"
//               value={formData.request_message || ""}
//               onChange={handleChange}
//               className="w-full border rounded-lg px-4 py-2"
//               rows="3"
//             />
//           </div>

//           <div className="flex gap-3 pt-2">
//             <button
//               type="button"
//               onClick={() => navigate(-1)}
//               className="flex-1 btn btn-outline"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={submitting}
//               className="flex-1 btn btn-primary"
//             >
//               {submitting ? "Updating..." : "Update Request"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditRequest;


import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../Context/AuthProvider";
import { motion } from "framer-motion";
import { 
  Heart, MapPin, Building2, Calendar, Clock, 
  MessageSquare, Droplet, Save, X, Loader2, Edit3 
} from "lucide-react";
import Loading from "../../Pages/Loading";

const EditRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [formData, setFormData] = useState({
    recipientName: "",
    blood_group: "",
    district: "",
    upazila: "",
    hospital: "",
    address: "",
    request_message: "",
    donation_date: "",
    donation_time: "",
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Load districts & upazilas
  useEffect(() => {
    axios.get("/district.json").then(res => setDistricts(res.data.districts || []));
    axios.get("/upazila.json").then(res => setUpazilas(res.data.upazilas || []));
  }, []);

  // Load request data
  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const res = await axiosSecure.get(`/donation-request/${id}`);
        setFormData(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load request", err);
        toast.error("Failed to load request");
        navigate("/dashboard/donation-request");
      }
    };
    fetchRequest();
  }, [id, axiosSecure, navigate]);

  const filteredUpazilas = upazilas.filter(u => u.district_id === formData.district);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await axiosSecure.put(`/requests/${id}`, formData);
      toast.success("Request updated successfully! 🎉");
      navigate("/dashboard/my-request");
    } catch (err) {
      console.error("Update failed", err);
      toast.error("Failed to update request");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-50 to-white">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 size={48} className="text-red-600" />
        </motion.div>
        <p className="mt-4 text-gray-600 font-medium"><Loading/> request data...</p>
      </div>
    );
  }

  const InputWrapper = ({ icon, label, required, children }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-2"
    >
      <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
        {icon}
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-block bg-gradient-to-r from-red-600 to-red-700 p-4 rounded-2xl mb-4 shadow-lg"
          >
            <Edit3 size={40} className="text-white" />
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Edit Blood Request
          </h2>
          <p className="text-gray-600">Update the donation request details</p>
        </div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl border border-red-100 p-8 md:p-10"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Recipient & Blood Group */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputWrapper icon={<Heart size={18} className="text-red-600" />} label="Recipient Name" required>
                <input
                  type="text"
                  name="recipientName"
                  value={formData.recipientName || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                  required
                />
              </InputWrapper>

              <InputWrapper icon={<Droplet size={18} className="text-red-600" />} label="Blood Group" required>
                <select
                  name="blood_group"
                  value={formData.blood_group || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all appearance-none cursor-pointer"
                  required
                >
                  <option value="">Select Blood Group</option>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
              </InputWrapper>
            </div>

            {/* Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputWrapper icon={<MapPin size={18} className="text-red-600" />} label="District" required>
                <select
                  name="district"
                  value={formData.district || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all appearance-none cursor-pointer"
                  required
                >
                  <option value="">Select District</option>
                  {districts.map((d) => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </InputWrapper>

              <InputWrapper icon={<MapPin size={18} className="text-red-600" />} label="Upazila" required>
                <select
                  name="upazila"
                  value={formData.upazila || ""}
                  onChange={handleChange}
                  disabled={!formData.district}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all appearance-none cursor-pointer disabled:bg-gray-100 disabled:cursor-not-allowed"
                  required
                >
                  <option value="">Select Upazila</option>
                  {filteredUpazilas.map((u) => (
                    <option key={u.id} value={u.name}>{u.name}</option>
                  ))}
                </select>
              </InputWrapper>
            </div>

            {/* Hospital & Address */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputWrapper icon={<Building2 size={18} className="text-red-600" />} label="Hospital Name" required>
                <input
                  type="text"
                  name="hospital"
                  value={formData.hospital || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                  required
                />
              </InputWrapper>

              <InputWrapper icon={<MapPin size={18} className="text-red-600" />} label="Full Address" required>
                <input
                  type="text"
                  name="address"
                  value={formData.address || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                  required
                />
              </InputWrapper>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputWrapper icon={<Calendar size={18} className="text-red-600" />} label="Donation Date" required>
                <input
                  type="date"
                  name="donation_date"
                  value={formData.donation_date || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                  required
                />
              </InputWrapper>

              <InputWrapper icon={<Clock size={18} className="text-red-600" />} label="Donation Time" required>
                <input
                  type="time"
                  name="donation_time"
                  value={formData.donation_time || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                  required
                />
              </InputWrapper>
            </div>

            {/* Message */}
            <InputWrapper icon={<MessageSquare size={18} className="text-red-600" />} label="Request Message">
              <textarea
                name="request_message"
                value={formData.request_message || ""}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all resize-none"
                rows="3"
              />
            </InputWrapper>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
              >
                <X size={20} />
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={submitting}
                className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-red-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Loader2 size={20} />
                    </motion.div>
                    Updating...
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    Update Request
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default EditRequest;