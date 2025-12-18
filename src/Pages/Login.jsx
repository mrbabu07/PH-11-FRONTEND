// import {
//   GoogleAuthProvider,
//   signInWithEmailAndPassword,
//   signInWithPopup,
// } from "firebase/auth";
// import React, { useRef, useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaEye, FaHome, FaGoogle, FaLock, FaEnvelope } from "react-icons/fa";
// import { IoEyeOff } from "react-icons/io5";
// import toast from "react-hot-toast";
// import { auth } from "../Firebase/Firebase.config";
// import { AuthContext } from "../context/AuthProvider";

// const googleProvider = new GoogleAuthProvider();

// const Login = () => {
//   const navigate = useNavigate();
//   const emailInputRef = useRef(null);
//   const [isPasswordVisible, setIsPasswordVisible] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const { user, role, loading } = useContext(AuthContext);

//   const handleEmailLogin = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     const emailValue = e.target.email.value;
//     const passwordValue = e.target.password.value;

//     if (!emailValue || !passwordValue) {
//       toast.error("Please enter both email and password.");
//       setIsLoading(false);
//       return;
//     }

//     try {
//       await signInWithEmailAndPassword(auth, emailValue, passwordValue);
//       toast.success("Logged in successfully!");
//       navigate("/");
//     } catch (error) {
//       const errorMsg = error.message.includes("wrong-password")
//         ? "Incorrect password. Please try again."
//         : "Could not sign you in. Please check your credentials.";
//       toast.error(errorMsg);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleGoogleLogin = async () => {
//     setIsLoading(true);
//     try {
//       await signInWithPopup(auth, googleProvider);
//       toast.success("Logged in with Google!");
//       navigate("/");
//     } catch {
//       toast.error("Google sign-in failed. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-teal-50 dark:from-gray-900 dark:to-blue-900 p-4">
//       <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
//         {/* Header */}
//         <div className="bg-gradient-to-r from-blue-600 to-teal-500 p-6 text-center">
//           <div className="flex items-center justify-center mb-4">
//             <FaHome className="text-white text-2xl mr-2" />
//           </div>
//           <h2 className="text-xl font-semibold text-white">Welcome Back</h2>
//           <p className="text-blue-100 mt-2">Sign in to your account</p>
//         </div>

//         {/* Form */}
//         <div className="p-8">
//           <form onSubmit={handleEmailLogin} className="space-y-6">
//             {/* Email */}
//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                 Email Address
//               </label>
//               <div className="relative">
//                 <FaEnvelope className="absolute top-3 left-3 text-gray-400 pointer-events-none" />
//                 <input
//                   type="email"
//                   name="email"
//                   ref={emailInputRef}
//                   className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                   placeholder="Enter your email"
//                   required
//                 />
//               </div>
//             </div>

//             {/* Password */}
//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                 Password
//               </label>
//               <div className="relative">
//                 <FaLock className="absolute top-3 left-3 text-gray-400 pointer-events-none" />
//                 <input
//                   type={isPasswordVisible ? "text" : "password"}
//                   name="password"
//                   className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                   placeholder="Enter your password"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={togglePasswordVisibility}
//                   className="absolute top-3 right-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
//                 >
//                   {isPasswordVisible ? <IoEyeOff className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
//                 </button>
//               </div>
//             </div>

//             {/* Forgot Password */}
//             <div className="flex justify-end">
//               <button
//                 type="button"
//                 onClick={() =>
//                   navigate(`/forgot-password?email=${emailInputRef.current?.value || ""}`)
//                 }
//                 className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
//               >
//                 Forgot your password?
//               </button>
//             </div>

//             {/* Submit */}
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full bg-gradient-to-r from-blue-800 to-teal-500 hover:from-blue-300 hover:to-teal-600 text-white py-3 px-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:transform-none disabled:hover:shadow-lg"
//             >
//               {isLoading ? (
//                 <div className="flex items-center justify-center">
//                   <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-2"></div>
//                   Signing In...
//                 </div>
//               ) : (
//                 "Sign In"
//               )}
//             </button>
//           </form>

//           {/* Google Login */}
//           <button
//             onClick={handleGoogleLogin}
//             disabled={isLoading}
//             className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 font-medium shadow-md hover:shadow-lg transition-all duration-200 mt-6"
//           >
//             <FaGoogle className="text-red-500" />
//             Continue with Google
//           </button>

