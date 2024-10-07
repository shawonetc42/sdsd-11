// app/profile/page.js
import { cookies } from "next/headers";
import { fetchProfileData } from "@/app/services/profileService";
import Image from "next/image";

export default async function HeadProfile() {
  const cookiesHeader = cookies()
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");

  let profileData = null;
  let error = null;

  try {
    profileData = await fetchProfileData(cookiesHeader);
  } catch (err) {
    error = "";
    console.error(err);
  }

  //   profile edit button and functionality

  return (
    <div className="">
      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : profileData ? (
        <div className="">
          {profileData.profile_picture && (
            <Image
              width={40}
              height={40}
              src={profileData.profile_picture}
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
          )}
        </div>
      ) : (
        <p className="text-gray-500 text-center"></p>
      )}
    </div>
  );
}
