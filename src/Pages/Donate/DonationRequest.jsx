
// import { useEffect, useState, useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import useAxios from "../../hooks/useAxios"; // ⚠️ useAxios (not secure) for public page
// import { AuthContext } from "../../Context/AuthProvider";

// const DonationRequest = () => {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const axios = useAxios(); // Public API → no auth needed
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchRequests = async () => {
//       setLoading(true);
//       try {
//         const res = await axios.get(`/donation-request?status=pending&page=${currentPage}&size=8`);
//         setRequests(res.data.requests);
//         setTotalPages(res.data.totalPages);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchRequests();
//   }, [axios, currentPage]);

//   const handleView = (id) => {
//     if (!user) {
//       navigate("/login", { state: { from: `/donation-request/${id}` } });
//     } else {
//       navigate(`/donation-request/${id}`);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-red-50 to-white p-4 sm:p-6">
//       <div className="max-w-6xl mx-auto">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl md:text-4xl font-bold text-red-800 mb-2">
//              Pending Blood Requests
//           </h1>
//           <p className="text-gray-600">
//             These lives are waiting for your help.
//           </p>
//         </div>

//         <div className="bg-white rounded-xl shadow overflow-hidden">
//           {loading ? (
//             <div className="flex justify-center py-12">
//               <span className="loading loading-spinner text-red-600"></span>
//             </div>
//           ) : requests.length === 0 ? (
//             <div className="text-center py-12 text-gray-500">
//               No pending requests found.
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="table w-full">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th>Recipient</th>
//                     <th>Location</th>
//                     <th>Blood Group</th>
//                     <th>Date & Time</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {requests.map((req) => (
//                     <tr key={req._id} className="hover:bg-gray-50">
//                       <td className="font-medium">{req.recipientName}</td>
//                       <td>{req.district}, {req.upazila}</td>
//                       <td>
//                         <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
//                           {req.blood_group}
//                         </span>
//                       </td>
//                       <td>
//                         <div>{req.donation_date}</div>
//                         <div className="text-xs text-gray-500">{req.donation_time}</div>
//                       </td>
//                       <td>
//                         <button
//                           onClick={() => handleView(req._id)}
//                           className="btn btn-xs btn-error text-white"
//                         >
//                           View
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}

//           
//           {totalPages > 1 && (
//             <div className="flex justify-center items-center gap-2 py-6">
//               <button
//                 className="btn btn-sm"
//                 disabled={currentPage === 1}
//                 onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//               >
//                 ← Prev
//               </button>

//               {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                 let pageNum;
//                 if (totalPages <= 5) pageNum = i + 1;
//                 else if (currentPage <= 3) pageNum = i + 1;
//                 else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
//                 else pageNum = currentPage - 2 + i;
//                 return (
//                   <button
//                     key={pageNum}
//                     className={`btn btn-sm ${currentPage === pageNum ? "btn-error" : "btn-outline"}`}
//                     onClick={() => setCurrentPage(pageNum)}
//                   >
//                     {pageNum}
//                   </button>
//                 );
//               })}

//               <button
//                 className="btn btn-sm"
//                 disabled={currentPage === totalPages}
//                 onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//               >
//                 Next →
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DonationRequest;


import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { AuthContext } from "../../Context/AuthProvider";
import Loading from "../Loading";

const DonationRequest = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const axios = useAxios();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/donation-request?status=pending&page=${currentPage}&size=8`);
        setRequests(res.data.requests);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, [axios, currentPage]);

  const handleView = (id) => {
    if (!user) {
      navigate("/login", { state: { from: `/donation-request/${id}` } });
    } else {
      navigate(`/donation-request/${id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-red-600 to-orange-500 rounded-full mb-4 shadow-lg">
            <span className="text-4xl">🩸</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent mb-3">
            Urgent Blood Requests
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            These lives are waiting for your help. Your donation can save someone's life today.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-red-100 text-red-700 rounded-full">
            <span className="text-2xl">⏰</span>
            <span className="font-semibold">All requests are pending and need immediate attention</span>
          </div>
        </div>

        {/* Requests Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <span className="loading loading-spinner loading-lg text-red-600 mb-4"></span>
              <p className="text-gray-600 font-medium"><Loading/> urgent requests...</p>
            </div>
          ) : requests.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-7xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No Pending Requests</h3>
              <p className="text-gray-600">Great news! There are no urgent blood requests at the moment.</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead className="bg-gradient-to-r from-red-50 to-orange-50">
                    <tr className="text-left text-gray-700 text-sm font-semibold">
                      <th className="py-5 px-6">Recipient</th>
                      <th className="py-5 px-6">Location</th>
                      <th className="py-5 px-6">Blood Group</th>
                      <th className="py-5 px-6">Date & Time</th>
                      <th className="py-5 px-6">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map((req, index) => (
                      <tr 
                        key={req._id} 
                        className="hover:bg-red-50/50 transition-colors border-b border-gray-100 last:border-0"
                        style={{animationDelay: `${index * 0.05}s`}}
                      >
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                              {req.recipientName.charAt(0).toUpperCase()}
                            </div>
                            <span className="font-semibold text-gray-800">{req.recipientName}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-start gap-1 text-gray-700">
                            <span className="text-red-500 mt-0.5">📍</span>
                            <div>
                              <div className="font-medium">{req.district}</div>
                              <div className="text-sm text-gray-500">{req.upazila}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center gap-1 px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-bold shadow-sm">
                            🩸 {req.blood_group}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="space-y-1">
                            <div className="flex items-center gap-1 text-gray-700">
                              <span className="text-orange-500">📅</span>
                              <span className="text-sm font-medium">{req.donation_date}</span>
                            </div>
                            <div className="flex items-center gap-1 text-gray-600">
                              <span className="text-orange-500">🕒</span>
                              <span className="text-sm">{req.donation_time}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <button
                            onClick={() => handleView(req._id)}
                            className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-orange-500 text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all"
                          >
                            View Details →
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-3 py-8 bg-gradient-to-r from-red-50 to-orange-50">
                  <button
                    className="px-4 py-2 bg-white border-2 border-red-300 text-red-700 font-semibold rounded-lg hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  >
                    ← Previous
                  </button>

                  <div className="flex gap-2">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) pageNum = i + 1;
                      else if (currentPage <= 3) pageNum = i + 1;
                      else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                      else pageNum = currentPage - 2 + i;
                      return (
                        <button
                          key={pageNum}
                          className={`w-10 h-10 font-semibold rounded-lg transition-all ${
                            currentPage === pageNum 
                              ? "bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-lg scale-110" 
                              : "bg-white border-2 border-gray-300 text-gray-700 hover:border-red-400"
                          }`}
                          onClick={() => setCurrentPage(pageNum)}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    className="px-4 py-2 bg-white border-2 border-red-300 text-red-700 font-semibold rounded-lg hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Call to Action */}
        {!loading && requests.length > 0 && (
          <div className="mt-12 text-center bg-gradient-to-r from-red-600 to-orange-500 rounded-2xl p-8 text-white shadow-xl">
            <h3 className="text-2xl font-bold mb-3">Every Second Counts</h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Your blood donation can be the difference between life and death. Click on any request to see full details and confirm your donation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="px-6 py-3 bg-white/20 rounded-lg backdrop-blur">
                <div className="text-3xl font-bold">{requests.length}</div>
                <div className="text-sm text-white/80">Active Requests</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationRequest;