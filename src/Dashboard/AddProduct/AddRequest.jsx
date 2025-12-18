// // src/Pages/AddRequest.jsx
// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { AuthContext } from "../../Context/AuthProvider";
// import useAxiosSecure from "../../hooks/useAxiosSecure";

// const AddRequest = () => {
//   const { user } = useContext(AuthContext);
//   const [districts, setDistricts] = useState([]);
//   const [upazilas, setUpazilas] = useState([]);

//   const [selectedDistrictId, setSelectedDistrictId] = useState("");
//   const [district, setDistrict] = useState("");

//   const [selectedUpazilaId, setSelectedUpazilaId] = useState("");
//   const [upazila, setUpazila] = useState("");

//   const [isLoading, setIsLoading] = useState(false);

//   const axiosSecure = useAxiosSecure(); 

//   // Load districts and upazilas
//   useEffect(() => {
//     axios
//       .get("/district.json")
//       .then((res) => {
//         if (res.data?.districts) setDistricts(res.data.districts);
//       })
//       .catch((err) => console.error("District load error:", err));

//     axios
//       .get("/upazila.json")
//       .then((res) => {
//         if (res.data?.upazilas) setUpazilas(res.data.upazilas);
//       })
//       .catch((err) => console.error("Upazila load error:", err));
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     const requesterName = e.target.requesterName.value.trim();
//     const requesterEmail = e.target.requesterEmail.value.trim();
//     const recipientName = e.target.recipientName.value.trim();
//     const hospital = e.target.hospital.value.trim();
//     const address = e.target.address.value.trim();
//     const request_message = e.target.request_message.value.trim();
//     const blood_group = e.target.blood_group.value;
//     const donation_date = e.target.donation_date.value;
//     const donation_time = e.target.donation_time.value;

//     if (
//       !requesterName ||
//       !requesterEmail ||
//       !recipientName ||
//       !district ||
//       !upazila ||
//       !hospital ||
//       !address ||
//       !blood_group ||
//       !donation_date ||
//       !donation_time
//     ) {
//       toast.error("Please fill all required fields.");
//       setIsLoading(false);
//       return;
//     }

//     try {
//       await axiosSecure.post("/requests", {
//         requesterName,
//         requesterEmail,
//         recipientName,
//         district,
//         upazila,
//         hospital,
//         address,
//         request_message,
//         blood_group,
//         donation_date,
//         donation_time,
//         donation_status: "pending",
//         createdAt: new Date(),
//       });

//       toast.success("Blood request submitted!");
//       e.target.reset();

//       setDistrict("");
//       setUpazila("");
//       setSelectedDistrictId("");
//       setSelectedUpazilaId("");
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to submit request.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
//       <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg border p-8">
//         <h2 className="text-2xl font-bold mb-6 text-center">
//           Add Blood Request
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">

//           {/* Requester Name */}
//           <div>
//             <label className="block mb-1">Requester Name</label>
//             <input
//               type="text"
//               value={user?.displayName}
//               readOnly
//               name="requesterName"
//               className="w-full border rounded-lg px-4 py-2"
//               required
//             />
//           </div>

//           {/* Requester Email */}
//           <div>
//             <label className="block mb-1">Requester Email</label>
//             <input
//               type="email"
//               value={user?.email}
//               readOnly
//               name="requesterEmail"
//               className="w-full border rounded-lg px-4 py-2"
//               required
//             />
//           </div>

//           {/* Recipient Name */}
//           <div>
//             <label className="block mb-1">Recipient Name</label>
//             <input
//               type="text"
//               name="recipientName"
//               placeholder="Recipient full name"
//               className="w-full border rounded-lg px-4 py-2"
//               required
//             />
//           </div>

//           {/* Recipient Blood Group */}
//           <div>
//             <label className="block mb-1">Recipient Blood Group</label>
//             <select
//               name="blood_group"
//               required
//               defaultValue=""
//               className="w-full border rounded-lg px-4 py-2"
//             >
//               <option value="" disabled>
//                 Select Blood Group
//               </option>
//               {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
//                 <option key={bg} value={bg}>
//                   {bg}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* District */}
//           <div>
//             <label className="block mb-1">District</label>
//             <select
//               value={selectedDistrictId}
//               onChange={(e) => {
//                 const id = e.target.value;
//                 setSelectedDistrictId(id);
//                 setUpazila("");
//                 setSelectedUpazilaId("");

//                 const selected = districts.find((d) => d.id === id);
//                 setDistrict(selected?.name || "");
//               }}
//               className="w-full border rounded-lg px-4 py-2"
//               required
//             >
//               <option value="">Select District</option>
//               {districts.map((d) => (
//                 <option key={d.id} value={d.id}>
//                   {d.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Upazila */}
//           <div>
//             <label className="block mb-1">Upazila</label>
//             <select
//               value={selectedUpazilaId}
//               onChange={(e) => {
//                 const id = e.target.value;
//                 setSelectedUpazilaId(id);

//                 const selected = upazilas.find((u) => u.id === id);
//                 setUpazila(selected?.name || "");
//               }}
//               className="w-full border rounded-lg px-4 py-2"
//               required
//             >
//               <option value="">Select Upazila</option>

//               {upazilas
//                 .filter((u) => u.district_id === selectedDistrictId)
//                 .map((u) => (
//                   <option key={u.id} value={u.id}>
//                     {u.name}
//                   </option>
//                 ))}
//             </select>
//           </div>

//           {/* Hospital */}
//           <div>
//             <label className="block mb-1">Hospital Name</label>
//             <input
//               type="text"
//               name="hospital"
//               className="w-full border rounded-lg px-4 py-2"
//               placeholder="Hospital name"
//               required
//             />
//           </div>

//           {/* Full Address */}
//           <div>
//             <label className="block mb-1">Full Address</label>
//             <input
//               type="text"
//               name="address"
//               className="w-full border rounded-lg px-4 py-2"
//               placeholder="Full address (street, area)"
//               required
//             />
//           </div>

//           {/* Donation Date */}
//           <div>
//             <label className="block mb-1">Donation Date</label>
//             <input
//               type="date"
//               name="donation_date"
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
//               className="w-full border rounded-lg px-4 py-2"
//               required
//             />
//           </div>

//           {/* Request Message */}
//           <div>
//             <label className="block mb-1">Request Message</label>
//             <textarea
//               name="request_message"
//               placeholder="Any additional info"
//               className="w-full border rounded-lg px-4 py-2"
//               rows="4"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold"
//           >
//             {isLoading ? "Submitting..." : "Submit Request"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddRequest;



import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../../Context/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { motion } from "framer-motion";
import { 
  User, Mail, Heart, MapPin, Building2, 
  Calendar, Clock, MessageSquare, Droplet, Send 
} from "lucide-react";

