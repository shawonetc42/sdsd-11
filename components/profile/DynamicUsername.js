"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const token = localStorage.getItem("auth_token");

        if (!token) {
          console.error("No token found");
          return;
        }

        const response = await fetch("http://localhost:5000/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setProfile(data);
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!profile) return <p>No profile data found</p>;

  return (
    <div>
      <h1>{profile.name}</h1>
      <p>Email: {profile.email}</p>
      <Image
        src={profile.profile_picture}
        width={200}
        height={200}
        alt={`${profile.name}'s profile`}
      />
      <p>
        Account Created: {new Date(profile.created_at).toLocaleDateString()}
      </p>
    </div>
  );
}
