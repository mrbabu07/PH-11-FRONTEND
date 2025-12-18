
// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { AuthContext } from "../../Context/AuthProvider";
// import { useContext } from "react";
// import toast from "react-hot-toast";

// const DonationRequestDetails = () => {
//   const { id } = useParams();
//   const axiosSecure = useAxiosSecure();
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const [request, setRequest] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [confirming, setConfirming] = useState(false);

//   useEffect(() => {
//     axiosSecure
//       .get(`/donation-request/${id}`)
//       .then((res) => {
//         setRequest(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error loading request:", err);
//         setLoading(false);
//         toast.error("Failed to load request");
//       });
//   }, [id, axiosSecure]);

//   const handleDonate = () => {
//     if (!user) {
//       toast.error("Please log in to donate");
//       navigate("/login");
//       return;
//     }
//     setIsModalOpen(true);
//   };

//   const handleConfirmDonation = async () => {
//     if (!user || !request) return;

//     setConfirming(true);
//     try {
//       
//       await axiosSecure.patch(`/donation-request/${id}/donate`, {
//         donorName: user.displayName,
//         donorEmail: user.email,
//         donation_status: "inprogress",
//       });

//      
//       setRequest((prev) => ({
//         ...prev,
//         donation_status: "inprogress",
//         donorName: user.displayName,
//         donorEmail: user.email,
//       }));

//       toast.success("Donation confirmed! Status updated to In Progress.");
//       setIsModalOpen(false);
//     } catch (error) {
//       console.error("Donation error:", error);
//       toast.error("Failed to confirm donation");
//     } finally {
//       setConfirming(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <span className="loading loading-spinner text-primary"></span>
//       </div>
//     );
//   }

//   if (!request) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-error">Request not found</p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-3xl mx-auto p-4 md:p-6">
//       <div className="bg-white shadow-lg rounded-lg p-6">
//         <h1 className="text-2xl font-bold text-center mb-6 text-blue-700">
//           Blood Request Details
//         </h1>

//         <div className="space-y-4">
//           <div className="flex justify-between border-b pb-2">
//             <span className="font-semibold">Requester:</span>
//             <span>{request.requesterName}</span>
//           </div>

//           <div className="flex justify-between border-b pb-2">
//             <span className="font-semibold">Recipient:</span>
//             <span>{request.recipientName}</span>
//           </div>

//           <div className="flex justify-between border-b pb-2">
//             <span className="font-semibold">Blood Group:</span>
//             <span className="badge badge-error">
//               {request.blood_group || "N/A"}
//             </span>
//           </div>

//           <div className="flex justify-between border-b pb-2">
//             <span className="font-semibold">Location:</span>
//             <span>
//               {request.district}, {request.upazila}
//             </span>
//           </div>

//           <div className="flex justify-between border-b pb-2">
//             <span className="font-semibold">Hospital:</span>
//             <span>{request.hospital || "N/A"}</span>
//           </div>

//           <div className="flex justify-between border-b pb-2">
//             <span className="font-semibold">Address:</span>
//             <span className="text-sm text-gray-600">
//               {request.address || "N/A"}
//             </span>
//           </div>

//           <div className="flex justify-between border-b pb-2">
//             <span className="font-semibold">Donation Date:</span>
//             <span>{request.donation_date || "Not set"}</span>
//           </div>

//           <div className="flex justify-between border-b pb-2">
//             <span className="font-semibold">Donation Time:</span>
//             <span>{request.donation_time || "Not set"}</span>
//           </div>

//           <div className="flex justify-between pb-2">
//             <span className="font-semibold">Status:</span>
//             <span
//               className={`badge ${
//                 request.donation_status === "pending"
//                   ? "badge-warning"
//                   : request.donation_status === "inprogress"
//                   ? "badge-info"
//                   : request.donation_status === "done"
//                   ? "badge-success"
//                   : "badge-error"
//               }`}
//             >
//               {request.donation_status}
//             </span>
//           </div>

