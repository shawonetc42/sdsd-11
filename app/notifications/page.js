// notifications/page.js
"use client"; // Next.js 13+ specific

import { useState, useEffect } from "react";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch notifications on component mount
    const fetchNotifications = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/notifications/get_notifications",
          {
            method: "GET",
            credentials: "include", // Include cookies in request
          }
        );

        if (res.ok) {
          const data = await res.json();
          setNotifications(data);
        } else {
          const errorData = await res.json();
          setError(errorData.error);
        }
      } catch (err) {
        setError("Failed to fetch notifications");
      }
    };

    fetchNotifications();
  }, []);

  const markAsRead = async (id) => {
    try {
      const res = await fetch(
        "http://localhost:5000/notifications/mark_as_read",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ notification_id: id }),
          credentials: "include", // Include cookies in request
        }
      );

      if (res.ok) {
        setNotifications((prev) =>
          prev.map((notif) =>
            notif._id === id ? { ...notif, read: true } : notif
          )
        );
      } else {
        const errorData = await res.json();
        setError(errorData.error);
      }
    } catch (err) {
      setError("Failed to mark notification as read");
    }
  };

  return (
    <div className="mt-20">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      <ul className="space-y-4">
        {notifications.map((notif) => (
          <li
            key={notif._id}
            className={`p-4 border rounded-lg ${
              notif.read ? "bg-gray-200" : "bg-white"
            }`}
          >
            <p>{notif.message}</p>
            <p className="text-sm text-gray-500">
              {new Date(notif.created_at).toLocaleString()}
            </p>
            {!notif.read && (
              <button
                onClick={() => markAsRead(notif._id)}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
              >
                Mark as Read
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
