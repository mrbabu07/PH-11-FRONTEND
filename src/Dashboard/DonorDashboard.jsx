// 
// import React, { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../Context/AuthProvider";
// import useAxiosSecure from "../hooks/useAxiosSecure";
// import { Link, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// const DonorDashboard = () => {
//   const { user } = useContext(AuthContext);
//   const axiosSecure = useAxiosSecure();
//   const navigate = useNavigate();
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch max 3 recent requests
//   useEffect(() => {
//     const fetchRequests = async () => {
//       try {
//         const res = await axiosSecure.get("/my-request?size=3&page=0");
//         setRequests(res.data.request || []);
//         setLoading(false);
//       } catch (err) {
//         console.error("Failed to load requests", err);
//         toast.error("Failed to load requests");
//         setLoading(false);
//       }
//     };
//     fetchRequests();
//   }, [axiosSecure]);

//   // Handle Done / Cancel
//   const handleStatusUpdate = async (id, newStatus) => {
//     try {
//       await axiosSecure.patch(`/donation-request/${id}/update-status`, {
//         donation_status: newStatus,
//       });
//       // Refresh
//       const res = await axiosSecure.get("/my-request?size=3&page=0");
//       setRequests(res.data.request || []);
//       toast.success(`Request marked as ${newStatus}`);
//     } catch (err) {
//       toast.error("Failed to update status");
//     }
//   };

//   // Handle Delete
//   const handleDelete = async (id) => {
//     if (!confirm("Are you sure you want to delete this request?")) return;
//     try {
//       await axiosSecure.delete(`/requests/${id}`);
//       setRequests(prev => prev.filter(r => r._id !== id));
//       toast.success("Request deleted");
//     } catch (err) {
//       toast.error("Failed to delete request");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <span className="loading loading-spinner text-primary"></span>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-8">
//       {/* Welcome Section */}
//       <div className="bg-white p-6 rounded-xl shadow-sm">
//         <h1 className="text-2xl font-bold text-gray-800">
//           Welcome, <span className="text-red-600">{user?.displayName}</span>!
//         </h1>
//         <p className="text-gray-600">Manage your blood donation requests here.</p>
//       </div>

//       {/* Recent Requests */}
//       {requests.length > 0 && (
//         <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//           <div className="px-6 py-4 border-b border-gray-200">
//             <h2 className="text-xl font-semibold">Your Recent Requests</h2>
//           </div>
//           <div className="overflow-x-auto">
//             <table className="table w-full">
//               <thead>
//                 <tr className="text-left text-gray-500 text-sm">
//                   <th>Recipient</th>
//                   <th>Location</th>
//                   <th>Blood Group</th>
//                   <th>Date & Time</th>
//                   <th>Status</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {requests.map((req) => (
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
//                       <div className="flex flex-wrap gap-1">
//                         <Link
//                           to={`/donation-request/${req._id}`}
//                           className="btn btn-xs btn-outline"
//                         >
//                           View
//                         </Link>
//                         <button
//                           onClick={() => navigate(`/dashboard/edit-request/${req._id}`)}
//                           className="btn btn-xs btn-primary"
//                         >
//                           Edit
//                         </button>
//                         <button
//                           onClick={() => handleDelete(req._id)}
//                           className="btn btn-xs btn-error"
//                         >
//                           Delete
//                         </button>
//                         {req.donation_status === "inprogress" && (
//                           <>
//                             <button
//                               onClick={() => handleStatusUpdate(req._id, "done")}
//                               className="btn btn-xs btn-success"
//                             >
//                               Done
//                             </button>
//                             <button
//                               onClick={() => handleStatusUpdate(req._id, "canceled")}
//                               className="btn btn-xs btn-error"
//                             >
//                               Cancel
//                             </button>
//                           </>
//                         )}
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

//       {/* View All Button */}
//       <div className="text-center">
//         <Link
//           to="/dashboard/donation-request"
//           className="btn btn-primary"
//         >
//           View My All Requests
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default DonorDashboard;


// 
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loading from "../Pages/Loading";
import { X, AlertTriangle, Trash2 } from "lucide-react";

