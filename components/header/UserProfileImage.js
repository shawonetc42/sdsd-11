"use client";
import React from "react";
import Image from "next/image";

const UserProfileImage = ({ session }) => {
  if (!session) {
    return null; // Render nothing if there's no session
  }

  return (
    <Image
      loading="lazy"
      src={session.user?.image || "/path/to/default-profile.png"} // Fallback image if session.user?.image is undefined
      alt="User Profile"
      width={30}
      height={30}
      className="shrink-0 rounded-full w-[30px]"
    />
  );
};

export default UserProfileImage;
