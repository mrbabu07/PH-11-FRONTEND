// import React, { useEffect, useState } from "react";
// import {
//   createUserWithEmailAndPassword,
//   updateProfile,
//   GoogleAuthProvider,
//   signInWithPopup,
// } from "firebase/auth";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import { auth } from "../Firebase/Firebase.config";
// import {
//   FaEye,
//   FaHome,
//   FaGoogle,
//   FaLock,
//   FaEnvelope,
//   FaUser,
//   FaImage,
// } from "react-icons/fa";
// import { IoEyeOff } from "react-icons/io5";
// import axios from "axios";

// const googleProvider = new GoogleAuthProvider();

// const Register = () => {
//   const navigate = useNavigate();

//   const [isPasswordVisible, setIsPasswordVisible] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [imageFile, setImageFile] = useState(null);

//   const [district, setDistrict] = useState("");
//   const [upazila, setUpazila] = useState("");

//   const [districts, setDistricts] = useState([]);
//   const [upazilas, setUpazilas] = useState([]);

//   // Load districts and upazilas
//   useEffect(() => {
//     axios
//       .get("/district.json")
//       .then((res) => {
//         if (res.data && res.data.districts) setDistricts(res.data.districts);
//       })
//       .catch((err) => console.error("District load error:", err));

//     axios
//       .get("/upazila.json")
//       .then((res) => {
//         if (res.data && res.data.upazilas) setUpazilas(res.data.upazilas);
//       })
//       .catch((err) => console.error("Upazila load error:", err));
//   }, []);

//   const togglePasswordVisibility = () =>
//     setIsPasswordVisible(!isPasswordVisible);

//   const handleImageUpload = async () => {
//     if (!imageFile) return "";
//     const formData = new FormData();
//     formData.append("image", imageFile);

//     try {
//       const res = await axios.post(
//         "https://api.imgbb.com/1/upload?key=c2caab6a740c87821a7d96195c7f7cf3",
//         formData
//       );
//       return res.data.data.display_url;
//     } catch (err) {
//       toast.error("Image upload failed.");
//       return "";
//     }
//   };

//   const handleRegistration = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     const name = e.target.name.value.trim();
//     const email = e.target.email.value.trim();
//     const password = e.target.password.value.trim();
//     const blood = e.target.blood.value;

//     if (!name || !email || !password || !blood || !district || !upazila) {
//       toast.error("Please fill all fields.");
//       setIsLoading(false);
//       return;
//     }

//     if (password.length < 6) {
//       toast.error("Password must be at least 6 characters.");
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const photoURL = await handleImageUpload();

//       // Firebase registration
//       const result = await createUserWithEmailAndPassword(auth, email, password);
//       await updateProfile(result.user, { displayName: name, photoURL });

//       // Save user to backend
//       await axios.post("https://ph-11-backend-mocha.vercel.app/users", {
//         name,
//         email,
//         password,
//         blood,
//         district,
//         upazila,
//         photoURL,
//         createdAt: new Date(),
//       });

//       toast.success("Account created!");
//       navigate("/");
//     } catch (err) {
//       toast.error(err.message || "Registration failed.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleGoogleRegister = async () => {
//     setIsLoading(true);
//     try {
//       const googleRes = await signInWithPopup(auth, googleProvider);
//       const user = googleRes.user;

//       await axios.post("https://ph-11-backend-mocha.vercel.app/users", {
//         name: user.displayName,
//         email: user.email,
//         blood: "",
//         district: "",
//         upazila: "",
//         photoURL: user.photoURL,
//         createdAt: new Date(),
//       });

//       toast.success("Welcome!");
//       navigate("/");
//     } catch (err) {
//       toast.error("Google login failed.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-teal-50 p-4">
//       <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border overflow-hidden">
//         <div className="bg-blue-600 p-6 text-center">
//           <FaHome className="text-white text-3xl mx-auto mb-3" />
//           <h2 className="text-2xl font-bold text-white">Create Account</h2>
//           <p className="text-blue-100">Join our blood donor community</p>
//         </div>

//         <div className="p-8">
//           <form onSubmit={handleRegistration} className="space-y-5">
//             {/* Name */}
//             <div>
//               <label className="block mb-1">Full Name</label>
//               <div className="relative">
//                 <FaUser className="absolute left-3 top-3 text-gray-400" />
//                 <input
//                   type="text"
//                   name="name"
//                   required
//                   placeholder="Enter your name"
//                   className="w-full pl-10 pr-3 py-3 border rounded-lg"
//                 />
//               </div>
//             </div>

//             {/* Email */}
//             <div>
//               <label className="block mb-1">Email</label>
//               <div className="relative">
//                 <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
//                 <input
//                   type="email"
//                   name="email"
//                   required
//                   placeholder="Enter email"
//                   className="w-full pl-10 pr-3 py-3 border rounded-lg"
//                 />
//               </div>
//             </div>

//             {/* Blood Group */}
//             <div>
//               <label className="block mb-1">Blood Group</label>
//               <select
//                 name="blood"
//                 required
//                 defaultValue=""
//                 className="w-full py-3 px-4 border rounded-lg"
//               >
//                 <option value="" disabled>
//                   Select Blood Group
//                 </option>
//                 {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
//                   (g) => (
//                     <option key={g} value={g}>
//                       {g}
//                     </option>
//                   )
//                 )}
//               </select>
//             </div>

