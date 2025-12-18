import React from 'react';

function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-orange-50 flex items-center justify-center p-4">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-64 h-64 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Animated Blood Drop */}
        <div className="relative">
          {/* Pulsing Circle Background */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 bg-red-500 rounded-full animate-ping opacity-20"></div>
          </div>
          
          {/* Main Blood Drop Icon */}
          <div className="relative w-20 h-20 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center shadow-2xl animate-bounce">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2c-1.5 3.5-6 8-6 12a6 6 0 0012 0c0-4-4.5-8.5-6-12z"/>
            </svg>
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-center">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-red-700 to-red-500 bg-clip-text text-transparent mb-2">
            Loading...
          </h2>
          <p className="text-gray-600">Please wait while we fetch the data</p>
        </div>

        {/* Animated Dots */}
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
}

export default Loading;