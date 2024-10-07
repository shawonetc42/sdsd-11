"use client";
import Image from "next/image";
import useUserProfile from "@/components/hooks/useUserProfile";
import Link from "next/link";

function ProfileWithId() {
  const { user } = useUserProfile();

  console.log(user);

  if (!user)
    return (
      <div className="flex w-full container max-w-6xl mx-auto">Loading...</div>
    );

  return (
    <div className="">
      {/* <h1>Welcome, {user.name}</h1>
      <p>Email: {user.email}</p>
      <Link href="/profile/[id]/edit" as={`/profile/${user._id}`}>
        <p>userId: {user._id}</p>
      </Link>
      <Image
        src={user.profile_picture}
        alt="profile"
        width={100}
        height={100}
        className="w-12 h-12 rounded-full"
      /> */}
      {/* <ProfileWithId /> */}
      <div className="flex flex-col items-center container max-w-6xl mx-auto mt-16 bg-white border border-gray-300 border-solid">
        <div className="relative w-full h-56 bg-gray-200">
          <Image
            loading="lazy"
            src={user.profile_picture}
            className="absolute inset-0 object-cover w-full h-full"
            alt="Cover"
            width={600}
            height={600}
          />
        </div>
        <div className="relative flex flex-col items-center w-full px-5 mt-6 -top-14 md:flex-row md:justify-between">
          <div className="flex flex-col items-center md:flex-row">
            <Image
              loading="lazy"
              src={user.profile_picture}
              className="w-32 h-32 border-4  border-white rounded-full"
              alt="Profile"
              width={600}
              height={600}
            />
            <div className="flex flex-col items-center mt-5 md:mt-0 md:ml-5 md:items-start">
              <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
              <p className="mt-2 text-center text-gray-600 md:text-left">
                &quot;তুমি সুন্দর তাই চেয়ে থাকি প্রিয়, সে কি মোর অপরাধ?&quot;
              </p>
            </div>
          </div>
          <button className="px-6 py-2 mt-2 text-lg font-medium text-white bg-[#45B09E] rounded-full md:mt-0">
            চ্যাটিং
          </button>
        </div>
      </div>
      {/* add a notes section */}
    </div>
  );
}

export default ProfileWithId;
