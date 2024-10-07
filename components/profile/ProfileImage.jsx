"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

const ProfileImage = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const cachedProfile = localStorage.getItem("profile");
        const cachedTimestamp = localStorage.getItem("profileTimestamp");
        const currentTimestamp = Date.now();

        // চেক করো যদি ক্যাশে থাকা টাইমস্ট্যাম্প পুরোনো হয়
        if (
          cachedProfile &&
          cachedTimestamp &&
          currentTimestamp - cachedTimestamp < 60000
        ) {
          // 60 সেকেন্ডের ক্যাশিং
          setProfile(JSON.parse(cachedProfile));
        } else {
          const response = await axios.get("/api/profile");
          const data = response.data;
          setProfile(data);
          localStorage.setItem("profile", JSON.stringify(data));
          localStorage.setItem("profileTimestamp", currentTimestamp.toString());
        }
      } catch (error) {
        setError("প্রোফাইল ডেটা ফেচ করতে ব্যর্থ");
      }
    };

    fetchProfile();
  }, []);

  console.log(profile);

  if (error) return <div>{error}</div>;
  if (!profile)
    return (
      <div>
        <div className="w-7 h-7 bg-gray-300 rounded-full"></div>
      </div>
    );

  return (
    <div className="">
      <Image
        src={profile.profile_picture}
        width={40}
        height={40}
        alt="ProfileImage"
        className="w-8 h-8 rounded-full object-cover"
      />
    </div>
  );
};

export default ProfileImage;
