"use client";

import { useState, useEffect, useCallback } from "react";
import useUserProfile from "@/components/hooks/useUserProfile"; // Import useUserProfile hook

const ConversationsList = ({ onSelectConversation }) => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useUserProfile(); // Fetch user profile from useUserProfile hook

  // Fetch conversations
  const fetchConversations = useCallback(async () => {
    if (user?.email) {
      try {
        const response = await fetch(
          `https://flashmain.vercel.app/chat/conversations?user=${user.email}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setConversations(data);
      } catch (error) {
        setError(`Error fetching conversations: ${error.message}`);
      } finally {
        setLoading(false);
      }
    }
  }, [user?.email]);

  useEffect(() => {
    if (user?.email) {
      fetchConversations();
    }
  }, [user?.email, fetchConversations]);

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg border border-gray-200">
      {loading ? (
        <div className="flex items-center justify-center h-32">
          <svg
            className="w-8 h-8 text-gray-500 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 0116 0H4z"
            ></path>
          </svg>
        </div>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : conversations.length > 0 ? (
        <ul className="space-y-2">
          {conversations.map((conversation) => (
            <li
              key={conversation._id} // Use unique identifier for key
              onClick={() => onSelectConversation(conversation)}
              className="flex items-center p-3 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 cursor-pointer transition ease-in-out duration-200"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-gray-700">
                {conversation.sender === user.email
                  ? conversation.receiver[0].toUpperCase()
                  : conversation.sender[0].toUpperCase()}
              </div>
              <div className="ml-3 flex-1">
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-800">
                    {conversation.sender === user.email
                      ? conversation.receiver
                      : conversation.sender}
                  </span>
                  <span className="text-xs text-gray-500 mt-0.5">
                    {conversation.timestamp
                      ? new Date(conversation.timestamp).toLocaleTimeString()
                      : "No timestamp"}
                  </span>
                </div>
                <p className="mt-1 text-gray-600 text-sm truncate">
                  {typeof conversation.message === "string"
                    ? conversation.message
                    : "No message available"}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No conversations available.</p>
      )}
    </div>
  );
};

export default ConversationsList;
