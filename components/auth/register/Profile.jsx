"use client";

import React from "react";

const LoginPage = () => {
  const handleGoogleLogin = () => {
    window.location.href = "https://google-login-phi.vercel.app//google/login"; // গুগল লগইন রাউট
  };

  return (
    <div className="mt-20">
      <h2>Login</h2>
      <button
        onClick={handleGoogleLogin}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Login with Google
      </button>
    </div>
  );
};

export default LoginPage;
