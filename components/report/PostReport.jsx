import React from "react";

export default function PostReport() {
  return (
    <div className="flex flex-col text-sm bg-white p-3 rounded-md shadow-lg w-48">
      <p className="text-red-600 font-semibold hover:bg-red-100 transition-colors duration-300 ease-in-out p-2 rounded-md cursor-pointer">
        Report this post
      </p>
      <p className="hover:bg-gray-100 transition-colors duration-300 ease-in-out p-2 rounded-md cursor-pointer">
        Block this user
      </p>
      <p className="hover:bg-gray-100 transition-colors duration-300 ease-in-out p-2 rounded-md cursor-pointer">
        Report for spam
      </p>
      <p className="hover:bg-gray-100 transition-colors duration-300 ease-in-out p-2 rounded-md cursor-pointer">
        Report for harassment
      </p>
      <p className="hover:bg-gray-100 transition-colors duration-300 ease-in-out p-2 rounded-md cursor-pointer">
        Report for inappropriate content
      </p>
    </div>
  );
}
