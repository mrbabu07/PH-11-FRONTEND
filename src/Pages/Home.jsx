// import React, { useContext } from "react";
// import { AuthContext } from "../Context/AuthProvider";
// import { useNavigate } from "react-router-dom";

// const Home = () => {
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Hero Banner */}
//       <div className="relative bg-gradient-to-r from-red-600 to-red-800 text-white">
//         <div className="absolute inset-0 bg-[url('https://svgbackgrounds.com/svg/84/84-blood-donation-pattern.svg')] opacity-10"></div>
//         <div className="container mx-auto px-4 py-20 relative z-10 text-center">
//           <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-md">
//             Save Lives Through Blood Donation
//           </h1>
//           <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
//             Every drop counts. Join thousands of heroes who give the gift of life.
//           </p>
//           <div className="flex flex-col sm:flex-row justify-center gap-4">
//             {!user ? (
//               <>
//                 <button
//                   onClick={() => navigate("/register")}
//                   className="btn btn-lg btn-secondary"
//                 >
//                   Join as a Donor
//                 </button>
//                 <button
//                   onClick={() => navigate("/search")}
//                   className="btn btn-lg btn-outline btn-white"
//                 >
//                   Search Donors
//                 </button>
//               </>
//             ) : (
//               <button
//                 onClick={() => navigate("/dashboard")}
//                 className="btn btn-lg btn-secondary"
//               >
//                 Go to Dashboard
//               </button>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Featured Section */}
//       <section className="py-16 bg-gray-50">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
//             Why Donate Blood?
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {/* Card 1 */}
//             <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition">
//               <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-semibold mb-2">Save Lives</h3>
//               <p className="text-gray-600">
//                 One donation can save up to 3 lives. Be a hero in someone’s story.
//               </p>
//             </div>

//             {/* Card 2 */}
//             <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition">
//               <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-semibold mb-2">Safe & Quick</h3>
//               <p className="text-gray-600">
//                 The process takes only 30 minutes and is completely safe.
//               </p>
//             </div>

//             {/* Card 3 */}
//             <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition">
//               <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-3-3h-4a3 3 0 00-3 3v2zM17 8a4 4 0 10-8 0v6a2 2 0 002 2h4a2 2 0 002-2V8z" />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-semibold mb-2">Community Impact</h3>
//               <p className="text-gray-600">
//                 Strengthen your community by ensuring blood is available when needed.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Contact Us */}
//       <section className="py-16 bg-white">
//         <div className="container mx-auto px-4 max-w-4xl">
//           <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Contact Us</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {/* Form */}
//             <div className="bg-gray-50 p-6 rounded-xl">
//               <form className="space-y-4">
//                 <input
//                   type="text"
//                   placeholder="Your Name"
//                   className="input input-bordered w-full"
//                 />
//                 <input
//                   type="email"
//                   placeholder="Email Address"
//                   className="input input-bordered w-full"
//                 />
//                 <textarea
//                   placeholder="Your Message"
//                   className="textarea textarea-bordered w-full"
//                   rows="4"
//                 ></textarea>
//                 <button type="submit" className="btn btn-primary w-full">
//                   Send Message
//                 </button>
//               </form>
//             </div>

//             {/* Info */}
//             <div className="space-y-6">
//               <div>
//                 <h3 className="text-xl font-semibold mb-2">Emergency Blood Request</h3>
//                 <p className="text-red-600 font-bold text-lg">+880 17XX-XXXXXX</p>
//               </div>
//               <div>
//                 <h3 className="text-xl font-semibold mb-2">Office Address</h3>
//                 <p className="text-gray-700">
//                   National Blood Bank Center,  
//                   Mohakhali, Dhaka-1212, Bangladesh
//                 </p>
//               </div>
//               <div>
//                 <h3 className="text-xl font-semibold mb-2">Email</h3>
//                 <p className="text-gray-700">contact@blooddonation.org</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Footer will be handled by MainLayout */}
//     </div>
//   );
// };

// export default Home;

import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Clock, Users, Phone, Mail, MapPin, ArrowRight } from "lucide-react";

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-red-50">
      {/* Hero Banner */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white overflow-hidden"
      >
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        {/* Floating Blood Drops Animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-white opacity-20"
              initial={{ y: -100, x: `${i * 20}%` }}
              animate={{ 
                y: "100vh",
                x: [`${i * 20}%`, `${i * 20 + 10}%`, `${i * 20}%`]
              }}
              transition={{
                duration: 15 + i * 2,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.5
              }}
            >
              <Heart size={24 + i * 4} fill="currentColor" />
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-block mb-6"
            >
              <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                <span className="text-red-100 font-semibold">🩸 Be a Hero Today</span>
              </div>
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Save Lives Through
              <span className="block mt-2 bg-gradient-to-r from-red-100 to-white bg-clip-text text-transparent">
                Blood Donation
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-10 text-red-50 max-w-3xl mx-auto leading-relaxed">
              Every drop counts. Join thousands of heroes who give the gift of life and make a difference in your community.
            </p>

            <motion.div 
              className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {!user ? (
                <>
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/register")}
                    className="group bg-white text-red-600 px-8 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-red-500/50 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Join as a Donor
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/search")}
                    className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-red-600 transition-all duration-300"
                  >
                    Search Donors
                  </motion.button>
                </>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/dashboard")}
                  className="bg-white text-red-600 px-8 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-red-500/50 transition-all duration-300"
                >
                  Go to Dashboard
                </motion.button>
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* Wave Bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </motion.div>

      {/* Featured Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Why Donate Blood?
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-700 mx-auto rounded-full"></div>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {/* Card 1 */}
            <motion.div
              variants={fadeIn}
              whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(220, 38, 38, 0.2)" }}
              className="group bg-gradient-to-br from-red-50 to-white p-8 rounded-2xl shadow-lg border border-red-100 hover:border-red-300 transition-all duration-300"
            >
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
              >
                <Heart size={36} className="text-white" fill="white" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-red-600 transition-colors">Save Lives</h3>
              <p className="text-gray-600 leading-relaxed">
                One donation can save up to 3 lives. Be a hero in someone's story and make a lasting impact.
              </p>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              variants={fadeIn}
              whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(220, 38, 38, 0.2)" }}
              className="group bg-gradient-to-br from-red-50 to-white p-8 rounded-2xl shadow-lg border border-red-100 hover:border-red-300 transition-all duration-300"
            >
              <motion.div 
                whileHover={{ scale: 1.1, rotate: -5 }}
                className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
              >
                <Clock size={36} className="text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-red-600 transition-colors">Safe & Quick</h3>
              <p className="text-gray-600 leading-relaxed">
                The process takes only 30 minutes and is completely safe with trained professionals.
              </p>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              variants={fadeIn}
              whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(220, 38, 38, 0.2)" }}
              className="group bg-gradient-to-br from-red-50 to-white p-8 rounded-2xl shadow-lg border border-red-100 hover:border-red-300 transition-all duration-300"
            >
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
              >
                <Users size={36} className="text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-red-600 transition-colors">Community Impact</h3>
              <p className="text-gray-600 leading-relaxed">
                Strengthen your community by ensuring blood is available when needed most.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-b from-white to-red-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Contact Us</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-700 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-2xl shadow-xl border border-red-100"
            >
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Your Message</label>
                  <textarea
                    placeholder="Write your message here..."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors resize-none"
                    rows="5"
                  ></textarea>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-red-500/50 transition-all duration-300"
                >
                  Send Message
                </motion.button>
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <motion.div 
                whileHover={{ x: 5 }}
                className="bg-white p-6 rounded-2xl shadow-lg border border-red-100"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-red-100 p-3 rounded-xl">
                    <Phone className="text-red-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Emergency Blood Request</h3>
                    <p className="text-red-600 font-bold text-2xl">+880 17XX-XXXXXX</p>
                    <p className="text-gray-500 text-sm mt-1">Available 24/7</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ x: 5 }}
                className="bg-white p-6 rounded-2xl shadow-lg border border-red-100"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-red-100 p-3 rounded-xl">
                    <MapPin className="text-red-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Office Address</h3>
                    <p className="text-gray-700 leading-relaxed">
                      National Blood Bank Center,<br />
                      Mohakhali, Dhaka-1212,<br />
                      Bangladesh
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ x: 5 }}
                className="bg-white p-6 rounded-2xl shadow-lg border border-red-100"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-red-100 p-3 rounded-xl">
                    <Mail className="text-red-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Email</h3>
                    <p className="text-gray-700">contact@blooddonation.org</p>
                    <p className="text-gray-500 text-sm mt-1">We'll reply within 24 hours</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;