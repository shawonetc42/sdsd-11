"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/api/profile");
        setProfile(response.data);
      } catch (error) {
        setError("Failed to fetch profile data");
      }
    };

    fetchProfile();
  }, []);
  console.log(profile);

  if (error) return <div>{error}</div>;
  if (!profile) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold">Profile Information</h2>
        <div className="mt-4">
          <Image
            src={profile.profile_picture}
            alt="profile picture"
            width={100}
            height={100}
          />
          <p>
            <strong>Profile ID:</strong> {profile.id}
          </p>
          <p>
            <strong>Name:</strong> {profile.name}
          </p>
          <p>
            <strong>Email:</strong> {profile.email}
          </p>
          <p>
            <strong>Username:</strong> {profile.username}
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(profile.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