//             {/* District */}
//             <div>
//               <label className="block mb-1">District</label>
//               <select
//                 name="district"
//                 required
//                 value={district}
//                 onChange={(e) => {
//                   setDistrict(e.target.value);
//                   setUpazila("");
//                 }}
//                 className="w-full py-3 px-4 border rounded-lg"
//               >
//                 <option value="">Select District</option>
//                 {districts.map((d) => (
//                   <option key={d.id} value={d.id}>
//                     {d.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Upazila */}
//             <div>
//               <label className="block mb-1">Upazila</label>
//               <select
//                 name="upazila"
//                 required
//                 value={upazila}
//                 onChange={(e) => setUpazila(e.target.value)}
//                 className="w-full py-3 px-4 border rounded-lg"
//               >
//                 <option value="">Select Upazila</option>
//                 {upazilas
//                   .filter((u) => u.district_id === district)
//                   .map((u) => (
//                     <option key={u.id} value={u.name}>
//                       {u.name}
//                     </option>
//                   ))}
//               </select>
//             </div>

//             {/* Password */}
//             <div>
//               <label className="block mb-1">Password</label>
//               <div className="relative">
//                 <FaLock className="absolute left-3 top-3 text-gray-400" />
//                 <input
//                   type={isPasswordVisible ? "text" : "password"}
//                   name="password"
//                   required
//                   placeholder="Enter password"
//                   className="w-full pl-10 pr-12 py-3 border rounded-lg"
//                 />
//                 <button
//                   type="button"
//                   onClick={togglePasswordVisibility}
//                   className="absolute right-3 top-3"
//                 >
//                   {isPasswordVisible ? <IoEyeOff /> : <FaEye />}
//                 </button>
//               </div>
//             </div>

//             {/* Image */}
//             <div>
//               <label className="block mb-1">Profile Image (optional)</label>
//               <div className="relative">
//                 <FaImage className="absolute left-3 top-3 text-gray-400" />
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) => setImageFile(e.target.files[0])}
//                   className="w-full pl-10 py-2 border rounded-lg"
//                 />
//               </div>
//             </div>

//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold"
//             >
//               {isLoading ? "Creating..." : "Create Account"}
//             </button>
//           </form>

//           <div className="my-6 text-center text-gray-500">OR</div>

//           <button
//             onClick={handleGoogleRegister}
//             disabled={isLoading}
//             className="w-full flex items-center justify-center gap-3 border py-3 rounded-lg"
//           >
//             <FaGoogle className="text-red-500" /> Continue with Google
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;

import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { auth } from "../Firebase/Firebase.config";
import {
  FaEye,
  FaGoogle,
  FaLock,
  FaEnvelope,
  FaUser,
  FaImage,
} from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { Heart, Droplet, ArrowRight, MapPin } from "lucide-react";
import axios from "axios";
import { motion } from "framer-motion";

const googleProvider = new GoogleAuthProvider();

