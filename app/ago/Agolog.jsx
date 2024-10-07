"use client";
// app/profile/page.js
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await fetch("/api/profile");
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        } else {
          throw new Error("Failed to fetch profile");
        }
      } catch (err) {
        setError(err.message);
      }
    }

    fetchProfile();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!profile) return <div>Loading...</div>;

  return (
    <div className="container mx-auto mt-20 p-8 max-w-lg bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Profile
      </h1>
      <div className="space-y-4">
        <p className="text-lg text-gray-600">
          <strong className="font-semibold text-gray-800">Name:</strong>{" "}
          {profile.name}
        </p>
        <p className="text-lg text-gray-600">
          <strong className="font-semibold text-gray-800">Email:</strong>{" "}
          {profile.email}
        </p>
        <p className="text-lg text-gray-600">
          <strong className="font-semibold text-gray-800">Username:</strong>{" "}
          {profile.username}
        </p>
        {/* Add more profile details as needed */}
      </div>
    </div>
  );
}
