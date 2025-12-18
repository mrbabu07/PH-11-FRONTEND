// import { useEffect, useState } from "react";
// import useAxiosSecure from "../../hooks/useAxiosSecure";

// const AllUsers = () => {
//   const axiosSecure = useAxiosSecure();
//   const [users, setUsers] = useState([]);

//   const fetchUsers = async () => {
//     try {
//       const res = await axiosSecure.get("/users");
//       setUsers(res.data);
//     } catch (err) {
//       console.error("Failed to fetch users:", err);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, [axiosSecure]);


//   const handleStatusChange = async (email, status) => {
//     try {
//       const res = await axiosSecure.patch(
//         `/update/user/status?email=${email}&status=${status}`
//       );
//       if (res.data?.modifiedCount > 0) {
//         fetchUsers();
//       }
//     } catch (err) {
//       console.error("Status update failed:", err);
//     }
//   };


//   const handleRoleChange = async (email, newRole) => {
//     try {
//       await axiosSecure.patch("/users/role", { email, newRole });
//       fetchUsers(); // refresh list
//     } catch (err) {
//       console.error("Role update failed:", err);
//     }
//   };

//   return (
//     <div className="overflow-x-auto">
//       <table className="table">
//         <thead>
//           <tr>
//             <th></th>
//             <th>Name</th>
//             <th>Role</th>
//             <th>User Status</th>
//             <th>Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {users.map((user) => (
//             <tr key={user.email}>
//               <td>
//                 <input type="checkbox" className="checkbox" />
//               </td>

//               <td>
//                 <div className="flex items-center gap-3">
//                   <div className="avatar">
//                     <div className="mask mask-squircle h-12 w-12">
//                       <img
//                         src={user?.photoURL || "https://via.placeholder.com/48"}
//                         alt="avatar"
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <div className="font-bold">{user?.name}</div>
//                     <div className="text-sm opacity-50">{user?.email}</div>
//                   </div>
//                 </div>
//               </td>

//               <td>{user?.role}</td>
//               <td>{user?.status}</td>

//               <td>
//                 <div className="flex flex-wrap gap-1">
//                   {/* Block / Unblock */}
//                   {user?.status !== "active" ? (
//                     <button
//                       onClick={() => handleStatusChange(user.email, "active")}
//                       className="btn btn-ghost btn-xs"
//                     >
//                       Activate
//                     </button>
//                   ) : (
//                     <button
//                       onClick={() => handleStatusChange(user.email, "blocked")}
//                       className="btn btn-error btn-xs"
//                     >
//                       Block
//                     </button>
//                   )}

//                   {/* Make Volunteer — only for donors */}
//                   {user?.role === "donor" && (
//                     <button
//                       onClick={() => handleRoleChange(user.email, "volunteer")}
//                       className="btn btn-warning btn-xs"
//                     >
//                       Make Volunteer
//                     </button>
//                   )}

//                   {/* Make Admin — for donor or volunteer */}
//                   {user?.role !== "admin" && (
//                     <button
//                       onClick={() => handleRoleChange(user.email, "admin")}
//                       className="btn btn-error btn-xs"
//                     >
//                       Make Admin
//                     </button>
//                   )}
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AllUsers;


import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { motion } from "framer-motion";
import { 
  Users, Shield, UserCheck, UserX, Award, 
  MoreVertical, Search, Filter 
} from "lucide-react";
import toast from "react-hot-toast";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [openDropdown, setOpenDropdown] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await axiosSecure.get("/users");
      setUsers(res.data);
      setFilteredUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
      toast.error("Failed to load users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [axiosSecure]);

  // Filter users
  useEffect(() => {
    let result = users;
    
    // Search filter
    if (searchTerm) {
      result = result.filter(user => 
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Status filter
    if (statusFilter !== "all") {
      result = result.filter(user => user.status === statusFilter);
    }
    
    setFilteredUsers(result);
  }, [searchTerm, statusFilter, users]);

  // Update user status (block/unblock)
  const handleStatusChange = async (email, status) => {
    try {
      const res = await axiosSecure.patch(
        `/update/user/status?email=${email}&status=${status}`
      );
      if (res.data?.modifiedCount > 0) {
        toast.success(`User ${status === "active" ? "activated" : "blocked"} successfully!`);
        fetchUsers();
        setOpenDropdown(null);
      }
    } catch (err) {
      console.error("Status update failed:", err);
      toast.error("Failed to update status");
    }
  };

  // Update user role
  const handleRoleChange = async (email, newRole) => {
    try {
      await axiosSecure.patch("/users/role", { email, newRole });
      toast.success(`User role updated to ${newRole}!`);
      fetchUsers();
      setOpenDropdown(null);
    } catch (err) {
      console.error("Role update failed:", err);
      toast.error("Failed to update role");
    }
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800 border-red-300";
      case "volunteer":
        return "bg-blue-100 text-blue-800 border-blue-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getStatusBadge = (status) => {
    return status === "active"
      ? "bg-green-100 text-green-800 border-green-300"
      : "bg-red-100 text-red-800 border-red-300";
  };

  return (
    <div className="p-4 md:p-8 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3"
      >
        <div className="bg-blue-100 p-3 rounded-xl">
          <Users size={28} className="text-blue-600" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-800">All Users</h2>
          <p className="text-gray-600">Manage user accounts and permissions</p>
        </div>
      </motion.div>

      {/* Search & Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search size={20} className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-600" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="blocked">Blocked</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Users Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
              <tr>
                <th className="px-6 py-4 text-left font-semibold">User</th>
                <th className="px-6 py-4 text-left font-semibold">Email</th>
                <th className="px-6 py-4 text-left font-semibold">Role</th>
                <th className="px-6 py-4 text-left font-semibold">Status</th>
                <th className="px-6 py-4 text-left font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <Users size={48} className="text-gray-300" />
                      <p className="text-gray-500 font-medium">No users found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user, index) => (
                  <motion.tr
                    key={user.email}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {/* User Info */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={user?.photoURL || "https://via.placeholder.com/48"}
                          alt="avatar"
                          className="w-12 h-12 rounded-full object-cover border-2 border-blue-200"
                        />
                        <span className="font-semibold text-gray-800">{user?.name}</span>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-6 py-4 text-gray-700 text-sm">{user?.email}</td>

                    {/* Role */}
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${getRoleBadge(user?.role)}`}>
                        {user?.role}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(user?.status)}`}>
                        {user?.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="relative">
                        <button
                          onClick={() => setOpenDropdown(openDropdown === user.email ? null : user.email)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <MoreVertical size={20} />
                        </button>

                        {openDropdown === user.email && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-10"
                          >
                            {/* Block/Unblock */}
                            {user?.status === "active" ? (
                              <button
                                onClick={() => handleStatusChange(user.email, "blocked")}
                                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-red-50 text-red-600 transition-colors"
                              >
                                <UserX size={18} />
                                <span className="font-medium">Block User</span>
                              </button>
                            ) : (
                              <button
                                onClick={() => handleStatusChange(user.email, "active")}
                                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-green-50 text-green-600 transition-colors"
                              >
                                <UserCheck size={18} />
                                <span className="font-medium">Activate User</span>
                              </button>
                            )}

                            {/* Make Volunteer */}
                            {user?.role === "donor" && (
                              <button
                                onClick={() => handleRoleChange(user.email, "volunteer")}
                                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-blue-50 text-blue-600 transition-colors"
                              >
                                <Award size={18} />
                                <span className="font-medium">Make Volunteer</span>
                              </button>
                            )}

                            {/* Make Admin */}
                            {user?.role !== "admin" && (
                              <button
                                onClick={() => handleRoleChange(user.email, "admin")}
                                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-red-50 text-red-600 transition-colors"
                              >
                                <Shield size={18} />
                                <span className="font-medium">Make Admin</span>
                              </button>
                            )}
                          </motion.div>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default AllUsers;