const Register = () => {
  const navigate = useNavigate();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  // Load districts and upazilas
  useEffect(() => {
    axios
      .get("/district.json")
      .then((res) => {
        if (res.data && res.data.districts) setDistricts(res.data.districts);
      })
      .catch((err) => console.error("District load error:", err));

    axios
      .get("/upazila.json")
      .then((res) => {
        if (res.data && res.data.upazilas) setUpazilas(res.data.upazilas);
      })
      .catch((err) => console.error("Upazila load error:", err));
  }, []);

  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile) return "";
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const res = await axios.post(
        "https://api.imgbb.com/1/upload?key=c2caab6a740c87821a7d96195c7f7cf3",
        formData
      );
      return res.data.data.display_url;
    } catch (err) {
      toast.error("Image upload failed.");
      return "";
    }
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();
    const blood = e.target.blood.value;

    if (!name || !email || !password || !blood || !district || !upazila) {
      toast.error("Please fill all required fields.");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      setIsLoading(false);
      return;
    }

    try {
      const photoURL = await handleImageUpload();

      // Firebase registration
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(result.user, { displayName: name, photoURL });

      // Save user to backend
      await axios.post("https://ph-11-backend-mocha.vercel.app/users", {
        name,
        email,
        password,
        blood,
        district,
        upazila,
        photoURL,
        createdAt: new Date(),
      });

      toast.success("Account created successfully! 🎉");
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Registration failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setIsLoading(true);
    try {
      const googleRes = await signInWithPopup(auth, googleProvider);
      const user = googleRes.user;

      await axios.post("https://ph-11-backend-mocha.vercel.app/users", {
        name: user.displayName,
        email: user.email,
        blood: "",
        district: "",
        upazila: "",
        photoURL: user.photoURL,
        createdAt: new Date(),
      });

      toast.success("Welcome! 🎉");
      navigate("/");
    } catch (err) {
      toast.error("Google registration failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-red-100 p-4 py-12 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-red-200 opacity-20"
            initial={{ y: -100, x: `${i * 25}%` }}
            animate={{
              y: "110vh",
              rotate: 360,
            }}
            transition={{
              duration: 20 + i * 3,
              repeat: Infinity,
              ease: "linear",
              delay: i * 1.5,
            }}
          >
            <Droplet size={30 + i * 8} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-red-100 overflow-hidden relative z-10"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 p-8 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            ></div>
          </div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4, type: "spring" }}
            className="relative"
          >
            <div className="flex items-center justify-center mb-4">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
                <Heart className="text-white" size={32} fill="white" />
              </div>
            </div>
          </motion.div>

          <h2 className="text-2xl font-bold text-white mb-2 relative">
            Create Account
          </h2>
          <p className="text-red-100 relative">
            Join our blood donor community
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="p-8 max-h-[calc(100vh-16rem)] overflow-y-auto"
        >
          <form onSubmit={handleRegistration} className="space-y-5">
            {/* Name */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name *
              </label>
              <div className="relative group">
                <FaUser className="absolute left-4 top-4 text-gray-400 group-focus-within:text-red-600 transition-colors" />
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Enter your full name"
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                />
              </div>
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address *
              </label>
              <div className="relative group">
                <FaEnvelope className="absolute left-4 top-4 text-gray-400 group-focus-within:text-red-600 transition-colors" />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="your@email.com"
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                />
              </div>
            </motion.div>

            {/* Blood Group */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Blood Group *
              </label>
              <div className="relative group">
                <Droplet
                  className="absolute left-4 top-4 text-gray-400 group-focus-within:text-red-600 transition-colors"
                  size={18}
                />
                <select
                  name="blood"
                  required
                  defaultValue=""
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all appearance-none cursor-pointer"
                >
                  <option value="" disabled>
                    Select Blood Group
                  </option>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                    (g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    )
                  )}
                </select>
              </div>
            </motion.div>

            {/* District */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                District *
              </label>
              <div className="relative group">
                <MapPin
                  className="absolute left-4 top-4 text-gray-400 group-focus-within:text-red-600 transition-colors"
                  size={18}
                />
                <select
                  name="district"
                  required
                  value={district}
                  onChange={(e) => {
                    setDistrict(e.target.value);
                    setUpazila("");
                  }}
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all appearance-none cursor-pointer"
                >
                  <option value="">Select District</option>
                  {districts.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>
            </motion.div>

            {/* Upazila */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Upazila *
              </label>
              <div className="relative group">
                <MapPin
                  className="absolute left-4 top-4 text-gray-400 group-focus-within:text-red-600 transition-colors"
                  size={18}
                />
                <select
                  name="upazila"
                  required
                  value={upazila}
                  onChange={(e) => setUpazila(e.target.value)}
                  disabled={!district}
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all appearance-none cursor-pointer disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">Select Upazila</option>
                  {upazilas
                    .filter((u) => u.district_id === district)
                    .map((u) => (
                      <option key={u.id} value={u.name}>
                        {u.name}
                      </option>
                    ))}
                </select>
              </div>
            </motion.div>

            {/* Password */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
            >
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password *
              </label>
              <div className="relative group">
                <FaLock className="absolute left-4 top-4 text-gray-400 group-focus-within:text-red-600 transition-colors" />
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  name="password"
                  required
                  placeholder="Min. 6 characters"
                  className="w-full pl-12 pr-12 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-4 top-4 text-gray-400 hover:text-red-600 transition-colors"
                >
                  {isPasswordVisible ? (
                    <IoEyeOff className="h-5 w-5" />
                  ) : (
                    <FaEye className="h-5 w-5" />
                  )}
                </motion.button>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
            >
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Profile Image (Optional)
              </label>
              <div className="relative">
                {imagePreview && (
                  <div className="mb-3 flex justify-center">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-24 h-24 rounded-full object-cover border-4 border-red-100"
                    />
                  </div>
                )}
                <label className="flex items-center justify-center gap-3 w-full p-4 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-red-500 hover:bg-red-50 transition-all group">
                  <FaImage className="text-gray-400 group-hover:text-red-600 transition-colors" />
                  <span className="text-sm text-gray-600 group-hover:text-red-600 font-medium">
                    {imageFile ? imageFile.name : "Choose profile image"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
            </motion.div>

            {/* Submit */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3.5 rounded-xl font-bold shadow-lg hover:shadow-red-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  Creating Account...
                </div>
              ) : (
                <>
                  Create Account
                  <ArrowRight
                    className="group-hover:translate-x-1 transition-transform"
                    size={20}
                  />
                </>
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.3 }}
            className="relative my-6"
          >
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">
                OR
              </span>
            </div>
          </motion.div>

          {/* Google Register */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.4 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGoogleRegister}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 py-3.5 border-2 border-gray-200 rounded-xl bg-white hover:bg-gray-50 font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaGoogle className="text-red-500 text-xl" />
            Continue with Google
          </motion.button>

          {/* Sign In Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.5 }}
            className="mt-6 text-center"
          >
            <p className="text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-red-600 hover:text-red-700 font-bold transition-colors hover:underline"
              >
                Sign in here
              </button>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Register;
