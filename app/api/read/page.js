// app/profile/page.js
import Image from "next/image";
import { cookies } from "next/headers";
import { fetchProfileData } from "@/app/services/profileService";
import LogoutButton from "@/components/Button/LogoutButton";

export default async function Page() {
  const cookiesHeader = cookies()
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");

  let profileData = null;
  let error = null;

  try {
    profileData = await fetchProfileData(cookiesHeader);
  } catch (err) {
    error = "Error fetching profile data";
    console.error(err);
  }

  //   profile edit button and functionality

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : profileData ? (
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">{profileData.name}</h2>
          <p className="text-gray-700">Email: {profileData.email}</p>
          <p className="text-gray-700">Email: {profileData.created_at}</p>
          {profileData.profile_picture && (
            <Image
              src={profileData.profile_picture}
              alt="Profile"
              width={100}
              height={100}
              className="w-24 h-24 rounded-full"
            />
          )}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No profile data available</p>
      )}

      <LogoutButton />
    </div>
  );
}
