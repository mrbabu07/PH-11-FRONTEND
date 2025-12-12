// src/Pages/Register.jsx
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
      toast.error("Please fill all fields.");
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
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName: name, photoURL });

      // Save user to backend
      await axios.post("http://localhost:5000/users", {
        name,
        email,
        password,
        blood,
        district,
        upazila,
        photoURL,
        createdAt: new Date(),
      });

      toast.success("Account created!");
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

      await axios.post("http://localhost:5000/users", {
        name: user.displayName,
        email: user.email,
        blood: "",
        district: "",
        upazila: "",
        photoURL: user.photoURL,
        createdAt: new Date(),
      });

      toast.success("Welcome!");
      navigate("/");
    } catch (err) {
      toast.error("Google login failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-teal-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border overflow-hidden">
        <div className="bg-blue-600 p-6 text-center">
          <FaHome className="text-white text-3xl mx-auto mb-3" />
          <h2 className="text-2xl font-bold text-white">Create Account</h2>
          <p className="text-blue-100">Join our blood donor community</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleRegistration} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block mb-1">Full Name</label>
              <div className="relative">
                <FaUser className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Enter your name"
                  className="w-full pl-10 pr-3 py-3 border rounded-lg"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1">Email</label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Enter email"
                  className="w-full pl-10 pr-3 py-3 border rounded-lg"
                />
              </div>
            </div>

            {/* Blood Group */}
            <div>
              <label className="block mb-1">Blood Group</label>
              <select
                name="blood"
                required
                defaultValue=""
                className="w-full py-3 px-4 border rounded-lg"
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

            {/* District */}
            <div>
              <label className="block mb-1">District</label>
              <select
                name="district"
                required
                value={district}
                onChange={(e) => {
                  setDistrict(e.target.value);
                  setUpazila("");
                }}
                className="w-full py-3 px-4 border rounded-lg"
              >
                <option value="">Select District</option>
                {districts.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Upazila */}
            <div>
              <label className="block mb-1">Upazila</label>
              <select
                name="upazila"
                required
                value={upazila}
                onChange={(e) => setUpazila(e.target.value)}
                className="w-full py-3 px-4 border rounded-lg"
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

            {/* Password */}
            <div>
              <label className="block mb-1">Password</label>
              <div className="relative">
                <FaLock className="absolute left-3 top-3 text-gray-400" />
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  name="password"
                  required
                  placeholder="Enter password"
                  className="w-full pl-10 pr-12 py-3 border rounded-lg"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-3"
                >
                  {isPasswordVisible ? <IoEyeOff /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Image */}
            <div>
              <label className="block mb-1">Profile Image (optional)</label>
              <div className="relative">
                <FaImage className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="w-full pl-10 py-2 border rounded-lg"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold"
            >
              {isLoading ? "Creating..." : "Create Account"}
            </button>
          </form>

          <div className="my-6 text-center text-gray-500">OR</div>

          <button
            onClick={handleGoogleRegister}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 border py-3 rounded-lg"
          >
            <FaGoogle className="text-red-500" /> Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
