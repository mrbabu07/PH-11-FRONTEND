import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SearchRequest() {
  const navigate = useNavigate();
  const [bloodGroup, setBloodGroup] = useState("");
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load districts and upazilas from JSON
  useEffect(() => {
    axios.get("/district.json").then(res => setDistricts(res.data.districts));
    axios.get("/upazila.json").then(res => setUpazilas(res.data.upazilas));
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setRequests([]);

    try {
      const params = new URLSearchParams();
      if (bloodGroup) params.append("blood_group", bloodGroup);
      if (district) params.append("district", district);
      if (upazila) params.append("upazila", upazila);

      const res = await axios.get(
        `http://localhost:5000/donation-requests?${params.toString()}`
      );

      setRequests(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch requests");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6">Search Blood Requests</h1>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="bg-white p-6 rounded-xl shadow-md mb-6">
          <div className="space-y-4">
            <div>
              <label>Blood Group</label>
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="w-full border rounded p-2"
              >
                <option value="">Select Blood Group</option>
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bg => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>

            <div>
              <label>District</label>
              <select
                value={district}
                onChange={(e) => {
                  setDistrict(e.target.value);
                  setUpazila(""); // Reset upazila
                }}
                className="w-full border rounded p-2"
              >
                <option value="">Select District</option>
                {districts.map(d => (
                  <option key={d.id} value={d.name}>{d.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label>Upazila</label>
              <select
                value={upazila}
                onChange={(e) => setUpazila(e.target.value)}
                disabled={!district}
                className="w-full border rounded p-2"
              >
                <option value="">Select Upazila</option>
                {upazilas
                  .filter(u => u.district_id === districts.find(d => d.name === district)?.id)
                  .map(u => (
                    <option key={u.id} value={u.name}>{u.name}</option>
                  ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-blue-600 text-white py-2 rounded"
          >
            {loading ? "Searching..." : "Search Requests"}
          </button>
        </form>

        {/* Results */}
        {requests.length > 0 && (
          <div className="space-y-4">
            {requests.map(req => (
              <div key={req._id} className="bg-white p-4 rounded shadow flex justify-between items-center">
                <div>
                  <h3 className="font-bold">{req.recipientName}</h3>
                  <p>{req.blood_group}</p>
                  <p>{req.hospital}, {req.upazila}, {req.district}</p>
                  <p>{req.donation_date} at {req.donation_time}</p>
                </div>
                <button
                  className="btn btn-sm btn-outline"
                  onClick={() => navigate(`/donation-request/${req._id}`)}
                >
                  View
                </button>
              </div>
            ))}
          </div>
        )}

        {requests.length === 0 && !loading && (
          <p className="text-center text-gray-500">No requests found. Try a different search.</p>
        )}
      </div>
    </div>
  );
}

export default SearchRequest;