//           {request.request_message && (
//             <div className="pt-2">
//               <span className="font-semibold">Message:</span>
//               <p className="mt-1 text-gray-700">{request.request_message}</p>
//             </div>
//           )}

//           {/* Donate Button (only for pending requests and logged-in users) */}
//           {request.donation_status === "pending" && user && (
//             <div className="pt-4 text-center">
//               <button onClick={handleDonate} className="btn btn-primary">
//                 Donate Now
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Action Buttons for Donor */}
//       {user && request.donation_status === "inprogress" && (
//         <div className="pt-4 flex justify-center gap-3">
//           <button
//             onClick={async () => {
//               try {
//                 await axiosSecure.patch(
//                   `/donation-request/${id}/update-status`,
//                   {
//                     donation_status: "done",
//                   }
//                 );
//                 setRequest((prev) => ({ ...prev, donation_status: "done" }));
//                 toast.success("Donation marked as done!");
//               } catch (err) {
//                 toast.error("Failed to update status");
//               }
//             }}
//             className="btn btn-success"
//           >
//             Mark as Done
//           </button>
//           <button
//             onClick={async () => {
//               try {
//                 await axiosSecure.patch(
//                   `/donation-request/${id}/update-status`,
//                   {
//                     donation_status: "canceled",
//                   }
//                 );
//                 setRequest((prev) => ({
//                   ...prev,
//                   donation_status: "canceled",
//                 }));
//                 toast.success("Donation canceled");
//               } catch (err) {
//                 toast.error("Failed to cancel donation");
//               }
//             }}
//             className="btn btn-error"
//           >
//             Cancel
//           </button>
//         </div>
//       )}
//       {/* Confirmation Modal */}
//       {isModalOpen && (
//         <div className="modal modal-open">
//           <div className="modal-box">
//             <h3 className="font-bold text-lg">Confirm Your Donation</h3>
//             <p className="py-4">
//               You are about to confirm your willingness to donate blood for this
//               request.
//             </p>

//             <div className="space-y-3 mb-4">
//               <div>
//                 <label className="text-sm font-medium">Donor Name</label>
//                 <input
//                   type="text"
//                   readOnly
//                   value={user?.displayName || ""}
//                   className="input input-bordered w-full mt-1"
//                 />
//               </div>
//               <div>
//                 <label className="text-sm font-medium">Donor Email</label>
//                 <input
//                   type="email"
//                   readOnly
//                   value={user?.email || ""}
//                   className="input input-bordered w-full mt-1"
//                 />
//               </div>
//             </div>

//             <div className="modal-action">
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 className="btn btn-outline"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleConfirmDonation}
//                 disabled={confirming}
//                 className="btn btn-primary"
//               >
//                 {confirming ? "Confirming..." : "Confirm Donation"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DonationRequestDetails;


import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../Context/AuthProvider";
import toast from "react-hot-toast";
import Loading from "../Loading";

const DonationRequestDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    axiosSecure
      .get(`/donation-request/${id}`)
      .then((res) => {
        setRequest(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading request:", err);
        setLoading(false);
        toast.error("Failed to load request");
      });
  }, [id, axiosSecure]);

  const handleDonate = () => {
    if (!user) {
      toast.error("Please log in to donate");
      navigate("/login");
      return;
    }
    setIsModalOpen(true);
  };

  const handleConfirmDonation = async () => {
    if (!user || !request) return;

    setConfirming(true);
    try {
      await axiosSecure.patch(`/donation-request/${id}/donate`, {
        donorName: user.displayName,
        donorEmail: user.email,
        donation_status: "inprogress",
      });

      setRequest((prev) => ({
        ...prev,
        donation_status: "inprogress",
        donorName: user.displayName,
        donorEmail: user.email,
      }));

      toast.success("Donation confirmed! Status updated to In Progress.");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Donation error:", error);
      toast.error("Failed to confirm donation");
    } finally {
      setConfirming(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"><Loading/></span>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <button onClick={() => navigate(-1)} className="btn btn-primary">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="bg-red-600 text-white p-6 rounded-xl mb-6">
          <h1 className="text-2xl font-bold">Blood Donation Request</h1>
          <p>ID: {id?.slice(0, 8)}...</p>
        </div>

        {/* Status */}
        <div className="mb-6">
          <span className="font-semibold">Status:</span>{" "}
          <span className="capitalize">{request.donation_status}</span>
        </div>

        {/* Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Requester */}
          <div className="p-4 border rounded-lg">
            <h3 className="font-bold mb-2">Requester</h3>
            <p>{request.requesterName}</p>
          </div>

          {/* Recipient */}
          <div className="p-4 border rounded-lg">
            <h3 className="font-bold mb-2">Recipient</h3>
            <p>{request.recipientName}</p>
          </div>

          {/* Blood Group */}
          <div className="p-4 border rounded-lg">
            <h3 className="font-bold mb-2">Blood Group</h3>
            <p className="text-lg font-bold">{request.blood_group}</p>
          </div>

          {/* Location */}
          <div className="p-4 border rounded-lg">
            <h3 className="font-bold mb-2">Location</h3>
            <p>{request.district}</p>
            <p>{request.upazila}</p>
          </div>

          {/* Hospital */}
          <div className="p-4 border rounded-lg">
            <h3 className="font-bold mb-2">Hospital</h3>
            <p>{request.hospital || "N/A"}</p>
          </div>

          {/* Address */}
          <div className="p-4 border rounded-lg">
            <h3 className="font-bold mb-2">Address</h3>
            <p>{request.address || "N/A"}</p>
          </div>

          {/* Date */}
          <div className="p-4 border rounded-lg">
            <h3 className="font-bold mb-2">Donation Date</h3>
            <p>{request.donation_date || "Not set"}</p>
          </div>

          {/* Time */}
          <div className="p-4 border rounded-lg">
            <h3 className="font-bold mb-2">Donation Time</h3>
            <p>{request.donation_time || "Not set"}</p>
          </div>
        </div>

        {/* Message */}
        {request.request_message && (
          <div className="mt-6 p-4 border rounded-lg">
            <h3 className="font-bold mb-2">Message</h3>
            <p>{request.request_message}</p>
          </div>
        )}

        {/* Donate Button */}
        {request.donation_status === "pending" && user && (
          <div className="mt-8 text-center">
            <button onClick={handleDonate} className="btn btn-error text-white">
              Confirm Donation
            </button>
          </div>
        )}

        {/* In Progress Actions */}
        {user && request.donation_status === "inprogress" && (
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={async () => {
                try {
                  await axiosSecure.patch(`/donation-request/${id}/update-status`, {
                    donation_status: "done",
                  });
                  setRequest((prev) => ({ ...prev, donation_status: "done" }));
                  toast.success("Donation marked as done!");
                } catch {
                  toast.error("Failed to update status");
                }
              }}
              className="btn btn-success text-white"
            >
              Mark as Done
            </button>

            <button
              onClick={async () => {
                try {
                  await axiosSecure.patch(`/donation-request/${id}/update-status`, {
                    donation_status: "canceled",
                  });
                  setRequest((prev) => ({ ...prev, donation_status: "canceled" }));
                  toast.success("Donation canceled");
                } catch {
                  toast.error("Failed to cancel donation");
                }
              }}
              className="btn btn-outline"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Confirm Donation</h3>

            <input
              type="text"
              readOnly
              value={user?.displayName || ""}
              className="input input-bordered w-full mb-3"
            />
            <input
              type="email"
              readOnly
              value={user?.email || ""}
              className="input input-bordered w-full mb-4"
            />

            <div className="flex gap-3">
              <button onClick={() => setIsModalOpen(false)} className="btn">
                Cancel
              </button>
              <button
                onClick={handleConfirmDonation}
                disabled={confirming}
                className="btn btn-error text-white"
              >
                {confirming ? "Confirming..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationRequestDetails;
