// import { useEffect, useState } from "react";
// import useAxiosSecure from "../../hooks/useAxiosSecure";

// const statuses = ["all", "pending", "inprogress", "done", "canceled"];

// const MyRequest = () => {
//   const [myRequest, setMyRequest] = useState([]);
//   const [totalRequest, setTotalRequest] = useState(0);
//   const [filteredStatus, setFilteredStatus] = useState("all");
//   const [currentPage, setCurrentPage] = useState(1);
//   const requestsPerPage = 5;

//   const axiosSecure = useAxiosSecure();

//   const fetchMyRequest = async (page = 0, size = requestsPerPage) => {
//     try {
//       const res = await axiosSecure.get(
//         `/my-request?page=${page}&size=${size}`
//       );
//       setMyRequest(res.data.request);
//       setTotalRequest(res.data.totalRequest);
//     } catch (err) {
//       console.error("Failed to load requests", err);
//     }
//   };

//   useEffect(() => {
//     fetchMyRequest(currentPage -1);
//   }, [axiosSecure, currentPage]);

//   // Filtered requests
//   const filteredRequests =
//     filteredStatus === "all"
//       ? myRequest
//       : myRequest.filter((req) => req.donation_status === filteredStatus);

//   const totalPages = Math.ceil(totalRequest / requestsPerPage);

//   return (
//     <div className="overflow-x-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">My Blood Requests 🩸</h2>

//       {/* Status Filter */}
//       <div className="mb-4 flex gap-2">
//         {statuses.map((status) => (
//           <button
//             key={status}
//             className={`btn btn-sm ${
//               filteredStatus === status ? "btn-primary" : "btn-outline"
//             }`}
//             onClick={() => {
//               setFilteredStatus(status);
//               setCurrentPage(1); // reset page when filter changes
//             }}
//           >
//             {status.charAt(0).toUpperCase() + status.slice(1)}
//           </button>
//         ))}
//       </div>

//       <table className="table table-zebra w-full">
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Recipient</th>
//             <th>Blood</th>
//             <th>Location</th>
//             <th>Date</th>
//             <th>Time</th>
//             <th>Status</th>
//           </tr>
//         </thead>

//         <tbody>
//           {filteredRequests.length === 0 ? (
//             <tr>
//               <td colSpan="7" className="text-center">
//                 No requests found
//               </td>
//             </tr>
//           ) : (
//             filteredRequests.map((req, index) => (
//               <tr key={req._id}>
//                 <td>{(currentPage - 1) * requestsPerPage + index + 1}</td>
//                 <td>{req.recipientName}</td>
//                 <td>{req.blood_group}</td>
//                 <td>
//                   {req.district}, {req.upazila}
//                 </td>
//                 <td>{req.donation_date}</td>
//                 <td>{req.donation_time}</td>
//                 <td>
//                   <span
//                     className={`badge ${
//                       req.donation_status === "pending"
//                         ? "badge-warning"
//                         : req.donation_status === "done"
//                         ? "badge-success"
//                         : req.donation_status === "canceled"
//                         ? "badge-error"
//                         : "badge-info"
//                     }`}
//                   >
//                     {req.donation_status}
//                   </span>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>

//       {/* Pagination */}
//       <div className="mt-4 flex justify-center gap-2">
//         <button
//           className="btn btn-sm"
//           disabled={currentPage === 1}
//           onClick={() => setCurrentPage((prev) => prev - 1)}
//         >
//           Prev
//         </button>

//         {Array.from({ length: totalPages }, (_, i) => (
//           <button
//             key={i}
//             className={`btn btn-sm ${
//               currentPage === i + 1 ? "btn-primary" : "btn-outline"
//             }`}
//             onClick={() => setCurrentPage(i + 1)}
//           >
//             {i + 1}
//           </button>
//         ))}

//         <button
//           className="btn btn-sm"
//           disabled={currentPage === totalPages || totalPages === 0}
//           onClick={() => setCurrentPage((prev) => prev + 1)}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MyRequest;


import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const statuses = ["all", "pending", "inprogress", "done", "canceled"];

