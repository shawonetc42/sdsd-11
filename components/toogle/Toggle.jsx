// components/Toggle.js
import React, { useState } from "react";

const Toggle = ({ children, buttonLabel, className }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleToggle = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className={`relative ${className}`}>
      <button onClick={handleToggle} className="flex items-center">
        {buttonLabel}
      </button>
      {isVisible && (
        <div className="absolute top-full right-0 mt-2 p-3 bg-gray-100 rounded-md shadow-lg">
          {children}
        </div>
      )}
    </div>
  );
};

export default Toggle;
