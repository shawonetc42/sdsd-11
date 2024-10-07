"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    // URL থেকে access_token গ্রহণ
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("access_token");

    if (token) {
      // API কল করে প্রোফাইল তথ্য আনুন
      fetch("https://google-login-phi.vercel.app/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to fetch profile data");
          }
        })
        .then((data) => {
          setProfileData(data);
        })
        .catch((error) => {
          console.error("Error fetching profile data:", error);
          setError("Unable to load profile data");
        });
    } else {
      setError("Access token missing");
    }
  }, [router]);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!profileData) {
    return <div className="mt-20">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Profile Page</h1>
      <div className="bg-white p-4 rounded shadow-md">
        <p>
          <strong>Name:</strong> {profileData.name}
        </p>
        <p>
          <strong>Email:</strong> {profileData.email}
        </p>
        <p>
          <strong>Address:</strong> {profileData.address}
        </p>
      </div>
    </div>
  );
};

export default ProfilePage;
