"use client";

import { useState, useEffect } from "react";
import useUserProfile from "@/components/hooks/useUserProfile";

const Chat = ({ selectedUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { user: currentUser } = useUserProfile(); // Using the user from useUserProfile

  // Fetch messages for the selected user
  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedUser && currentUser) {
        try {
          const response = await fetch(
            `https://flashmain.vercel.app/chat/messages?sender=${currentUser.email}&receiver=${selectedUser.email}`,
            {
              method: "GET",
              credentials: "include",
            }
          );
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          setMessages(data);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      }
    };

    fetchMessages();
  }, [selectedUser, currentUser]);

  // Handle sending a new message
  const handleSendMessage = async () => {
    if (selectedUser && newMessage && currentUser) {
      try {
        const response = await fetch("https://flashmain.vercel.app/chat/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sender: currentUser.email,
            receiver: selectedUser.email,
            message: newMessage,
          }),
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        setNewMessage("");
        // Refresh messages after sending
        const fetchResponse = await fetch(
          `https://flashmain.vercel.app/chat/messages?sender=${currentUser.email}&receiver=${selectedUser.email}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (!fetchResponse.ok) {
          throw new Error(`HTTP error! Status: ${fetchResponse.status}`);
        }
        const data = await fetchResponse.json();
        setMessages(data);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <div className="flex flex-col h-screen max-h-[740px] max-w-md mx-auto bg-gray-50 shadow-lg rounded-lg overflow-hidden">
      <header className="bg-[#45B09E] text-white p-4">
        <h2 className="text-lg font-semibold">
          Chat with {selectedUser?.email}
        </h2>
      </header>
      <main className="flex-1 p-4 overflow-y-auto min-h-[300px]">
        <div className="space-y-4">
          {messages.length > 0 ? (
            messages.map((msg) => (
              <div
                key={msg._id}
                className={`flex ${
                  msg.sender === currentUser.email
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg ${
                    msg.sender === currentUser.email
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-black"
                  }`}
                >
                  <strong className="block mb-1">{msg.sender}:</strong>
                  <p>{msg.message}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No messages yet.</p>
          )}
        </div>
      </main>
      <footer className="bg-gray-100 p-4">
        <div className="flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 p-2 rounded-l-lg border border-gray-300"
            placeholder="Type your message..."
          />
          <button
            onClick={handleSendMessage}
            className="p-2 bg-[#45B09E] text-white rounded-r-lg hover:bg-[#38a194]"
          >
            Send
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Chat;
