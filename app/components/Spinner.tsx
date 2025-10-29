import React from 'react';

const Spinner = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative w-16 h-16">
        {/* Outer ring */}
        <div className="absolute inset-0 border-4 border-white/20 rounded-full"></div>
        
        {/* Spinning gradient ring */}
        <div className="absolute inset-0 border-4 border-transparent border-t-[#00bc7d] border-r-[#00bc7d] rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Spinner;