const DonorDashboard = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch max 3 recent requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axiosSecure.get("/my-request?size=3&page=0");
        setRequests(res.data.request || []);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load requests", err);
        toast.error("Failed to load requests");
        setLoading(false);
      }
    };
    fetchRequests();
  }, [axiosSecure]);

  // Handle Done / Cancel
  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await axiosSecure.patch(`/donation-request/${id}/update-status`, {
        donation_status: newStatus,
      });
      // Refresh
      const res = await axiosSecure.get("/my-request?size=3&page=0");
      setRequests(res.data.request || []);
      toast.success(`Request marked as ${newStatus}`);
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  // Open delete modal
  const openDeleteModal = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  // Close delete modal
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  // Handle Delete
  const handleDelete = async () => {
    if (!deleteId) return;
    
    setIsDeleting(true);
    try {
      await axiosSecure.delete(`/requests/${deleteId}`);
      setRequests(prev => prev.filter(r => r._id !== deleteId));
      toast.success("Request deleted successfully");
      closeDeleteModal();
    } catch (err) {
      toast.error("Failed to delete request");
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-red-600 to-orange-500 p-8 rounded-2xl shadow-lg text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <span className="text-2xl">🩸</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold">
                Welcome Back!
              </h1>
            </div>
            <p className="text-xl md:text-2xl font-semibold text-white/90">
              {user?.displayName}
            </p>
            <p className="text-white/80 mt-2">Manage your blood donation requests and make a difference</p>
          </div>
        </div>

        {/* Recent Requests */}
        {requests.length > 0 ? (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-red-50 to-orange-50 px-8 py-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <span className="text-red-600">📋</span>
                    Recent Requests
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">Your latest 3 donation requests</p>
                </div>
                <div className="hidden md:block px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                  {requests.length} Request{requests.length > 1 ? 's' : ''}
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
                  {requests.map((req) => (
                    <tr key={req._id} className="hover:bg-red-50/50 transition-colors border-b border-gray-100 last:border-0">
                      <td className="py-4 px-6">
                        <div className="font-semibold text-gray-800">{req.recipientName}</div>
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
                        <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-100 text-red-700 rounded-full text-sm font-bold">
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
                        <div className="flex flex-wrap gap-2">
                          <Link
                            to={`/donation-request/${req._id}`}
                            className="px-3 py-1.5 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                          >
                            👁️ View
                          </Link>
                          <button
                            onClick={() => navigate(`/dashboard/edit-request/${req._id}`)}
                            className="px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors"
                          >
                            ✏️ Edit
                          </button>
                          <button
                            onClick={() => openDeleteModal(req._id)}
                            className="px-3 py-1.5 text-xs font-semibold text-red-700 bg-red-100 hover:bg-red-200 rounded-lg transition-colors"
                          >
                            🗑️ Delete
                          </button>
                          {req.donation_status === "inprogress" && (
                            <>
                              <button
                                onClick={() => handleStatusUpdate(req._id, "done")}
                                className="px-3 py-1.5 text-xs font-semibold text-green-700 bg-green-100 hover:bg-green-200 rounded-lg transition-colors"
                              >
                                ✅ Done
                              </button>
                              <button
                                onClick={() => handleStatusUpdate(req._id, "canceled")}
                                className="px-3 py-1.5 text-xs font-semibold text-orange-700 bg-orange-100 hover:bg-orange-200 rounded-lg transition-colors"
                              >
                                ❌ Cancel
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Recent Requests</h3>
            <p className="text-gray-600 mb-6">You haven't created any donation requests yet</p>
            <Link
              to="/dashboard/create-donation-request"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-orange-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
            >
              <span>➕</span>
              Create Your First Request
            </Link>
          </div>
        )}

        {/* View All Button */}
        {requests.length > 0 && (
          <div className="text-center pb-8">
            <Link
              to="/dashboard/my-request"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold rounded-xl hover:shadow-xl transform hover:scale-105 transition-all text-lg"
            >
              <span>📂</span>
              View All My Requests
              <span>→</span>
            </Link>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
          onClick={closeDeleteModal}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden transform transition-all animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <AlertTriangle size={24} />
                  </div>
                  <h3 className="text-xl font-bold">Confirm Deletion</h3>
                </div>
                <button
                  onClick={closeDeleteModal}
                  disabled={isDeleting}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors disabled:opacity-50"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <p className="text-gray-700 text-lg mb-2">
                Are you sure you want to delete this blood donation request?
              </p>
              <p className="text-gray-500 text-sm">
                This action cannot be undone. The request will be permanently removed from the system.
              </p>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-6 py-4 flex gap-3 justify-end border-t border-gray-200">
              <button
                onClick={closeDeleteModal}
                disabled={isDeleting}
                className="px-6 py-2.5 rounded-lg font-medium border-2 border-gray-300 text-gray-700 hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-6 py-2.5 rounded-lg font-medium bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeleting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 size={18} />
                    Delete Request
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonorDashboard;