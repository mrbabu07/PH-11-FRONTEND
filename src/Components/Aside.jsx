// // src/Components/Aside.jsx
// import { NavLink } from "react-router-dom";
// import { LayoutDashboard, Package, Home, LogOut, FileText } from "lucide-react";
// import { useContext } from "react";
// import { AuthContext } from "../Context/AuthProvider";
// import { signOut } from "firebase/auth";
// import { auth } from "../Firebase/Firebase.config";

// export default function Aside() {
//   const { role, userStatus } = useContext(AuthContext);

//   const handleLogOut = () => signOut(auth);

//   return (
//     <aside className="w-64 h-screen bg-gray-900 text-gray-100 flex flex-col">
//       <div className="p-6 border-b border-gray-800">
//         <h1 className="text-xl font-semibold">
//           {role === "admin" ? "Admin Dashboard" : 
//            role === "volunteer" ? "Volunteer Dashboard" : 
//            "Donor Dashboard"}
//         </h1>
//       </div>

//       <nav className="flex-1 p-4 space-y-2">
//         <NavItem to="/dashboard" icon={<LayoutDashboard size={18} />}>
//           Dashboard
//         </NavItem>

//         {/* Donor: only these two */}
//         {role === "donor" && userStatus === "active" && (
//           <>
//             <NavItem to="/dashboard/add-request" icon={<FileText size={18} />}>
//               Create Request
//             </NavItem>
//             <NavItem to="/dashboard/my-request" icon={<Package size={18} />}>
//               My Requests
//             </NavItem>
            
//           </>
//         )}

//         {/* Volunteer */}
//         {role === "volunteer" && (
//           <>
//             <NavItem to="/dashboard/add-request" icon={<FileText size={18} />}>
//               Create Request
//             </NavItem>
//             <NavItem to="/dashboard/donation-request" icon={<Package size={18} />}>
//               All Requests
//             </NavItem>
//             <NavItem to="/dashboard/funding-page" icon={<Package size={18} />}>
//               Total Funding
//             </NavItem>
//           </>
//         )}

//         {/* Admin */}
//         {role === "admin" && (
//           <>
//             <NavItem to="/dashboard/donation-request" icon={<Package size={18} />}>
//               All Requests
//             </NavItem>
//             <NavItem to="/dashboard/all-users" icon={<Package size={18} />}>
//               All Users
//             </NavItem>
//             <NavItem to="/dashboard/funding" icon={<FileText size={18} />}>
//               Funding
//             </NavItem>
//             <NavItem to="/dashboard/funding-page" icon={<Package size={18} />}>
//               Total Funding
//             </NavItem>
//           </>
//         )}

//         <NavItem to="/dashboard/profile" icon={<Home size={18} />}>
//           Profile
//         </NavItem>

//         <NavItem to="/" icon={<Home size={18} />}>
//           Back to Home
//         </NavItem>
//       </nav>

//       <div className="p-4 border-t border-gray-800">
//         <button
//           onClick={handleLogOut}
//           className="flex items-center gap-2 w-full px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700"
//         >
//           <LogOut size={18} />
//           <span>Logout</span>
//         </button>
//       </div>
//     </aside>
//   );
// }

// function NavItem({ to, icon, children }) {
//   return (
//     <NavLink
//       to={to}
//       className={({ isActive }) =>
//         `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
//           isActive ? "bg-gray-800 text-white" : "text-gray-300 hover:bg-gray-800"
//         }`
//       }
//     >
//       {icon}
//       <span>{children}</span>
//     </NavLink>
//   );
// }


import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, Package, Home, LogOut, FileText, 
  Users, DollarSign, Heart 
} from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/Firebase.config";
import { motion } from "framer-motion";

export default function Aside() {
  const { role, userStatus } = useContext(AuthContext);

  const handleLogOut = () => signOut(auth);

  return (
    <aside className="w-72 h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100 flex flex-col shadow-2xl">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6 border-b border-gray-700/50 bg-gradient-to-r from-red-600/10 to-transparent"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-red-600 p-2 rounded-lg">
            <Heart size={24} fill="white" className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">
              {role === "admin" ? "Admin Panel" : 
               role === "volunteer" ? "Volunteer Panel" : 
               "Donor Panel"}
            </h1>
            <p className="text-xs text-gray-400 capitalize">{role} Dashboard</p>
          </div>
        </div>
      </motion.div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <NavItem to="/dashboard" icon={<LayoutDashboard size={20} />}>
          Dashboard Home
        </NavItem>

        {/* Donor Routes */}
        {role === "donor" && userStatus === "active" && (
          <>
            <NavItem to="/dashboard/add-request" icon={<FileText size={20} />}>
              Create Request
            </NavItem>
            <NavItem to="/dashboard/my-request" icon={<Package size={20} />}>
              My Requests
            </NavItem>
          </>
        )}

        {/* Volunteer Routes */}
        {role === "volunteer" && (
          <>
            <NavItem to="/dashboard/add-request" icon={<FileText size={20} />}>
              Create Request
            </NavItem>
            <NavItem to="/dashboard/donation-request" icon={<Package size={20} />}>
              All Requests
            </NavItem>
            <NavItem to="/dashboard/funding-page" icon={<DollarSign size={20} />}>
              Total Funding
            </NavItem>
          </>
        )}

        {/* Admin Routes */}
        {role === "admin" && (
          <>
            <NavItem to="/dashboard/donation-request" icon={<Package size={20} />}>
              All Requests
            </NavItem>
            <NavItem to="/dashboard/all-users" icon={<Users size={20} />}>
              All Users
            </NavItem>
            <NavItem to="/dashboard/funding" icon={<FileText size={20} />}>
              Funding
            </NavItem>
            <NavItem to="/dashboard/funding-page" icon={<DollarSign size={20} />}>
              Total Funding
            </NavItem>
          </>
        )}

        {/* Common Routes */}
        <div className="pt-4 mt-4 border-t border-gray-700/50">
          <NavItem to="/dashboard/profile" icon={<Users size={20} />}>
            My Profile
          </NavItem>
          <NavItem to="/" icon={<Home size={20} />}>
            Back to Home
          </NavItem>
        </div>
      </nav>

      {/* Logout Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="p-4 border-t border-gray-700/50 bg-gray-800/30"
      >
        <motion.button
          whileHover={{ scale: 1.02, backgroundColor: "#B91C1C" }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogOut}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold shadow-lg hover:shadow-red-500/50 transition-all duration-300"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </motion.button>
      </motion.div>
    </aside>
  );
}

function NavItem({ to, icon, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
          isActive 
            ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-500/30" 
            : "text-gray-300 hover:bg-gray-800 hover:text-white"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className={isActive ? "text-white" : "text-gray-400 group-hover:text-red-500"}
          >
            {icon}
          </motion.div>
          <span className="font-medium">{children}</span>
          {isActive && (
            <motion.div
              layoutId="activeIndicator"
              className="ml-auto w-2 h-2 bg-white rounded-full"
            />
          )}
        </>
      )}
    </NavLink>
  );
}