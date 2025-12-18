// import { Link } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../Context/AuthProvider";
// import { signOut } from "firebase/auth";
// import { auth } from "../Firebase/Firebase.config";

// const Navbar = () => {
//   const { user } = useContext(AuthContext);

//   const logout = () => {
//     signOut(auth);
//   };

//   return (
//     <div className="navbar bg-base-100 shadow-md px-4">
//       {/* Left */}
//       <div className="navbar-start">
//         <Link to="/" className="btn btn-ghost text-xl font-bold">
//           Blood Donation
//         </Link>
//       </div>

//       {/* Center */}
//       <div className="navbar-center hidden lg:flex">
//         <ul className="menu menu-horizontal gap-2">
//           <li>
//             <Link to={"/donation-request"}>Donation Requests</Link>
//           </li>
//           <li>
//             <Link to={"/search"}>Search</Link>
//           </li>

//           {user && (
//             <li>
//               <Link to="/funding">Funding</Link>
//             </li>
//           )}
//         </ul>
//       </div>

//       {/* Right */}
//       <div className="navbar-end">
//         {!user ? (
//           <Link to="/login" className="btn btn-primary btn-sm">
//             Login
//           </Link>
//         ) : (
//           <div className="dropdown dropdown-end">
//             <div
//               tabIndex={0}
//               role="button"
//               className="btn btn-ghost btn-circle avatar"
//             >
//               <div className="w-10 rounded-full">
//                 <img
//                   src={
//                     user.photoURL ||
//                     "https://i.ibb.co/4pDNDk1/avatar.png"
//                   }
//                   alt="user avatar"
//                 />
//               </div>
//             </div>

//             <ul
//               tabIndex={0}
//               className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
//             >
//               <li className="font-semibold text-center">
//                 {user.displayName || "User"}
//               </li>
//               <li>
//                 <Link to="/dashboard">Dashboard</Link>
//               </li>
//               <li>
//                 <button onClick={logout} className="text-error">
//                   Logout
//                 </button>
//               </li>
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;



import { Link, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/Firebase.config";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Menu, X, LogOut, LayoutDashboard, DollarSign } from "lucide-react";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const logout = () => {
    signOut(auth);
    setIsDropdownOpen(false);
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="bg-gradient-to-r from-red-600 to-red-700 p-2 rounded-xl shadow-lg group-hover:shadow-red-500/50 transition-all"
            >
              <Heart size={24} className="text-white" fill="white" />
            </motion.div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                BloodBridge
              </h1>
              <p className="text-xs text-gray-500 -mt-1">Save Lives Together</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            <NavItem to="/donation-request">Donation Requests</NavItem>
            <NavItem to="/search">Search Donors</NavItem>
            {user && <NavItem to="/funding">Funding</NavItem>}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Desktop User Menu */}
            <div className="hidden lg:block">
              {!user ? (
                <Link to="/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:shadow-red-500/50 transition-all"
                  >
                    Login
                  </motion.button>
                </Link>
              ) : (
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-3 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full transition-all"
                  >
                    <img
                      src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                      alt="avatar"
                      className="w-8 h-8 rounded-full object-cover border-2 border-red-500"
                    />
                    <span className="font-semibold text-gray-700 max-w-[120px] truncate">
                      {user.displayName || "User"}
                    </span>
                  </motion.button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-200 py-2 overflow-hidden"
                      >
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="font-semibold text-gray-800">{user.displayName || "User"}</p>
                          <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>
                        
                        <Link
                          to="/dashboard"
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors"
                        >
                          <LayoutDashboard size={18} className="text-red-600" />
                          <span className="text-gray-700 font-medium">Dashboard</span>
                        </Link>
                        
                        <button
                          onClick={logout}
                          className="flex items-center gap-3 w-full px-4 py-3 hover:bg-red-50 text-red-600 transition-colors"
                        >
                          <LogOut size={18} />
                          <span className="font-medium">Logout</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 py-4 space-y-2">
              <MobileNavItem to="/donation-request" onClick={toggleMobileMenu}>
                Donation Requests
              </MobileNavItem>
              <MobileNavItem to="/search" onClick={toggleMobileMenu}>
                Search Donors
              </MobileNavItem>
              {user && (
                <MobileNavItem to="/funding" onClick={toggleMobileMenu}>
                  <DollarSign size={18} className="inline mr-2" />
                  Funding
                </MobileNavItem>
              )}

              {!user ? (
                <Link to="/login" onClick={toggleMobileMenu}>
                  <button className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-xl font-semibold">
                    Login
                  </button>
                </Link>
              ) : (
                <>
                  <div className="pt-4 pb-2 border-t border-gray-200">
                    <div className="flex items-center gap-3 px-3 py-2">
                      <img
                        src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                        alt="avatar"
                        className="w-10 h-10 rounded-full object-cover border-2 border-red-500"
                      />
                      <div>
                        <p className="font-semibold text-gray-800">{user.displayName || "User"}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </div>
                  <MobileNavItem to="/dashboard" onClick={toggleMobileMenu}>
                    <LayoutDashboard size={18} className="inline mr-2" />
                    Dashboard
                  </MobileNavItem>
                  <button
                    onClick={() => {
                      logout();
                      toggleMobileMenu();
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition-colors"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-4 py-2 rounded-lg font-medium transition-all ${
          isActive
            ? "bg-red-600 text-white shadow-lg shadow-red-500/30"
            : "text-gray-700 hover:bg-gray-100"
        }`
      }
    >
      {children}
    </NavLink>
  );
}

function MobileNavItem({ to, onClick, children }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `block px-4 py-3 rounded-xl font-medium transition-all ${
          isActive
            ? "bg-red-600 text-white"
            : "text-gray-700 hover:bg-gray-100"
        }`
      }
    >
      {children}
    </NavLink>
  );
}

export default Navbar;