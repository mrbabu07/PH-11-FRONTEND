// // src/Components/Footer.jsx
// import React from "react";

// const Footer = () => {
//   return (
//     <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
//       <div className="max-w-6xl mx-auto px-4">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
//           {/* About */}
//           <div>
//             <h3 className="text-white text-lg font-bold mb-4">BloodBridge</h3>
//             <p className="text-sm">
//               Connecting donors with those in need. Saving lives, one drop at a time.
//             </p>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h4 className="text-white font-medium mb-4">Quick Links</h4>
//             <ul className="space-y-2 text-sm">
//               <li><a href="/" className="hover:text-white transition">Home</a></li>
//               <li><a href="/donation-request" className="hover:text-white transition">Donation Requests</a></li>
//               <li><a href="/search" className="hover:text-white transition">Search Donors</a></li>
//               <li><a href="/register" className="hover:text-white transition">Join as Donor</a></li>
//             </ul>
//           </div>

//           {/* Support */}
//           <div>
//             <h4 className="text-white font-medium mb-4">Support</h4>
//             <ul className="space-y-2 text-sm">
//               <li className="flex items-center gap-2">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                 </svg>
//                 +880 17XX-XXXXXX
//               </li>
//               <li className="flex items-center gap-2">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                 </svg>
//                 contact@bloodbridge.org
//               </li>
//               <li className="flex items-center gap-2">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                 </svg>
//                 Dhaka, Bangladesh
//               </li>
//             </ul>
//           </div>

//           {/* Social & Donate */}
//           <div>
//             <h4 className="text-white font-medium mb-4">Get Involved</h4>
//             <div className="flex gap-3 mb-4">
//               <a href="#" className="btn btn-circle btn-ghost">
//                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.249-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 1.65 7.237"/></svg>
//               </a>
//               <a href="#" className="btn btn-circle btn-ghost">
//                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zm-2-10H8v2h2v2H8v2h2v2h2v-2h2v-2h-2v-2h2V8h-2zm4 6h-2v2h2v-2z"/></svg>
//               </a>
//             </div>
//             <a 
//               href="/funding" 
//               className="btn btn-sm btn-error text-white"
//             >
//               💉 Donate Now
//             </a>
//           </div>
//         </div>

//         {/* Bottom bar */}
//         <div className="border-t border-gray-800 pt-6 text-sm text-center">
//           <p>© {new Date().getFullYear()} BloodBridge. All rights reserved.</p>
//           <p className="mt-1">Helping save lives across Bangladesh</p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


import React from "react";
import { motion } from "framer-motion";
import { Heart, Phone, Mail, MapPin, Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 pt-16 pb-8 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: { staggerChildren: 0.1 }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12"
        >
          {/* About Section */}
          <motion.div variants={fadeInUp}>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-red-600 p-2 rounded-lg">
                <Heart size={24} fill="white" className="text-white" />
              </div>
              <h3 className="text-white text-xl font-bold">BloodBridge</h3>
            </div>
            <p className="text-sm leading-relaxed text-gray-400 mb-4">
              Connecting donors with those in need. Saving lives, one drop at a time across Bangladesh.
            </p>
            <div className="flex gap-3">
              <motion.a
                whileHover={{ scale: 1.1, backgroundColor: "#DC2626" }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-red-600 flex items-center justify-center transition-colors"
              >
                <Facebook size={18} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, backgroundColor: "#DC2626" }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-red-600 flex items-center justify-center transition-colors"
              >
                <Twitter size={18} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, backgroundColor: "#DC2626" }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-red-600 flex items-center justify-center transition-colors"
              >
                <Instagram size={18} />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-red-600 rounded"></div>
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { name: "Home", path: "/" },
                { name: "Donation Requests", path: "/donation-request" },
                { name: "Search Donors", path: "/search" },
                { name: "Join as Donor", path: "/register" }
              ].map((link, i) => (
                <motion.li
                  key={i}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <a
                    href={link.path}
                    className="text-gray-400 hover:text-red-500 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-red-500 group-hover:w-3 transition-all"></span>
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-red-600 rounded"></div>
              Contact Us
            </h4>
            <ul className="space-y-4 text-sm">
              <motion.li
                whileHover={{ x: 5 }}
                className="flex items-start gap-3 text-gray-400 group"
              >
                <div className="bg-gray-800 p-2 rounded-lg group-hover:bg-red-600 transition-colors">
                  <Phone size={16} />
                </div>
                <div>
                  <p className="font-semibold text-white mb-1">Emergency Hotline</p>
                  <p className="text-red-400">+880 1521721946</p>
                </div>
              </motion.li>
              <motion.li
                whileHover={{ x: 5 }}
                className="flex items-start gap-3 text-gray-400 group"
              >
                <div className="bg-gray-800 p-2 rounded-lg group-hover:bg-red-600 transition-colors">
                  <Mail size={16} />
                </div>
                <div>
                  <p className="font-semibold text-white mb-1">Email</p>
                  <p>contact@bloodbridge.org <br />
                  mdjahedulislamjaved@gmail.com</p>
                </div>
              </motion.li>
              <motion.li
                whileHover={{ x: 5 }}
                className="flex items-start gap-3 text-gray-400 group"
              >
                <div className="bg-gray-800 p-2 rounded-lg group-hover:bg-red-600 transition-colors">
                  <MapPin size={16} />
                </div>
                <div>
                  <p className="font-semibold text-white mb-1">Location</p>
                  <p>Chittagong, Bangladesh</p>
                </div>
              </motion.li>
            </ul>
          </motion.div>

          
          <motion.div variants={fadeInUp}>
            <h4 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-red-600 rounded"></div>
              Get Involved
            </h4>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              Every contribution helps save lives. Join our mission today.
            </p>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/funding"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-red-500/50 transition-all duration-300"
            >
              <Heart size={18} fill="white" />
              Donate Now
            </motion.a>
            <div className="mt-6 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
              <p className="text-xs text-gray-400 mb-2">📞 24/7 Support Available</p>
              <p className="text-sm text-white font-semibold">Call us anytime for urgent blood needs</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="border-t border-gray-800 pt-8 text-sm"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-400">
                © {new Date().getFullYear()} <span className="text-white font-semibold">BloodBridge</span>. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Helping save lives across Bangladesh 🇧🇩
              </p>
            </div>
            <div className="flex gap-6 text-xs">
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">FAQ</a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;