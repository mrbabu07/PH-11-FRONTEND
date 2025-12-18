
// import React, { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../Context/AuthProvider";
// import useAxiosSecure from "../hooks/useAxiosSecure";
// import toast from "react-hot-toast";

// const AdminDashboard = () => {
//   const { user } = useContext(AuthContext);
//   const axiosSecure = useAxiosSecure();
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     totalFunding: 0,
//     totalRequests: 0,
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         // Fetch all 3 stats in parallel
//         const [usersRes, fundingRes, requestsRes] = await Promise.all([
//           axiosSecure.get("/users"),
//           axiosSecure.get("/funding/summary"),
//           axiosSecure.get("/donation-requests?field=count"),
//         ]);

//         setStats({
//           totalUsers: usersRes.data.length,
//           totalFunding: fundingRes.data.total || 0,
//           totalRequests: requestsRes.data.count || 0,
//         });
//         setLoading(false);
//       } catch (err) {
//         console.error("Failed to load stats", err);
//         toast.error("Failed to load dashboard stats");
//         setLoading(false);
//       }
//     };
//     fetchStats();
//   }, [axiosSecure]);

//   return (
//     <div className="space-y-8">
//       {/* Welcome Section (Same as Donor Dashboard) */}
//       <div className="bg-white p-6 rounded-xl shadow-sm">
//         <h1 className="text-2xl font-bold text-gray-800">
//           Welcome, <span className="text-red-600">{user?.displayName}</span>!
//         </h1>
//         <p className="text-gray-600">Admin dashboard for blood donation management.</p>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* Total Users */}
//         <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
//           <div className="flex items-center">
//             <div className="p-3 bg-blue-100 rounded-lg mr-4">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-6-6v1z" />
//               </svg>
//             </div>
//             <div>
//               <p className="text-gray-500 text-sm">Total Users</p>
//               <p className="text-2xl font-bold text-gray-800">{stats.totalUsers}</p>
//             </div>
//           </div>
//         </div>

//         {/* Total Funding */}
//         <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
//           <div className="flex items-center">
//             <div className="p-3 bg-green-100 rounded-lg mr-4">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//             </div>
//             <div>
//               <p className="text-gray-500 text-sm">Total Funding (USD)</p>
//               <p className="text-2xl font-bold text-gray-800">${stats.totalFunding.toFixed(2)}</p>
//             </div>
//           </div>
//         </div>

//         {/* Total Requests */}
//         <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-red-500">
//           <div className="flex items-center">
//             <div className="p-3 bg-red-100 rounded-lg mr-4">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//               </svg>
//             </div>
//             <div>
//               <p className="text-gray-500 text-sm">Total Requests</p>
//               <p className="text-2xl font-bold text-gray-800">{stats.totalRequests}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

// 
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Users, DollarSign, FileText, TrendingUp, Loader2 } from "lucide-react";
import Loading from "../Pages/Loading";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalFunding: 0,
    totalRequests: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch all 3 stats in parallel
        const [usersRes, fundingRes, requestsRes] = await Promise.all([
          axiosSecure.get("/users"),
          axiosSecure.get("/funding/summary"),
          axiosSecure.get("/donation-request?field=count"),
        ]);

        setStats({
          totalUsers: usersRes.data.length,
          totalFunding: fundingRes.data.total || 0,
          totalRequests: requestsRes.data.count || 0,
        });
        setLoading(false);
      } catch (err) {
        console.error("Failed to load stats", err);
        toast.error("Failed to load dashboard stats");
        setLoading(false);
      }
    };
    fetchStats();
  }, [axiosSecure]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 size={48} className="text-red-600" />
        </motion.div>
        <p className="mt-4 text-gray-600 font-medium"><Loading/> dashboard...</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-red-600 to-red-700 text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        <div className="relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Welcome back, <span className="text-red-100">{user?.displayName}</span>! 👋
            </h1>
          </motion.div>
          <p className="text-red-100 text-lg">Admin dashboard for blood donation management</p>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {/* Total Users Card */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
          className="bg-white rounded-2xl shadow-lg border-l-4 border-blue-500 p-6 hover:shadow-2xl transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-4 rounded-2xl">
              <Users size={32} className="text-blue-600" />
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="bg-blue-50 px-3 py-1 rounded-full"
            >
              <TrendingUp size={16} className="text-blue-600 inline mr-1" />
              <span className="text-blue-600 text-sm font-bold">Active</span>
            </motion.div>
          </div>
          <div>
            <p className="text-gray-500 text-sm font-semibold mb-1">Total Users (Donors)</p>
            <motion.p
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-bold text-gray-800"
            >
              {stats.totalUsers}
            </motion.p>
            <p className="text-xs text-gray-400 mt-2">Registered blood donors</p>
          </div>
        </motion.div>

        {/* Total Funding Card */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(34, 197, 94, 0.3)" }}
          className="bg-white rounded-2xl shadow-lg border-l-4 border-green-500 p-6 hover:shadow-2xl transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 p-4 rounded-2xl">
              <DollarSign size={32} className="text-green-600" />
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring" }}
              className="bg-green-50 px-3 py-1 rounded-full"
            >
              <TrendingUp size={16} className="text-green-600 inline mr-1" />
              <span className="text-green-600 text-sm font-bold">Growth</span>
            </motion.div>
          </div>
          <div>
            <p className="text-gray-500 text-sm font-semibold mb-1">Total Funding</p>
            <motion.p
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="text-4xl font-bold text-gray-800"
            >
              ${stats.totalFunding.toFixed(2)}
            </motion.p>
            <p className="text-xs text-gray-400 mt-2">Total donations received</p>
          </div>
        </motion.div>

        {/* Total Requests Card */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(239, 68, 68, 0.3)" }}
          className="bg-white rounded-2xl shadow-lg border-l-4 border-red-500 p-6 hover:shadow-2xl transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="bg-red-100 p-4 rounded-2xl">
              <FileText size={32} className="text-red-600" />
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.7, type: "spring" }}
              className="bg-red-50 px-3 py-1 rounded-full"
            >
              <TrendingUp size={16} className="text-red-600 inline mr-1" />
              <span className="text-red-600 text-sm font-bold">Pending</span>
            </motion.div>
          </div>
          <div>
            <p className="text-gray-500 text-sm font-semibold mb-1">Total Blood Requests</p>
            <motion.p
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="text-4xl font-bold text-gray-800"
            >
              {stats.totalRequests}
            </motion.p>
            <p className="text-xs text-gray-400 mt-2">All donation requests</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6"
      >
        <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="/dashboard/all-users"
            className="flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
          >
            <Users size={24} className="text-blue-600" />
            <span className="font-semibold text-blue-600">Manage Users</span>
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="/dashboard/donation-request"
            className="flex items-center gap-3 p-4 bg-red-50 hover:bg-red-100 rounded-xl transition-colors"
          >
            <FileText size={24} className="text-red-600" />
            <span className="font-semibold text-red-600">View Requests</span>
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="/dashboard/funding"
            className="flex items-center gap-3 p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors"
          >
            <DollarSign size={24} className="text-green-600" />
            <span className="font-semibold text-green-600">Manage Funding</span>
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;