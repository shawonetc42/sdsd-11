"use client";

import { useState, useEffect } from "react";

const UserList = ({ onSelectUser }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://flashmain.vercel.app/chat/users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold p-4 border-b border-gray-300">
        Select a User
      </h2>
      <ul className="divide-y divide-gray-200 max-h-[700px] overflow-y-auto">
        {users.map((user) => (
          <li
            key={user._id}
            onClick={() => onSelectUser(user)}
            className="flex items-center p-4 cursor-pointer hover:bg-gray-100 transition-colors group"
          >
            <div className="flex-shrink-0 h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold group-hover:bg-[#45B09E] group-hover:text-white transition-colors">
              {user.email[0].toUpperCase()}
            </div>
            <div className="ml-4 text-lg font-medium text-gray-800">
              {user.name}
              <span className="block text-gray-600">{user.email}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
