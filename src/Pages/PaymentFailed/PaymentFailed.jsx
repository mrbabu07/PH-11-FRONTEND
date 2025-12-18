// import React from "react";
// import { Link } from "react-router-dom";

// const PaymentFailed = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex flex-col items-center justify-center p-4">
//       {/* Decorative Blobs (from haikei.app style) */}
//       <div className="absolute inset-0 -z-10 overflow-hidden">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
//       </div>

//       <div className="max-w-md text-center z-10">
//         {/* Warning Icon */}
//         <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center">
//           <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//             </svg>
//           </div>
//         </div>

//         <h1 className="text-3xl md:text-4xl font-bold text-red-800 mb-4">
//           Payment Failed
//         </h1>
//         <p className="text-gray-600 mb-8 px-2">
//           We couldn't process your donation. Don’t worry — you can try again or contact support.
//         </p>

        
//         <div className="flex flex-col sm:flex-row gap-4 justify-center">
//           <Link
//             to="/funding"
//             className="px-6 py-3 bg-red-600 text-white font-medium rounded-full shadow hover:bg-red-700 transition transform hover:-translate-y-0.5"
//           >
//             Try Again
//           </Link>
//           <Link
//             to="/donation-request"
//             className="px-6 py-3 bg-white text-red-600 border border-red-300 font-medium rounded-full shadow hover:bg-gray-50 transition"
//           >
//             View Requests
//           </Link>
//         </div>

//         {/* Footer note (from devmeetsdevs.com minimalist style) */}
//         <p className="mt-8 text-sm text-gray-500">
//           Your support means the world to us. Thank you for trying to help.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default PaymentFailed;


import React from "react";
import { Link } from "react-router-dom";

const PaymentFailed = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="max-w-md w-full z-10">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-orange-500 p-8 text-center relative overflow-hidden">
            <div className="w-24 h-24 mx-auto mb-4 flex items-center justify-center bg-white rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Payment Failed
            </h1>
            <p className="text-white/90">
              Something went wrong
            </p>
          </div>

          {/* Content */}
          <div className="p-8 text-center space-y-6">
            <p className="text-gray-600 text-lg">
              We couldn't process your donation. Don't worry — you can try again or contact support.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <Link
                to="/funding/donate"
                className="px-6 py-4 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              >
                🔄 Try Again
              </Link>
              <Link
                to="/donation-request"
                className="px-6 py-4 bg-white text-red-600 border-2 border-red-300 font-semibold rounded-xl hover:bg-red-50 transition-all"
              >
                📋 View Requests
              </Link>
              <Link
                to="/"
                className="px-6 py-4 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-all"
              >
                🏠 Back to Home
              </Link>
            </div>

            {/* Footer note */}
            <p className="text-sm text-gray-500 pt-4 border-t border-gray-200">
              💚 Your support means the world to us. Thank you for trying to help.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;