//           {/* Sign Up */}
//           <div className="mt-8 text-center">
//             <p className="text-gray-600 dark:text-gray-400">
//               Don't have an account?{" "}
//               <button
//                 onClick={() => navigate("/register")}
//                 className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold transition-colors"
//               >
//                 Create one here
//               </button>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import React, { useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaGoogle, FaLock, FaEnvelope } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { Heart, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import { auth } from "../Firebase/Firebase.config";
import { AuthContext } from "../context/AuthProvider";
import { motion } from "framer-motion";

const googleProvider = new GoogleAuthProvider();

const Login = () => {
  const navigate = useNavigate();
  const emailInputRef = useRef(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { user, role, loading } = useContext(AuthContext);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const emailValue = e.target.email.value;
    const passwordValue = e.target.password.value;

    if (!emailValue || !passwordValue) {
      toast.error("Please enter both email and password.");
      setIsLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, emailValue, passwordValue);
      toast.success("Logged in successfully! 🎉");
      navigate("/");
    } catch (error) {
      const errorMsg = error.message.includes("wrong-password")
        ? "Incorrect password. Please try again."
        : "Could not sign you in. Please check your credentials.";
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Logged in with Google! 🎉");
      navigate("/");
    } catch {
      toast.error("Google sign-in failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Heart size={48} className="text-red-600" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-red-100 p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-red-200 opacity-20"
            initial={{ y: -100, x: `${i * 25}%` }}
            animate={{ 
              y: "110vh",
              rotate: 360
            }}
            transition={{
              duration: 20 + i * 3,
              repeat: Infinity,
              ease: "linear",
              delay: i * 1
            }}
          >
            <Heart size={40 + i * 10} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-red-100 relative z-10"
      >
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 p-8 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
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
          
          <h2 className="text-2xl font-bold text-white mb-2 relative">Welcome Back</h2>
          <p className="text-red-100 relative">Sign in to continue saving lives</p>
        </motion.div>

        {/* Form */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="p-8"
        >
          <form onSubmit={handleEmailLogin} className="space-y-6">
            {/* Email */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="space-y-2"
            >
              <label className="block text-sm font-semibold text-gray-700">
                Email Address
              </label>
              <div className="relative group">
                <FaEnvelope className="absolute top-4 left-4 text-gray-400 group-focus-within:text-red-600 transition-colors" />
                <input
                  type="email"
                  name="email"
                  ref={emailInputRef}
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </motion.div>

            {/* Password */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="space-y-2"
            >
              <label className="block text-sm font-semibold text-gray-700">
                Password
              </label>
              <div className="relative group">
                <FaLock className="absolute top-4 left-4 text-gray-400 group-focus-within:text-red-600 transition-colors" />
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  name="password"
                  className="w-full pl-12 pr-12 py-3.5 border-2 border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                  placeholder="Enter your password"
                  required
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute top-4 right-4 text-gray-400 hover:text-red-600 transition-colors"
                >
                  {isPasswordVisible ? <IoEyeOff className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                </motion.button>
              </div>
            </motion.div>

            {/* Forgot Password */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex justify-end"
            >
              <button
                type="button"
                onClick={() =>
                  navigate(`/forgot-password?email=${emailInputRef.current?.value || ""}`)
                }
                className="text-sm text-red-600 hover:text-red-700 font-semibold transition-colors hover:underline"
              >
                Forgot password?
              </button>
            </motion.div>

            {/* Submit */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3.5 px-4 rounded-xl font-bold shadow-lg hover:shadow-red-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  Signing In...
                </div>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </>
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="relative my-8"
          >
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">OR</span>
            </div>
          </motion.div>

          {/* Google Login */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 py-3.5 px-4 border-2 border-gray-200 rounded-xl bg-white hover:bg-gray-50 text-gray-700 font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaGoogle className="text-red-500 text-xl" />
            Continue with Google
          </motion.button>

          {/* Sign Up */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.1 }}
            className="mt-8 text-center"
          >
            <p className="text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/register")}
                className="text-red-600 hover:text-red-700 font-bold transition-colors hover:underline"
              >
                Create one here
              </button>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;