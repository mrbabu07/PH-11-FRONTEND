// src/Pages/Register.jsx
import React, { useState } from "react";
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
  FaHome,
  FaGoogle,
  FaLock,
  FaEnvelope,
  FaUser,
  FaImage,
} from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import axios from "axios";

const googleProvider = new GoogleAuthProvider();

const Register = () => {
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);

  // Upload image to ImgBB
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
      toast.error("Image upload failed. Skipping image.");
      return "";
    }
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();
    const role = e.target.role.value;
    

    if (!email || !password) {
      toast.error("Email and password are required.");
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
      await axios.post("http://localhost:5000/users", {
        name,
        email,
        password, // optional: usually not stored plaintext
        photoURL,
        role,
        createdAt: new Date(),
      });

      toast.success("Account created successfully!");
      navigate("/");
    } catch (err) {
      console.error(err);
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

      // Save Google user to backend
      await axios.post("http://localhost:5000/users", {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        role: "buyer",
        createdAt: new Date(),
      });

      toast.success("Welcome!");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Google sign-in failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-teal-50 dark:from-gray-900 dark:to-blue-900 p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-teal-500 p-6 text-center">
          <FaHome className="text-white text-3xl mx-auto mb-3" />
          <h2 className="text-2xl font-bold text-white">Create Account</h2>
          <p className="text-blue-100 mt-1">Join our community</p>
        </div>

        {/* Form */}
        <div className="p-8">
          <form onSubmit={handleRegistration} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                Full Name
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Enter your full name"
                  className="w-full pl-10 pr-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
            <select name="role" className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700" defaultValue="Choose a Role" className="select">
              <option disabled={true}>Choose a role</option>
              
              <option value='user'>User</option>
              <option value='manager'>Manager</option>
            </select>

            {/* Password */}
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-3 text-gray-400" />
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  name="password"
                  required
                  placeholder="Enter a strong password"
                  className="w-full pl-10 pr-12 py-3 border rounded-lg dark:bg-gray-700 dark:text-white"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-3 text-gray-400"
                >
                  {isPasswordVisible ? <IoEyeOff /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Profile Image */}
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                Profile Image (optional)
              </label>
              <div className="relative">
                <FaImage className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="w-full pl-10 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 text-center text-gray-500">OR</div>

          <button
            onClick={handleGoogleRegister}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 border py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300"
          >
            <FaGoogle className="text-red-500" /> Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
