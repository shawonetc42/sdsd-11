"use client";

// import { useState, useEffect, useCallback } from "react";
// import Conversations from "./ConversationList";
// import Chat from "./Chat";

// const HomePage = () => {
//   const [selectedConversation, setSelectedConversation] = useState(null);
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch profile information
//   const fetchProfile = useCallback(async () => {
//     try {
//       const response = await fetch("http://localhost:5000/auth/profile", {
//         method: "GET",
//         credentials: "include",
//       });
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       const data = await response.json();
//       setUser(data.email); // Assuming 'email' is returned
//     } catch (error) {
//       setError(`Error fetching profile: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchProfile();
//   }, [fetchProfile]);

//   const handleSelectConversation = (conversation) => {
//     setSelectedConversation(conversation);
//   };

//   return (
//     <div className="flex mt-20">
//       <div className="w-1/3 border-r border-gray-300 p-4">
//         {loading ? (
//           <p className="text-center text-gray-500">Loading profile...</p>
//         ) : error ? (
//           <p className="text-center text-red-500">{error}</p>
//         ) : user ? (
//           <Conversations
//             user={user}
//             onSelectConversation={handleSelectConversation}
//           />
//         ) : (
//           <p className="text-center text-gray-500">No user data available</p>
//         )}
//       </div>
//       <div className="w-2/3 p-4">
//         {selectedConversation ? (
//           <Chat selectedUser={selectedConversation} currentUser={user} />
//         ) : (
//           <p>Select a conversation to start chatting.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HomePage;
import { useState } from "react";
import UserList from "./UserList";
import Chat from "./Chat";
import ConversationsList from "./List";

const HomePage = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [isChatView, setIsChatView] = useState(false);
  const [view, setView] = useState("users"); // To toggle between user list and conversations

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setIsChatView(true);
  };

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    setSelectedUser(null); // Clear selected user when a conversation is selected
    setIsChatView(true);
  };

  return (
    <div className="flex flex-col items-center mt-16">
      <div className="flex flex-col md:flex-row w-full max-w-6xl h-[900px] bg-gray-100 p-6 rounded-lg shadow-lg">
        {/* Sidebar for Users and Conversations */}
        <div className="hidden md:flex flex-col w-1/3 bg-white border-r border-gray-300">
          <button
            onClick={() => setView("users")}
            className={`w-full text-left p-4 ${
              view === "users" ? "bg-blue-100 text-blue-500 font-semibold" : ""
            }`}
          >
            Users
          </button>
          <button
            onClick={() => setView("conversations")}
            className={`w-full text-left p-4 ${
              view === "conversations"
                ? "bg-blue-100 text-blue-500 font-semibold"
                : ""
            }`}
          >
            Conversations
          </button>
          <div className="flex-1 overflow-y-auto">
            {view === "users" ? (
              <UserList onSelectUser={handleSelectUser} />
            ) : (
              <ConversationsList
                onSelectConversation={handleSelectConversation}
              />
            )}
          </div>
        </div>

        {/* Chat Section */}
        <div className="w-full md:w-2/3 p-4">
          {selectedUser || selectedConversation ? (
            <div className="bg-white border border-gray-300 rounded-lg shadow-md p-4 h-full">
              <Chat
                selectedUser={selectedUser}
                selectedConversation={selectedConversation}
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <p>No message or conversation selected.</p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden fixed inset-0 flex flex-col">
        {!isChatView ? (
          <div className="flex-1 bg-gray-100 p-6">
            <button
              onClick={() => setView("users")}
              className={`w-full text-left p-4 ${
                view === "users"
                  ? "bg-blue-100 text-blue-500 font-semibold"
                  : ""
              }`}
            >
              Users
            </button>
            <button
              onClick={() => setView("conversations")}
              className={`w-full text-left p-4 ${
                view === "conversations"
                  ? "bg-blue-100 text-blue-500 font-semibold"
                  : ""
              }`}
            >
              Conversations
            </button>
            <div className="flex-1 overflow-y-auto">
              {view === "users" ? (
                <UserList onSelectUser={handleSelectUser} />
              ) : (
                <ConversationsList
                  onSelectConversation={handleSelectConversation}
                />
              )}
            </div>
          </div>
        ) : (
          <div className="flex-1 bg-white p-4">
            <button
              className="text-blue-500 mb-4"
              onClick={() => setIsChatView(false)}
            >
              Back
            </button>
            <Chat
              selectedUser={selectedUser}
              selectedConversation={selectedConversation}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
