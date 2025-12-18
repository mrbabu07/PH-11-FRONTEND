// import React, { useContext } from 'react';
// import useAxios from '../../hooks/useAxios';
// import { AuthContext } from '../../Context/AuthProvider';
// import { useNavigate } from 'react-router';

// function Funding() {
//   const axios = useAxios();
//   const { user } = useContext(AuthContext);
  

//   const handleCheckout = (e) => {
//     e.preventDefault();
    
//     const donorEmail = user?.email;
//     const donateAmount = e.target.donateAmount.value;
//     const donorName = user?.displayName;

//     const formData = {
//       donorEmail,
//       donateAmount,
//       donorName
//     };

    
//     axios
//       .post('http://localhost:5000/create-payment-checkout', formData)
//       .then(res => {
//         const { url } = res.data;
        
//         if (url) {
//           window.location.href = url;
//         }
//       })
//       .catch(err => {
//         console.error("Payment error:", err.response?.data || err.message);
//       });
//   };

//   return (
//     <div>
//       <form
//         onSubmit={handleCheckout}
//         className="flex justify-center items-center min-h-screen gap-4"
//       >
//         <input
//           name="donateAmount"
//           placeholder="type amount here"
//           type="number"
//           className="input input-bordered"
//           required
//           min="1"
//         />
//         <button className="btn btn-primary" type="submit">
//           Donate
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Funding;


import React, { useContext } from 'react';
import useAxios from '../../hooks/useAxios';
import { AuthContext } from '../../Context/AuthProvider';
import { useNavigate } from 'react-router';

function Funding() {
  const axios = useAxios();
  const { user } = useContext(AuthContext);
  
  const handleCheckout = (e) => {
    e.preventDefault();
    
    const donorEmail = user?.email;
    const donateAmount = e.target.donateAmount.value;
    const donorName = user?.displayName;

    const formData = {
      donorEmail,
      donateAmount,
      donorName
    };

    axios
      .post('http://localhost:5000/create-payment-checkout', formData)
      .then(res => {
        const { url } = res.data;
        
        if (url) {
          window.location.href = url;
        }
      })
      .catch(err => {
        console.error("Payment error:", err.response?.data || err.message);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-500 p-8 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
            <div className="relative z-10">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">💰</span>
              </div>
              <h1 className="text-3xl font-bold mb-2">Make a Donation</h1>
              <p className="text-white/90">Support our life-saving mission</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleCheckout} className="p-8 space-y-6">
            {/* Donor Info Display */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-l-4 border-green-500">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {user?.displayName?.charAt(0).toUpperCase() || "?"}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{user?.displayName || "Guest"}</p>
                  <p className="text-sm text-gray-600">{user?.email || "No email"}</p>
                </div>
              </div>
            </div>

            {/* Amount Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <span className="text-xl">💵</span>
                Donation Amount (BDT)
              </label>
              <input
                name="donateAmount"
                placeholder="Enter amount (e.g., 500)"
                type="number"
                className="input input-bordered w-full text-lg font-semibold focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
                min="1"
              />
              <p className="text-xs text-gray-500 mt-2">Minimum donation: ৳1</p>
            </div>

            {/* Quick Amount Buttons */}
            <div className="grid grid-cols-4 gap-2">
              {[100, 500, 1000, 5000].map(amount => (
                <button
                  key={amount}
                  type="button"
                  onClick={(e) => {
                    const input = e.target.closest('form').querySelector('input[name="donateAmount"]');
                    input.value = amount;
                  }}
                  className="px-3 py-2 bg-green-100 text-green-700 font-semibold rounded-lg hover:bg-green-200 transition-colors text-sm"
                >
                  ৳{amount}
                </button>
              ))}
            </div>

            {/* Submit Button */}
            <button 
              className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-bold text-lg rounded-xl hover:shadow-xl transform hover:scale-105 transition-all" 
              type="submit"
            >
              🎁 Proceed to Payment
            </button>

            {/* Security Note */}
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <span className="text-green-600">🔒</span>
              <span>Secure payment powered by Stripe</span>
            </div>
          </form>

          {/* Footer */}
          <div className="h-2 bg-gradient-to-r from-green-400 to-emerald-500"></div>
        </div>

        {/* Impact Message */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            💚 Your donation helps save lives and support communities
          </p>
        </div>
      </div>
    </div>
  );
}

export default Funding;