// import React, { useEffect } from "react";
// import { useSearchParams } from "react-router-dom";
// import useAxios from "../../hooks/useAxios";
// import { CheckCircleIcon } from "@heroicons/react/24/solid";

// function PaymentSuccess() {
//   const [searchParams] = useSearchParams();
//   const session_id = searchParams.get("session_id");
//   const axios = useAxios();

//   useEffect(() => {
//     if (session_id) {
//       axios
//         .post(`/payment-success?session_id=${session_id}`)
//         .then((res) => {
//           console.log("Payment success recorded:", res.data);
//         })
//         .catch((err) => {
//           console.error("Error recording payment success:", err);
//         });
//     }
//   }, [axios, session_id]);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-4">
//       <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-green-200">
//         {/* Header with success icon */}
//         <div className="bg-green-600 py-8 flex flex-col items-center justify-center">
//           <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 animate-pulse">
//             <CheckCircleIcon className="h-12 w-12 text-green-600" />
//           </div>
//           <h1 className="text-2xl font-bold text-white">Payment Successful!</h1>
//         </div>

//         {/* Content */}
//         <div className="p-6 text-center">
//           <p className="text-gray-700 mb-2">
//             Thank you for your generous support!
//           </p>
//           <p className="text-gray-600 text-sm mb-6">
//             Your contribution helps save lives and support our mission.
//           </p>

//           {/* Optional: Show session ID (remove in production if not needed) */}
//           {session_id && (
//             <div className="bg-gray-100 text-gray-500 text-xs p-3 rounded-lg mb-6 font-mono">
//               Session: {session_id.substring(0, 8)}...
//             </div>
//           )}

//           <div className="space-y-3">
//             <button
//               onClick={() => window.location.href = "/"}
//               className="w-full btn btn-primary"
//             >
//               Back to Home
//             </button>
//             <button
//               onClick={() => window.location.href = "/funding"}
//               className="w-full btn btn-outline"
//             >
//                 Make Another Donation
//             </button>
//           </div>
//         </div>

//         {/* Decorative bottom */}
//         <div className="h-1 bg-gradient-to-r from-green-400 to-emerald-500"></div>
//       </div>
//     </div>
//   );
// }

// export default PaymentSuccess;

import React, { useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import useAxios from "../../hooks/useAxios";

function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const session_id = searchParams.get("session_id");
  const axios = useAxios();

  useEffect(() => {
    if (session_id) {
      axios
        .post(`/payment-success?session_id=${session_id}`)
        .then((res) => {
          console.log("Payment success recorded:", res.data);
        })
        .catch((err) => {
          console.error("Error recording payment success:", err);
        });
    }
  }, [axios, session_id]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-4">
      <div className="max-w-md w-full">
        {/* Success Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
          {/* Header with success animation */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-500 py-12 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
            <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center mb-4 animate-bounce">
              <svg className="h-16 w-16 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Payment Successful!</h1>
            <p className="text-white/90">Thank you for your generosity</p>
          </div>

          {/* Content */}
          <div className="p-8 text-center space-y-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
              <p className="text-gray-700 text-lg font-medium mb-2">
                🎉 Your donation has been received!
              </p>
              <p className="text-gray-600 text-sm">
                Your contribution helps save lives and support our mission.
              </p>
            </div>

            {/* Session ID */}
            {session_id && (
              <div className="bg-gray-100 text-gray-500 text-xs p-4 rounded-lg font-mono">
                <p className="text-gray-700 font-semibold mb-1">Transaction ID</p>
                {session_id.substring(0, 16)}...
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link
                to="/"
                className="block w-full py-4 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-bold rounded-xl hover:shadow-xl transform hover:scale-105 transition-all"
              >
                🏠 Back to Home
              </Link>
              <Link
                to="/funding"
                className="block w-full py-4 bg-white border-2 border-green-300 text-green-700 font-semibold rounded-xl hover:bg-green-50 transition-all"
              >
                💰 View All Donations
              </Link>
              <Link
                to="/funding/donate"
                className="block w-full py-4 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-all"
              >
                🎁 Make Another Donation
              </Link>
            </div>

            {/* Thank you message */}
            <p className="text-sm text-gray-500 pt-4 border-t border-gray-200">
              💚 You're making a real difference in people's lives
            </p>
          </div>

          {/* Decorative bottom */}
          <div className="h-2 bg-gradient-to-r from-green-400 to-emerald-500"></div>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;