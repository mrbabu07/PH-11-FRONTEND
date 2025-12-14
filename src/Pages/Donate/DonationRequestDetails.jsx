// src/Pages/Donate/DonationRequestDetails.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const DonationRequestDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);

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
      });
  }, [id, axiosSecure]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-error">Request not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-700">
          Blood Request Details
        </h1>

        <div className="space-y-4">
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">Requester:</span>
            <span>{request.requesterName}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">Recipient:</span>
            <span>{request.recipientName}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">Blood Group:</span>
            <span className="badge badge-error">{request.blood_group || "N/A"}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">Location:</span>
            <span>{request.district}, {request.upazila}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">Hospital:</span>
            <span>{request.hospital || "N/A"}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">Address:</span>
            <span className="text-sm text-gray-600">{request.address || "N/A"}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">Donation Date:</span>
            <span>{request.donation_date || "Not set"}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">Donation Time:</span>
            <span>{request.donation_time || "Not set"}</span>
          </div>

          <div className="flex justify-between pb-2">
            <span className="font-semibold">Status:</span>
            <span
              className={`badge ${
                request.donation_status === "pending"
                  ? "badge-warning"
                  : request.donation_status === "done"
                  ? "badge-success"
                  : "badge-error"
              }`}
            >
              {request.donation_status}
            </span>
          </div>

          {request.request_message && (
            <div className="pt-2">
              <span className="font-semibold">Message:</span>
              <p className="mt-1 text-gray-700">{request.request_message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonationRequestDetails;