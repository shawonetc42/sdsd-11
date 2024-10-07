import React from "react";
import Agolog from "./Agolog";

export default function page() {
  return (
    <div>
      <Agolog />
    </div>
  );
}

// "use client";
// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function ProfilePage() {
//   const [user, setUser] = useState(null);
//   const [name, setName] = useState("");
//   const [username, setUsername] = useState("");
//   const [file, setFile] = useState(null);
//   const [updateSuccess, setUpdateSuccess] = useState(null);
//   const [updateError, setUpdateError] = useState(null);
//   const [activeTab, setActiveTab] = useState("info");
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function fetchUserProfile() {
//       try {
//         const response = await axios.get("/api/profile", {
//           withCredentials: true,
//         });
//         setUser(response.data);
//         setName(response.data.name);
//         setUsername(response.data.username);
//       } catch (err) {
//         setError("Failed to load profile. Please try again.");
//       }
//     }

//     fetchUserProfile();
//   }, []);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleFileUpload = async (e) => {
//     e.preventDefault();
//     if (!file) {
//       setUpdateError("No file selected");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/auth/upload_profile_picture",
//         formData,
//         {
//           withCredentials: true,
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       setUser((prevUser) => ({
//         ...prevUser,
//         profile_picture: response.data.image_url,
//       }));
//       setUpdateSuccess("Profile picture updated successfully");
//       setUpdateError(null);
//     } catch (err) {
//       setUpdateError(
//         err.response ? err.response.data.error : "An error occurred"
//       );
//       setUpdateSuccess(null);
//     }
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/auth/update_profile",
//         {
//           name,
//           username,
//         },
//         {
//           withCredentials: true,
//         }
//       );
//       setUser((prevUser) => ({
//         ...prevUser,
//         name: response.data.name,
//         username: response.data.username,
//       }));
//       setUpdateSuccess("Profile updated successfully");
//       setUpdateError(null);
//     } catch (err) {
//       setUpdateError(
//         err.response ? err.response.data.error : "An error occurred"
//       );
//       setUpdateSuccess(null);
//     }
//   };

//   if (error) {
//     return <div className="p-4 text-red-600">{error}</div>;
//   }

//   if (!user) {
//     return <div className="p-4">Loading...</div>;
//   }

//   return (
//     <div className="p-4 max-w-md mx-auto mt-20">
//       <h1 className="text-2xl font-bold mb-4">Profile</h1>
//       <div className="bg-white shadow-md rounded-lg p-6">
//         <div className="flex mb-4">
//           <button
//             className={`px-4 py-2 rounded-t-lg ${
//               activeTab === "info" ? "bg-blue-500 text-white" : "bg-gray-200"
//             }`}
//             onClick={() => setActiveTab("info")}
//           >
//             Profile Information
//           </button>
//           <button
//             className={`px-4 py-2 rounded-t-lg ${
//               activeTab === "update" ? "bg-blue-500 text-white" : "bg-gray-200"
//             }`}
//             onClick={() => setActiveTab("update")}
//           >
//             Update Profile
//           </button>
//         </div>

//         {activeTab === "info" && (
//           <div>
//             <p className="text-sm font-medium">Name: {user.name}</p>
//             <p className="text-sm font-medium">Username: {user.username}</p>
//             <p className="text-sm font-medium">Email: {user.email}</p>
//             <p className="text-sm font-medium">Created At: {user.created_at}</p>
//             {user.profile_picture && (
//               <img
//                 src={user.profile_picture}
//                 alt="Profile"
//                 className="w-24 h-24 rounded-full mt-4"
//               />
//             )}
//           </div>
//         )}

//         {activeTab === "update" && (
//           <div>
//             <form onSubmit={handleUpdate}>
//               <div className="mb-4">
//                 <label
//                   htmlFor="name"
//                   className="block text-sm font-medium mb-1"
//                 >
//                   Name:
//                 </label>
//                 <input
//                   type="text"
//                   id="name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   className="border rounded-lg p-2 w-full"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label
//                   htmlFor="username"
//                   className="block text-sm font-medium mb-1"
//                 >
//                   Username:
//                 </label>
//                 <input
//                   type="text"
//                   id="username"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   className="border rounded-lg p-2 w-full"
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="px-4 py-2 bg-blue-500 text-white rounded-lg"
//               >
//                 Update Profile
//               </button>
//               {updateSuccess && (
//                 <p className="text-green-600 mt-2">{updateSuccess}</p>
//               )}
//               {updateError && (
//                 <p className="text-red-600 mt-2">{updateError}</p>
//               )}
//             </form>

//             <form onSubmit={handleFileUpload} className="mt-6">
//               <input type="file" onChange={handleFileChange} className="mb-4" />
//               <button
//                 type="submit"
//                 className="px-4 py-2 bg-blue-500 text-white rounded-lg"
//               >
//                 Upload Profile Picture
//               </button>
//               {updateSuccess && (
//                 <p className="text-green-600 mt-2">{updateSuccess}</p>
//               )}
//               {updateError && (
//                 <p className="text-red-600 mt-2">{updateError}</p>
//               )}
//             </form>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
