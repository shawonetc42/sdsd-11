"use client"; // Next.js 13+ specific

import { useState } from "react";

export default function SendNotificationPage() {
  const [userEmail, setUserEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "http://localhost:5000/notifications/send_notification",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_email: userEmail, message }),
          credentials: "include", // Include cookies in request
        }
      );

      if (res.ok) {
        setSuccess("Notification sent successfully!");
        setUserEmail("");
        setMessage("");
      } else {
        const errorData = await res.json();
        setError(errorData.error);
      }
    } catch (err) {
      setError("Failed to send notification");
    }
  };

  return (
    <div className="mt-20 p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Send Notification</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <div>
          <label
            htmlFor="user_email"
            className="block text-sm font-medium text-gray-700"
          >
            User Email
          </label>
          <input
            id="user_email"
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700"
          >
            Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            rows="4"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Send Notification
        </button>
      </form>
    </div>
  );
}
