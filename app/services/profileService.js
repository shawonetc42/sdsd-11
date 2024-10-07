// app/services/profileService.js
import axios from "axios";

export async function fetchProfileData(cookiesHeader) {
  try {
    const response = await axios.get(
      "https://flashmain.vercel.app/auth/profile",
      {
        headers: {
          Cookie: cookiesHeader, // কুকিগুলি হেডারে পাঠানো হচ্ছে
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching profile data:", error.message);
    throw new Error("Failed to fetch profile data");
  }
}
