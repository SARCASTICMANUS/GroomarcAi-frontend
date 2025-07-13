import React, { useState } from "react";
import type { Avatar } from "../types";

interface AvatarCardProps {
  avatar: Avatar;
  onSelect: (avatar: Avatar) => void;
}

const AvatarCard: React.FC<AvatarCardProps> = ({ avatar, onSelect }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 p-6">
      <div className="flex justify-end">
        <button 
          id="dropdownButton" 
          className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" 
          type="button"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <span className="sr-only">Open dropdown</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
          </svg>
        </button>
        {/* Dropdown menu */}
        {showDropdown && (
          <div className="absolute z-10 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 mt-2">
            <ul className="py-2" aria-labelledby="dropdownButton">
              <li>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">View Profile</a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">View Categories</a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Report</a>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="flex flex-col items-center pb-6">
        <img 
          className="w-24 h-24 mb-3 rounded-full shadow-lg" 
          src={avatar.image} 
          alt={`${avatar.name} image`}
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{avatar.name}</h5>
        <span className="text-sm text-gray-500 dark:text-gray-400 mb-4">{avatar.role}</span>
        
        {/* Rating Display */}
        <div className="flex items-center mb-4">
          {Array.from({ length: 5 }).map((_, idx) => (
            <span 
              key={idx} 
              className={`text-lg ${idx < avatar.rating ? 'text-yellow-400' : 'text-gray-300'}`}
            >
              ★
            </span>
          ))}
          <span className="ml-2 text-sm text-gray-500">({avatar.rating}/5)</span>
        </div>
        
        <button 
          onClick={() => onSelect(avatar)}
          className="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-colors duration-200"
        >
          Start Chat
        </button>
      </div>
    </div>
  );
};

export default AvatarCard; 