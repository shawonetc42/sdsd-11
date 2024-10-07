"use client";
import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import ShowComments from "./showComments";
import UpvoteIcon from "../svg/vote/UpvoteIcon";
import DownvoteIcon from "../svg/vote/DownvoteIcon";
import Writecomment from "./Writecomment";

export default function CommentActions({ item }) {
  const [userData, setUserData] = useState(null);
  const [upvoteCount, setUpvoteCount] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [hasUpvoted, setHasUpvoted] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:5000/auth/profile", {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const result = await response.json();
          setUserData(result);
        } else {
          console.error("Failed to fetch user data:", await response.json());
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchUpvoteCount = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/upvote/${item._id}/upvoteCount`
        );
        if (response.ok) {
          const result = await response.json();
          setUpvoteCount(result.upvoteCount);
        } else {
          console.error("Failed to fetch upvote count:", await response.json());
        }
      } catch (error) {
        console.error("Error fetching upvote count:", error);
      }
    };

    fetchUpvoteCount();
  }, [item._id]);

  const handleUpvote = async () => {
    if (hasUpvoted) {
      alert("You have already upvoted this item.");
      return;
    }

    if (!userData) {
      alert("User data is not available.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/upvote/${item._id}/upvote`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userData.email,
            userName: userData.email,
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        setUpvoteCount(result.newUpvoteCount);
        setHasUpvoted(true);
      } else {
        console.error("Failed to upvote:", await response.json());
      }
    } catch (error) {
      console.error("Error during upvote:", error);
    }
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <div>
      <div className="flex justify-between items-center gap-2 mt-3.5 max-md:flex-wrap max-md:max-w-full">
        <div className="flex gap-2 items-center px-px">
          <div className="flex items-center gap-2 px-2 py-2 bg-gray-100 rounded-full">
            <button
              className={`flex text-blue-500 items-center gap-1 ${
                hasUpvoted ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleUpvote}
              disabled={hasUpvoted}
            >
              <UpvoteIcon />
              <span className="text-gray-500 text-xs border-r border-gray-300 px-2">
                Upvote . {upvoteCount}
              </span>
            </button>
            <button className="flex text-gray-500 items-center gap-1">
              <DownvoteIcon />
            </button>
          </div>
          <button className="flex items-center gap-1" onClick={toggleComments}>
            <Image src="/comments.svg" alt="Comments" width={20} height={20} />
          </button>
          <Link href={`/posts/${item._id}`} passHref>
            <button className="flex items-center gap-1">
              <Image src="/Send.svg" alt="Share" width={20} height={20} />
            </button>
          </Link>
        </div>
        <button className="flex items-center gap-1">
          <Image src="/Bookmark.svg" alt="Save" width={20} height={20} />
        </button>
      </div>
      {showComments && (
        <Suspense fallback={<div>Loading comments...</div>}>
          <Writecomment item={item} />
          <ShowComments item={item} />
        </Suspense>
      )}
    </div>
  );
}
