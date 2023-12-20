import React from "react";

const CardSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="animate-pulse">
        <div className="mt-2 h-4 bg-gray-300 rounded w-full"></div>
        <div className="mt-2 h-4 bg-gray-300 rounded w-full"></div>
        <div className="mt-2 h-4 bg-gray-300 rounded w-1/2"></div>
        
        </div>
        <div className="animate-pulse">
        <div className="mt-2 h-4 bg-gray-300 rounded w-full"></div>
        <div className="mt-2 h-4 bg-gray-300 rounded w-full"></div>
        <div className="mt-2 h-4 bg-gray-300 rounded w-1/2"></div>
        
        </div>
        <div className="animate-pulse">
        <div className="mt-2 h-4 bg-gray-300 rounded w-full"></div>
        <div className="mt-2 h-4 bg-gray-300 rounded w-full"></div>
        <div className="mt-2 h-4 bg-gray-300 rounded w-1/2"></div>
        
        </div>
        <div className="animate-pulse">
        <div className="mt-2 h-4 bg-gray-300 rounded w-full"></div>
        <div className="mt-2 h-4 bg-gray-300 rounded w-full"></div>
        <div className="mt-2 h-4 bg-gray-300 rounded w-1/2"></div>
        
        </div>
        <div className="animate-pulse">
        <div className="mt-2 h-4 bg-gray-300 rounded w-full"></div>
        <div className="mt-2 h-4 bg-gray-300 rounded w-full"></div>
        <div className="mt-2 h-4 bg-gray-300 rounded w-1/2"></div>
        
        </div>
        <div className="animate-pulse">
        <div className="mt-2 h-4 bg-gray-300 rounded w-full"></div>
        <div className="mt-2 h-4 bg-gray-300 rounded w-full"></div>
        <div className="mt-2 h-4 bg-gray-300 rounded w-1/2"></div>
        
        </div>

      </div>
     
    </div>
  );
};

export default CardSkeleton;
