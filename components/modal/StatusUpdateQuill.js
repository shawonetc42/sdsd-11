"use client";
import React, { useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useUserProfile from "../hooks/useUserProfile"; // Import useUserProfile hook

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
};

const StatusUpdateQuill = ({ isOpen, onClose }) => {
  const [post, setPost] = useState("");
  const [notification, setNotification] = useState(null);
  const [activeTab, setActiveTab] = useState("create"); // State for active tab
  const { user } = useUserProfile(); // Get user profile from the hook

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setNotification({
        type: "error",
        message: "User data not available.",
      });
      return;
    }

    try {
      const postId = generateUnique16DigitUUID();
      await axios.post("https://jsds123.vercel.app/question", {
        id: postId,
        questiontext: post,
        userid: user.uid, // Assuming `uid` is available in `user`
        username: user.name, // Assuming `name` is available in `user`
        image: user.profile_picture, // Assuming `profile_picture` is available in `user`
        uniqueId: postId,
        time: Date.now(),
      });

      setNotification({
        type: "success",
        message: "Post created successfully!",
      });
      setPost("");
      setTimeout(() => {
        setNotification(null);
        onClose(); // Close the modal
      }, 3000);
    } catch (error) {
      setNotification({
        type: "error",
        message: "Error creating post. Please try again later.",
      });
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }
  };

  const generate16DigitUUID = () => {
    return Math.floor(
      1000000000000000 + Math.random() * 9000000000000000
    ).toString();
  };

  const generateUnique16DigitUUID = () => {
    let numericUUID;
    numericUUID = generate16DigitUUID();
    return numericUUID;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-prose w-full">
        <h2 className="font-semibold mb-6 text-gray-800">
          লিখো যা তুমি লিখতে চাও...
        </h2>
        <div className="mb-4">
          <button
            className={`mr-4 px-4 py-2 ${
              activeTab === "create"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            } rounded-lg`}
            onClick={() => setActiveTab("create")}
          >
            Create Post
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === "drafts"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            } rounded-lg`}
            onClick={() => setActiveTab("drafts")}
          >
            View Drafts
          </button>
        </div>
        {activeTab === "create" && (
          <form onSubmit={handleSubmit}>
            <ReactQuill
              value={post}
              onChange={setPost}
              className="w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-96 overflow"
              placeholder="Type your question here..."
              theme="snow"
              modules={modules}
            />
            <div className="flex justify-end mt-16">
              <button
                type="button"
                className="bg-red-600 text-white px-4 py-2 rounded-lg mr-2 hover:bg-red-700 transition-colors duration-300"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                Submit
              </button>
            </div>
            {notification && (
              <div
                className={`p-3 rounded-md mt-4 ${
                  notification.type === "success"
                    ? "bg-green-500"
                    : "bg-red-500"
                } text-white`}
              >
                {notification.message}
              </div>
            )}
          </form>
        )}
        {activeTab === "drafts" && (
          <div className="min-h-[490px]">
            <p>No drafts available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusUpdateQuill;
