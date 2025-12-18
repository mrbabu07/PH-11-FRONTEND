// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function SearchRequest() {
//   const navigate = useNavigate();
//   const [bloodGroup, setBloodGroup] = useState("");
//   const [district, setDistrict] = useState("");
//   const [upazila, setUpazila] = useState("");

//   const [districts, setDistricts] = useState([]);
//   const [upazilas, setUpazilas] = useState([]);
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Load districts and upazilas from JSON
//   useEffect(() => {
//     axios.get("/district.json").then(res => setDistricts(res.data.districts));
//     axios.get("/upazila.json").then(res => setUpazilas(res.data.upazilas));
//   }, []);

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setRequests([]);

//     try {
//       const params = new URLSearchParams();
//       if (bloodGroup) params.append("blood_group", bloodGroup);
//       if (district) params.append("district", district);
//       if (upazila) params.append("upazila", upazila);

//       const res = await axios.get(
//         `http://localhost:5000/donation-requests?${params.toString()}`
//       );

//       setRequests(res.data);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to fetch requests");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4">
//       <div className="max-w-2xl mx-auto">
//         <h1 className="text-2xl font-bold text-center mb-6">Search Blood Requests</h1>

//         {/* Search Form */}
//         <form onSubmit={handleSearch} className="bg-white p-6 rounded-xl shadow-md mb-6">
//           <div className="space-y-4">
//             <div>
//               <label>Blood Group</label>
//               <select
//                 value={bloodGroup}
//                 onChange={(e) => setBloodGroup(e.target.value)}
//                 className="w-full border rounded p-2"
//               >
//                 <option value="">Select Blood Group</option>
//                 {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bg => (
//                   <option key={bg} value={bg}>{bg}</option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label>District</label>
//               <select
//                 value={district}
//                 onChange={(e) => {
//                   setDistrict(e.target.value);
//                   setUpazila(""); // Reset upazila
//                 }}
//                 className="w-full border rounded p-2"
//               >
//                 <option value="">Select District</option>
//                 {districts.map(d => (
//                   <option key={d.id} value={d.name}>{d.name}</option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label>Upazila</label>
//               <select
//                 value={upazila}
//                 onChange={(e) => setUpazila(e.target.value)}
//                 disabled={!district}
//                 className="w-full border rounded p-2"
//               >
//                 <option value="">Select Upazila</option>
//                 {upazilas
//                   .filter(u => u.district_id === districts.find(d => d.name === district)?.id)
//                   .map(u => (
//                     <option key={u.id} value={u.name}>{u.name}</option>
//                   ))}
//               </select>
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="w-full mt-4 bg-blue-600 text-white py-2 rounded"
//           >
//             {loading ? "Searching..." : "Search Requests"}
//           </button>
//         </form>

//         {/* Results */}
//         {requests.length > 0 && (
//           <div className="space-y-4">
//             {requests.map(req => (
//               <div key={req._id} className="bg-white p-4 rounded shadow flex justify-between items-center">
//                 <div>
//                   <h3 className="font-bold">{req.recipientName}</h3>
//                   <p>{req.blood_group}</p>
//                   <p>{req.hospital}, {req.upazila}, {req.district}</p>
//                   <p>{req.donation_date} at {req.donation_time}</p>
//                 </div>
//                 <button
//                   className="btn btn-sm btn-outline"
//                   onClick={() => navigate(`/donation-request/${req._id}`)}
//                 >
//                   View
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}

//         {requests.length === 0 && !loading && (
//           <p className="text-center text-gray-500">No requests found. Try a different search.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default SearchRequest;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";

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
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-orange-50 p-4 py-8">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-64 h-64 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header with Blood Drop Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-full mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2c-1.5 3.5-6 8-6 12a6 6 0 0012 0c0-4-4.5-8.5-6-12z"/>
            </svg>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-700 to-red-500 bg-clip-text text-transparent mb-2">
            Find Blood Donors
          </h1>
          <p className="text-gray-600">Search for available blood donation requests in your area</p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl mb-8 border border-red-100">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Blood Group
              </label>
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all outline-none"
              >
                <option value="">Select Blood Group</option>
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bg => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                District
              </label>
              <select
                value={district}
                onChange={(e) => {
                  setDistrict(e.target.value);
                  setUpazila("");
                }}
                className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all outline-none"
              >
                <option value="">Select District</option>
                {districts.map(d => (
                  <option key={d.id} value={d.name}>{d.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Upazila
              </label>
              <select
                value={upazila}
                onChange={(e) => setUpazila(e.target.value)}
                disabled={!district}
                className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
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
            disabled={loading}
            className="w-full mt-6 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                <Loading/>
                Searching...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search Requests
              </span>
            )}
          </button>
        </form>

        {/* Results */}
        {requests.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-2 h-6 bg-red-600 rounded-full"></span>
              Found {requests.length} Request{requests.length !== 1 ? 's' : ''}
            </h2>
            {requests.map(req => (
              <div 
                key={req._id} 
                className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-red-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="inline-flex items-center justify-center w-12 h-12 bg-red-100 text-red-700 font-bold rounded-lg text-lg">
                      {req.blood_group}
                    </span>
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">{req.recipientName}</h3>
                      <p className="text-sm text-gray-500">{req.hospital}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 mt-3">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {req.upazila}, {req.district}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {req.donation_date}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {req.donation_time}
                    </span>
                  </div>
                </div>
                <button
                  className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 whitespace-nowrap"
                  onClick={() => navigate(`/donation-request/${req._id}`)}
                >
                  View Details →
                </button>
              </div>
            ))}
          </div>
        )}

        {requests.length === 0 && !loading && (
          <div className="bg-white/80 backdrop-blur-sm p-12 rounded-2xl shadow-md text-center border border-red-100">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="text-gray-600 text-lg font-medium">No requests found</p>
            <p className="text-gray-500 text-sm mt-2">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchRequest;