"use client";
import React from "react";

function GoogleLogin() {
  const handleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  const handleLogout = async () => {
    await fetch("http://localhost:5000/api/logout", {
      credentials: "include",
    });
    window.location.reload();
  };

  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    fetch("http://localhost:5000/api/current_user", {
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setUser(data))
      .catch((error) => console.error("Fetch error:", error));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {user ? (
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
          <h1 className="text-2xl font-bold mb-2">
            Welcome, {user.displayName}
          </h1>
          <h2 className="text-lg text-gray-700 mb-4">Email: {user.email}</h2>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Login with Google
        </button>
      )}
    </div>
  );
}

export default GoogleLogin;
