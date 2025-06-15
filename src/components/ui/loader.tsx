import React from 'react';

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="relative">
        {/* Main circle */}
        <div className="w-16 h-16 rounded-full border-4 border-t-emerald-500 border-r-emerald-500 border-b-transparent border-l-transparent animate-spin"></div>
        
        {/* Inner circle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-8 h-8 rounded-full border-4 border-t-transparent border-r-transparent border-b-green-500 border-l-green-500 animate-spin-reverse"></div>
        </div>
        
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-emerald-500 opacity-20 animate-pulse blur-xl"></div>
      </div>
      
      {/* Loading text */}
      <div className="absolute mt-24">
        <p className="text-lg font-semibold text-white animate-pulse">
          Loading<span className="animate-ellipsis">...</span>
        </p>
      </div>
    </div>
  );
};

export default Loader;
