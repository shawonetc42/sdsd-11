"use client";
import React from "react";
import useUserProfile from "@/components/hooks/useUserProfile";
import Image from "next/image";
import Link from "next/link";

export default function ProfilePage() {
  const { user } = useUserProfile();

  console.log(user);

  if (!user)
    return (
      <div>
        <Link href="/login">
          <button>Login</button>
        </Link>
      </div>
    );

  return (
    <div className="">
      {/* <h1>Welcome, {user.name}</h1>
      <p>Email: {user.email}</p>
      <p>Username: {user.username}</p> */}
      <Image
        src={user.profile_picture}
        alt="profile"
        width={100}
        height={100}
        className="w-10 h-10 rounded-full"
      />
    </div>
  );
}