const AddRequest = () => {
  const { user } = useContext(AuthContext);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  const [selectedDistrictId, setSelectedDistrictId] = useState("");
  const [district, setDistrict] = useState("");

  const [selectedUpazilaId, setSelectedUpazilaId] = useState("");
  const [upazila, setUpazila] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const axiosSecure = useAxiosSecure();

  // Load districts and upazilas
  useEffect(() => {
    axios
      .get("/district.json")
      .then((res) => {
        if (res.data?.districts) setDistricts(res.data.districts);
      })
      .catch((err) => console.error("District load error:", err));

    axios
      .get("/upazila.json")
      .then((res) => {
        if (res.data?.upazilas) setUpazilas(res.data.upazilas);
      })
      .catch((err) => console.error("Upazila load error:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const requesterName = e.target.requesterName.value.trim();
    const requesterEmail = e.target.requesterEmail.value.trim();
    const recipientName = e.target.recipientName.value.trim();
    const hospital = e.target.hospital.value.trim();
    const address = e.target.address.value.trim();
    const request_message = e.target.request_message.value.trim();
    const blood_group = e.target.blood_group.value;
    const donation_date = e.target.donation_date.value;
    const donation_time = e.target.donation_time.value;

    if (
      !requesterName ||
      !requesterEmail ||
      !recipientName ||
      !district ||
      !upazila ||
      !hospital ||
      !address ||
      !blood_group ||
      !donation_date ||
      !donation_time
    ) {
      toast.error("Please fill all required fields.");
      setIsLoading(false);
      return;
    }

    try {
      await axiosSecure.post("/requests", {
        requesterName,
        requesterEmail,
        recipientName,
        district,
        upazila,
        hospital,
        address,
        request_message,
        blood_group,
        donation_date,
        donation_time,
        donation_status: "pending",
        createdAt: new Date(),
      });

      toast.success("Blood request submitted successfully! 🎉");
      e.target.reset();

      setDistrict("");
      setUpazila("");
      setSelectedDistrictId("");
      setSelectedUpazilaId("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit request.");
    } finally {
      setIsLoading(false);
    }
  };

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
            <Heart size={40} className="text-white" fill="white" />
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Create Blood Request
          </h2>
          <p className="text-gray-600">Fill in the details to request blood donation</p>
        </div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl border border-red-100 p-8 md:p-10"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Requester Info - Read Only */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-gray-200">
              <InputWrapper icon={<User size={18} className="text-red-600" />} label="Your Name">
                <div className="relative">
                  <input
                    type="text"
                    value={user?.displayName || ""}
                    readOnly
                    name="requesterName"
                    className="w-full pl-4 pr-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-700 font-medium"
                  />
                </div>
              </InputWrapper>

              <InputWrapper icon={<Mail size={18} className="text-red-600" />} label="Your Email">
                <div className="relative">
                  <input
                    type="email"
                    value={user?.email || ""}
                    readOnly
                    name="requesterEmail"
                    className="w-full pl-4 pr-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-700 font-medium"
                  />
                </div>
              </InputWrapper>
            </div>

            {/* Recipient Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputWrapper icon={<Heart size={18} className="text-red-600" />} label="Recipient Name" required>
                <input
                  type="text"
                  name="recipientName"
                  placeholder="Enter recipient's full name"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                  required
                />
              </InputWrapper>

              <InputWrapper icon={<Droplet size={18} className="text-red-600" />} label="Blood Group" required>
                <select
                  name="blood_group"
                  required
                  defaultValue=""
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all appearance-none cursor-pointer"
                >
                  <option value="" disabled>Select Blood Group</option>
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
                  value={selectedDistrictId}
                  onChange={(e) => {
                    const id = e.target.value;
                    setSelectedDistrictId(id);
                    setUpazila("");
                    setSelectedUpazilaId("");
                    const selected = districts.find((d) => d.id === id);
                    setDistrict(selected?.name || "");
                  }}
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
                  value={selectedUpazilaId}
                  onChange={(e) => {
                    const id = e.target.value;
                    setSelectedUpazilaId(id);
                    const selected = upazilas.find((u) => u.id === id);
                    setUpazila(selected?.name || "");
                  }}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all appearance-none cursor-pointer disabled:bg-gray-100 disabled:cursor-not-allowed"
                  required
                  disabled={!selectedDistrictId}
                >
                  <option value="">Select Upazila</option>
                  {upazilas
                    .filter((u) => u.district_id === selectedDistrictId)
                    .map((u) => (
                      <option key={u.id} value={u.id}>{u.name}</option>
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
                  placeholder="e.g., Dhaka Medical College Hospital"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                  required
                />
              </InputWrapper>

              <InputWrapper icon={<MapPin size={18} className="text-red-600" />} label="Full Address" required>
                <input
                  type="text"
                  name="address"
                  placeholder="Street, area, landmarks"
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
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                  required
                />
              </InputWrapper>

              <InputWrapper icon={<Clock size={18} className="text-red-600" />} label="Donation Time" required>
                <input
                  type="time"
                  name="donation_time"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                  required
                />
              </InputWrapper>
            </div>

            {/* Message */}
            <InputWrapper icon={<MessageSquare size={18} className="text-red-600" />} label="Request Message">
              <textarea
                name="request_message"
                placeholder="Provide any additional information about the blood requirement..."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all resize-none"
                rows="4"
              />
            </InputWrapper>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-red-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  Submitting Request...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Submit Blood Request
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AddRequest;