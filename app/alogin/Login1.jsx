"use client";
import { useState } from "react";
import Login from "../login/page";

const HomePage = () => {
  const [isLoginVisible, setIsLoginVisible] = useState(false);

  const handleLoginClick = () => {
    setIsLoginVisible(true);
  };

  return (
    <div className="relative flex min-h-screen bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300 overflow-hidden">
      <div
        className={`absolute right-0 sm:right-[700px] md:right-[700px]  py-10 top-20 flex flex-col items-center justify-center bg-white p-2 rounded-3xl shadow-2xl max-w-lg w-full text-center transition-transform duration-700 ease-in-out ${
          isLoginVisible
            ? "-translate-x-full opacity-0"
            : "translate-x-0 opacity-100"
        }`}
      >
        {/* <img
          src="/loginanime.svg"
          alt="Welcome"
          className="w-3/4 h-2/2 mb-6 object-cover rounded-lg animate-zoom-in"
        /> */}
        <h1 className="text-5xl font-extrabold text-indigo-700 mb-4 animate-fade-in-down">
          স্বাগতম! 🎉
        </h1>
        <p className="text-gray-700 mb-4 text-lg animate-fade-in-up animate-delay-200">
          আপনার নতুন চ্যাট অ্যাপে স্বাগতম! বন্ধুদের সাথে সংযুক্ত হোন, কথোপকথনে
          যোগ দিন এবং মজা করুন।
        </p>
        <p className="text-gray-500 mb-8 text-md animate-fade-in-up animate-delay-400">
          একটি আকর্ষণীয় অভিজ্ঞতা পেতে এবং সমস্ত সুবিধা উপভোগ করতে লগইন করুন।
        </p>
        <button
          onClick={handleLoginClick}
          className="inline-block px-10 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-full shadow-lg hover:bg-indigo-700 hover:shadow-2xl transform hover:scale-105 transition-transform duration-300 ease-in-out  animate-delay-600"
        >
          লগইন করুন এখনই 🔑
        </button>
      </div>
      {/* Login Form */}
      {isLoginVisible && (
        <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-700 ease-in-out">
          <div className="bg-white p-12 rounded-3xl shadow-2xl max-w-lg w-full">
            <Login />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