const MyRequest = () => {
  const [myRequest, setMyRequest] = useState([]);
  const [totalRequest, setTotalRequest] = useState(0);
  const [filteredStatus, setFilteredStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const requestsPerPage = 5;

  const axiosSecure = useAxiosSecure();

  const fetchMyRequest = async (page = 0, size = requestsPerPage) => {
    try {
      const res = await axiosSecure.get(
        `/my-request?page=${page}&size=${size}`
      );
      setMyRequest(res.data.request);
      setTotalRequest(res.data.totalRequest);
    } catch (err) {
      console.error("Failed to load requests", err);
    }
  };

  useEffect(() => {
    fetchMyRequest(currentPage - 1);
  }, [axiosSecure, currentPage]);

  // Filtered requests
  const filteredRequests =
    filteredStatus === "all"
      ? myRequest
      : myRequest.filter((req) => req.donation_status === filteredStatus);

  const totalPages = Math.ceil(totalRequest / requestsPerPage);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "inprogress":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "done":
        return "bg-green-100 text-green-800 border-green-300";
      case "canceled":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-orange-50 p-4 py-8">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-64 h-64 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2c-1.5 3.5-6 8-6 12a6 6 0 0012 0c0-4-4.5-8.5-6-12z"/>
              </svg>
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-red-700 to-red-500 bg-clip-text text-transparent">
              My Blood Requests
            </h2>
          </div>
          <p className="text-gray-600 ml-15">Track and manage your donation requests</p>
        </div>

        {/* Status Filter */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-6 border border-red-100">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Filter by Status</h3>
          <div className="flex flex-wrap gap-3">
            {statuses.map((status) => (
              <button
                key={status}
                className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-0.5 ${
                  filteredStatus === status
                    ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg"
                    : "bg-white text-gray-700 border-2 border-gray-200 hover:border-red-300 hover:shadow-md"
                }`}
                onClick={() => {
                  setFilteredStatus(status);
                  setCurrentPage(1);
                }}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-red-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-red-600 to-red-700 text-white">
                  <th className="px-6 py-4 text-left text-sm font-semibold">#</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Recipient</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Blood Group</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Location</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Time</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {filteredRequests.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                          </svg>
                        </div>
                        <p className="text-gray-600 font-medium">No requests found</p>
                        <p className="text-gray-500 text-sm">Try adjusting your filters</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredRequests.map((req, index) => (
                    <tr 
                      key={req._id} 
                      className="hover:bg-red-50/50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 text-gray-700 font-medium">
                        {(currentPage - 1) * requestsPerPage + index + 1}
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-gray-800">{req.recipientName}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center justify-center w-12 h-12 bg-red-100 text-red-700 font-bold rounded-lg">
                          {req.blood_group}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-gray-700">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>{req.district}, {req.upazila}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-gray-700">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>{req.donation_date}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-gray-700">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{req.donation_time}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${getStatusColor(req.donation_status)}`}>
                          {req.donation_status.charAt(0).toUpperCase() + req.donation_status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 0 && (
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Showing <span className="font-medium">{(currentPage - 1) * requestsPerPage + 1}</span> to{" "}
                  <span className="font-medium">
                    {Math.min(currentPage * requestsPerPage, totalRequest)}
                  </span>{" "}
                  of <span className="font-medium">{totalRequest}</span> requests
                </p>

                <div className="flex gap-2">
                  <button
                    className="px-4 py-2 rounded-lg font-medium border-2 border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                  >
                    ← Prev
                  </button>

                  <div className="hidden sm:flex gap-2">
                    {Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i}
                        className={`w-10 h-10 rounded-lg font-medium transition-all ${
                          currentPage === i + 1
                            ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg"
                            : "border-2 border-gray-300 text-gray-700 hover:border-red-300 hover:bg-red-50"
                        }`}
                        onClick={() => setCurrentPage(i + 1)}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>

                  <button
                    className="px-4 py-2 rounded-lg font-medium border-2 border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    disabled={currentPage === totalPages || totalPages === 0}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                  >
                    Next →
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyRequest;