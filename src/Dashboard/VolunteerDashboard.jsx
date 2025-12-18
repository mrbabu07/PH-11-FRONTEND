
// import React, { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../Context/AuthProvider";
// import useAxiosSecure from "../hooks/useAxiosSecure";
// import { Link } from "react-router-dom";
// import toast from "react-hot-toast";

// const VolunteerDashboard = () => {
//   const { user } = useContext(AuthContext);
//   const axiosSecure = useAxiosSecure();
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   
//   useEffect(() => {
//     const fetchRequests = async () => {
//       setLoading(true);
//       try {
//         const res = await axiosSecure.get(
//           `/donation-requests?page=${currentPage}&size=8`
//         );
//         setRequests(res.data.requests || []);
//         setTotalPages(res.data.totalPages || 1);
//       } catch (err) {
//         console.error("Failed to load requests", err);
//         toast.error("Failed to load requests");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchRequests();
//   }, [axiosSecure, currentPage]);

//   return (
//     <div className="space-y-8">
//       {/* Welcome Section */}
//       <div className="bg-white p-6 rounded-xl shadow-sm">
//         <h1 className="text-2xl font-bold text-gray-800">
//           Welcome, <span className="text-red-600">{user?.displayName}</span>!
//         </h1>
//         <p className="text-gray-600">View and manage blood donation requests.</p>
//       </div>

//       {/* All Requests Table */}
//       <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//         <div className="px-6 py-4 border-b border-gray-200">
//           <h2 className="text-xl font-semibold">All Blood Donation Requests</h2>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="table w-full">
//             <thead>
//               <tr className="text-left text-gray-500 text-sm">
//                 <th>Recipient</th>
//                 <th>Location</th>
//                 <th>Blood Group</th>
//                 <th>Date & Time</th>
//                 <th>Status</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan="6" className="text-center py-8">
//                     <span className="loading loading-spinner text-primary"></span>
//                   </td>
//                 </tr>
//               ) : requests.length > 0 ? (
//                 requests.map((req) => (
//                   <tr key={req._id} className="hover:bg-gray-50">
//                     <td className="font-medium">{req.recipientName}</td>
//                     <td>{req.district}, {req.upazila}</td>
//                     <td>
//                       <span className="badge badge-error">{req.blood_group}</span>
//                     </td>
//                     <td>
//                       <div>{req.donation_date}</div>
//                       <div className="text-sm text-gray-500">{req.donation_time}</div>
//                     </td>
//                     <td>
//                       <span className={`badge ${
//                         req.donation_status === "pending" ? "badge-warning" :
//                         req.donation_status === "inprogress" ? "badge-info" :
//                         req.donation_status === "done" ? "badge-success" : "badge-error"
//                       }`}>
//                         {req.donation_status}
//                       </span>
//                     </td>
//                     <td>
//                       <Link
//                         to={`/donation-request/${req._id}`}
//                         className="btn btn-xs btn-outline"
//                       >
//                         View
//                       </Link>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="6" className="text-center py-4 text-gray-500">
//                     No donation requests found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//        
//         {totalPages > 1 && (
//           <div className="flex justify-center items-center gap-2 py-6 bg-gray-50">
//             <button
//               className="btn btn-sm"
//               disabled={currentPage === 1}
//               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//             >
//               ← Prev
//             </button>

//             {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//               let pageNum;
//               if (totalPages <= 5) {
//                 pageNum = i + 1;
//               } else if (currentPage <= 3) {
//                 pageNum = i + 1;
//               } else if (currentPage >= totalPages - 2) {
//                 pageNum = totalPages - 4 + i;
//               } else {
//                 pageNum = currentPage - 2 + i;
//               }
//               return (
//                 <button
//                   key={pageNum}
//                   className={`btn btn-sm ${
//                     currentPage === pageNum ? "btn-error" : "btn-outline"
//                   }`}
//                   onClick={() => setCurrentPage(pageNum)}
//                 >
//                   {pageNum}
//                 </button>
//               );
//             })}

//             <button
//               className="btn btn-sm"
//               disabled={currentPage === totalPages}
//               onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//             >
//               Next →
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default VolunteerDashboard;


import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Loading from "../Pages/Loading";

const VolunteerDashboard = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch paginated requests
  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const res = await axiosSecure.get(
          `/donation-requests?page=${currentPage}&size=8`
        );
        setRequests(res.data.requests || []);
        setTotalPages(res.data.totalPages || 1);
      } catch (err) {
        console.error("Failed to load requests", err);
        toast.error("Failed to load requests");
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, [axiosSecure, currentPage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-500 p-8 rounded-2xl shadow-lg text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <span className="text-2xl">🤝</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold">
                Volunteer Dashboard
              </h1>
            </div>
            <p className="text-xl md:text-2xl font-semibold text-white/90">
              {user?.displayName}
            </p>
            <p className="text-white/80 mt-2">View and manage all blood donation requests</p>
          </div>
        </div>

        {/* All Requests Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-8 py-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <span className="text-blue-600">🩸</span>
                  All Blood Donation Requests
                </h2>
                <p className="text-gray-600 text-sm mt-1">Monitor and track all donation requests</p>
              </div>
              <div className="hidden md:block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                Page {currentPage} of {totalPages}
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead className="bg-gray-50">
                <tr className="text-left text-gray-700 text-sm font-semibold">
                  <th className="py-4 px-6">Recipient Info</th>
                  <th className="py-4 px-6">Location</th>
                  <th className="py-4 px-6">Blood Type</th>
                  <th className="py-4 px-6">Schedule</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center py-12">
                      <div className="flex flex-col items-center gap-3">
                        <span className="loading loading-spinner loading-lg text-blue-600"></span>
                        <p className="text-gray-600 font-medium"><Loading/> requests...</p>
                      </div>
                    </td>
                  </tr>
                ) : requests.length > 0 ? (
                  requests.map((req) => (
                    <tr key={req._id} className="hover:bg-blue-50/50 transition-colors border-b border-gray-100 last:border-0">
                      <td className="py-4 px-6">
                        <div className="font-semibold text-gray-800">{req.recipientName}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-start gap-1 text-gray-700">
                          <span className="text-blue-500 mt-0.5">📍</span>
                          <div>
                            <div className="font-medium">{req.district}</div>
                            <div className="text-sm text-gray-500">{req.upazila}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-100 text-red-700 rounded-full text-sm font-bold">
                          🩸 {req.blood_group}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-gray-700">
                            <span className="text-purple-500">📅</span>
                            <span className="text-sm font-medium">{req.donation_date}</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-600">
                            <span className="text-purple-500">🕒</span>
                            <span className="text-sm">{req.donation_time}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold ${
                          req.donation_status === "pending" ? "bg-yellow-100 text-yellow-700" :
                          req.donation_status === "inprogress" ? "bg-blue-100 text-blue-700" :
                          req.donation_status === "done" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                        }`}>
                          {req.donation_status === "pending" && "⏳"}
                          {req.donation_status === "inprogress" && "🔄"}
                          {req.donation_status === "done" && "✅"}
                          {req.donation_status === "canceled" && "❌"}
                          <span className="capitalize">{req.donation_status}</span>
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <Link
                          to={`/donation-request/${req._id}`}
                          className="inline-flex items-center gap-1 px-4 py-2 text-sm font-semibold text-blue-700 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors"
                        >
                          👁️ View Details
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-12">
                      <div className="flex flex-col items-center gap-3">
                        <div className="text-6xl">📭</div>
                        <p className="text-gray-600 font-medium text-lg">No donation requests found</p>
                        <p className="text-gray-500 text-sm">Check back later for new requests</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 py-8 bg-gradient-to-r from-blue-50 to-purple-50">
              <button
                className="px-4 py-2 bg-white border-2 border-blue-300 text-blue-700 font-semibold rounded-lg hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                ← Previous
              </button>

              <div className="flex gap-2">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  return (
                    <button
                      key={pageNum}
                      className={`w-10 h-10 font-semibold rounded-lg transition-all ${
                        currentPage === pageNum 
                          ? "bg-gradient-to-r from-blue-600 to-purple-500 text-white shadow-lg scale-110" 
                          : "bg-white border-2 border-gray-300 text-gray-700 hover:border-blue-400"
                      }`}
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                className="px-4 py-2 bg-white border-2 border-blue-300 text-blue-700 font-semibold rounded-lg hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboard;