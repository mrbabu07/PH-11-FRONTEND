// import React, { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../../Context/AuthProvider";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import useAxiosSecure from "../../hooks/useAxiosSecure";

// const FundingPage = () => {
//   const { user } = useContext(AuthContext);
//   const axios = useAxiosSecure();
//   const navigate = useNavigate();
//   const [donations, setDonations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [totalFunds, setTotalFunds] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);

//   useEffect(() => {
//     const fetchDonations = async () => {
//       setLoading(true);
//       try {
//         const [recordsRes, summaryRes] = await Promise.all([
//           axios.get(`/payment-records?page=${currentPage}&size=8`),
//           axios.get("/funding/summary"),
//         ]);

//         setDonations(recordsRes.data.donations || []);
//         setTotalFunds(summaryRes.data.total || 0);
//       } catch (err) {
//         console.error("Fetch error:", err);
//         toast.error("Failed to load funding data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDonations();
//   }, [axios, currentPage]); 

//   const handleGiveFund = () => {
//     if (!user) {
//       toast.error("Please log in to donate");
//       navigate("/login");
//       return;
//     }
//     navigate("/funding/donate");
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-4 md:p-6">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-800">Support Our Mission</h1>
//           <p className="text-gray-600">
//             Your donation helps us maintain this platform and support blood donation drives across Bangladesh.
//           </p>
//         </div>
//         <button
//           onClick={handleGiveFund}
//           className="btn btn-error text-white px-6"
//         >
//           💉 Give Fund
//         </button>
//       </div>

//       {/* Total Funds Banner (from haikei.app style) */}
//       <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded">
//         <p className="text-red-800 font-medium">
//           Total Funds Raised: <span className="text-xl font-bold">${totalFunds.toLocaleString()}</span>
//         </p>
//       </div>

//       {/* Donations Table (from devmeetsdevs.com → "Featured Testimonials") */}
//       <div className="overflow-x-auto bg-white rounded-lg shadow">
//         <table className="table w-full">
//           <thead className="bg-gray-100">
//             <tr>
//               <th>Donor</th>
//               <th>Amount (BDT)</th>
//               <th>Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loading ? (
//               <tr>
//                 <td colSpan="3" className="text-center py-8">
//                   <span className="loading loading-spinner text-primary"></span>
//                 </td>
//               </tr>
//             ) : donations.length > 0 ? (
//               donations.map((donation, idx) => (
//                 <tr key={idx} className="hover:bg-gray-50 transition">
//                   <td>
//                     <div className="font-medium">{donation.donorName || "Anonymous"}</div>
//                     <div className="text-sm text-gray-500">{donation.donorEmail}</div>
//                   </td>
//                   <td className="font-bold">${donation.amount?.toLocaleString()}</td>
//                   <td>
//                     {donation.createdAt
//                       ? new Date(donation.createdAt).toLocaleDateString()
//                       : "N/A"}
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="3" className="text-center py-8 text-gray-500">
//                   No donations yet. Be the first supporter!
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {donations.length > 0 && (
//         <div className="mt-6 flex justify-center items-center gap-2">
//           <button
//             className="btn btn-sm"
//             disabled={currentPage === 1}
//             onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//           >
//             ← Prev
//           </button>

//           {[1, 2, 3].map((pageNum) => (
//             <button
//               key={pageNum}
//               className={`btn btn-sm ${currentPage === pageNum ? "btn-error" : "btn-outline"}`}
//               onClick={() => setCurrentPage(pageNum)}
//             >
//               {pageNum}
//             </button>
//           ))}

//           <button
//             className="btn btn-sm"
//             onClick={() => setCurrentPage((prev) => prev + 1)}
//           >
//             Next →
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FundingPage;


import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../Loading";

const FundingPage = () => {
  const { user } = useContext(AuthContext);
  const axios = useAxiosSecure();
  const navigate = useNavigate();
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalFunds, setTotalFunds] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchDonations = async () => {
      setLoading(true);
      try {
        const [recordsRes, summaryRes] = await Promise.all([
          axios.get(`/payment-records?page=${currentPage}&size=8`),
          axios.get("/funding/summary"),
        ]);

        setDonations(recordsRes.data.donations || []);
        setTotalFunds(summaryRes.data.total || 0);
      } catch (err) {
        console.error("Fetch error:", err);
        toast.error("Failed to load funding data");
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, [axios, currentPage]);

  const handleGiveFund = () => {
    if (!user) {
      toast.error("Please log in to donate");
      navigate("/login");
      return;
    }
    navigate("/funding");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-2xl shadow-xl p-8 md:p-12 mb-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24"></div>
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center">
                  <span className="text-3xl">💰</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold">Support Our Mission</h1>
              </div>
              <p className="text-white/90 text-lg max-w-2xl">
                Your donation helps us maintain this platform and support blood donation drives across Bangladesh.
              </p>
            </div>
            <button
              onClick={handleGiveFund}
              className="px-8 py-4 bg-white text-green-600 font-bold rounded-xl hover:shadow-2xl transform hover:scale-105 transition-all text-lg"
            >
              💉 Give Fund Now
            </button>
          </div>
        </div>

        {/* Total Funds Stats Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">💵</span>
              </div>
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Funds Raised</p>
                <p className="text-3xl font-bold text-green-600">${totalFunds.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-emerald-500">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">👥</span>
              </div>
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Donors</p>
                <p className="text-3xl font-bold text-emerald-600">{donations.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-teal-500">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">❤️</span>
              </div>
              <div>
                <p className="text-gray-600 text-sm font-medium">Impact Made</p>
                <p className="text-3xl font-bold text-teal-600">Lives Saved</p>
              </div>
            </div>
          </div>
        </div>

        {/* Donations Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-8 py-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <span className="text-green-600">🎁</span>
              Recent Donations
            </h2>
            <p className="text-gray-600 text-sm mt-1">Thank you to all our generous supporters</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead className="bg-gray-50">
                <tr className="text-left text-gray-700 text-sm font-semibold">
                  <th className="py-4 px-6">Donor Information</th>
                  <th className="py-4 px-6">Amount</th>
                  <th className="py-4 px-6">Date</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="3" className="text-center py-12">
                      <div className="flex flex-col items-center gap-3">
                        <span className="loading loading-spinner loading-lg text-green-600"></span>
                        <p className="text-gray-600 font-medium"><Loading/> donations...</p>
                      </div>
                    </td>
                  </tr>
                ) : donations.length > 0 ? (
                  donations.map((donation, idx) => (
                    <tr key={idx} className="hover:bg-green-50/50 transition-colors border-b border-gray-100 last:border-0">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                            {(donation.donorName || "A").charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-800">{donation.donorName || "Anonymous"}</div>
                            <div className="text-sm text-gray-500">{donation.donorEmail}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1 px-4 py-2 bg-green-100 text-green-700 rounded-full font-bold">
                          💵 ${donation.amount?.toLocaleString()}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1 text-gray-700">
                          <span className="text-emerald-500">📅</span>
                          <span className="font-medium">
                            {donation.createdAt
                              ? new Date(donation.createdAt).toLocaleDateString()
                              : "N/A"}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center py-12">
                      <div className="flex flex-col items-center gap-3">
                        <div className="text-6xl">🎁</div>
                        <p className="text-gray-600 font-medium text-lg">No donations yet</p>
                        <p className="text-gray-500 text-sm">Be the first supporter!</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {donations.length > 0 && (
            <div className="flex justify-center items-center gap-3 py-8 bg-gradient-to-r from-green-50 to-emerald-50">
              <button
                className="px-4 py-2 bg-white border-2 border-green-300 text-green-700 font-semibold rounded-lg hover:bg-green-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                ← Previous
              </button>

              {[1, 2, 3].map((pageNum) => (
                <button
                  key={pageNum}
                  className={`w-10 h-10 font-semibold rounded-lg transition-all ${
                    currentPage === pageNum 
                      ? "bg-gradient-to-r from-green-600 to-emerald-500 text-white shadow-lg scale-110" 
                      : "bg-white border-2 border-gray-300 text-gray-700 hover:border-green-400"
                  }`}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </button>
              ))}

              <button
                className="px-4 py-2 bg-white border-2 border-green-300 text-green-700 font-semibold rounded-lg hover:bg-green-50 transition-all"
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Next →
              </button>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-gradient-to-r from-green-600 to-emerald-500 rounded-2xl p-8 text-white text-center shadow-xl">
          <h3 className="text-2xl font-bold mb-3">Make a Difference Today</h3>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Every contribution helps us maintain this life-saving platform and organize blood donation drives.
          </p>
          <button
            onClick={handleGiveFund}
            className="px-8 py-4 bg-white text-green-600 font-bold rounded-xl hover:shadow-2xl transform hover:scale-105 transition-all"
          >
            💰 Donate Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default FundingPage;