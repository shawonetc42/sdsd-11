"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import TruncatedText from "@/components/helper/TruncatedText";
import timeSince from "@/components/helper/timeSince";
import CommentActions from "@/components/model/Comments";
import Toggle from "@/components/toogle/Toggle";
import PostReport from "@/components/report/PostReport";
import Loading from "../home/loading";

const Posts = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://flashmain.vercel.app/posts/test?page=${page}&per_page=10`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      if (result.posts.length < 10) {
        setHasMore(false);
      }
      setData((prev) => {
        const existingIds = new Set(prev.map((post) => post._id));
        const newPosts = result.posts.filter(
          (post) => !existingIds.has(post._id)
        );
        return [...prev, ...newPosts];
      });
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 100 &&
        !loading &&
        hasMore
      ) {
        setPage((prev) => prev + 1);
      }
    };

    const debounce = (func, delay) => {
      let timeoutId;
      return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
      };
    };

    const handleScrollDebounced = debounce(handleScroll, 200);
    window.addEventListener("scroll", handleScrollDebounced);
    return () => window.removeEventListener("scroll", handleScrollDebounced);
  }, [loading, hasMore]);

  return (
    <div className="max-w-3xl mx-auto mt-20">
      <ul>
        {data.map((item) => (
          <div
            key={item._id}
            className="flex flex-col px-4 py-3.5 bg-white rounded-2xl max-w-[570px] max-md:pr-5 mt-2 min-w-0 md:min-w-[570px]"
          >
            <div className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
              <div className="flex gap-2">
                <Image
                  loading="lazy"
                  src={item.image || "Profile.svg"}
                  alt="profile"
                  width={24}
                  height={24}
                  className="shrink-0 w-8 h-8 aspect-square rounded-full"
                />
                <div className="flex flex-col my-auto">
                  <div className="flex gap-1 px-px text-black whitespace-nowrap">
                    <Link href={`/profile/${item._id}`} prefetch={false}>
                      <div className="grow font-semibold text-sm hover:text-[#45B09E]">
                        {item.username}
                      </div>
                    </Link>
                  </div>
                  <div className="flex gap-2 mt-1.5 text-xs text-black text-opacity-50">
                    <div>Ceo Of Jefred</div>
                    <div>{timeSince(item.time)}</div>
                  </div>
                </div>
              </div>
              <Toggle
                buttonLabel={
                  <Image
                    loading="lazy"
                    src="/svg/3dot.svg"
                    alt="3 dot"
                    width={24}
                    height={24}
                    className="shrink-0 my-auto w-3 aspect-[0.24]"
                  />
                }
              >
                <PostReport />
              </Toggle>
            </div>
            <div className="mt-2 text-black max-md:max-w-full">
              <TruncatedText text={item.questiontext} />
            </div>
            <CommentActions item={item} />
          </div>
        ))}
        {loading && (
          <div className="">
            <Loading />
          </div>
        )}
        {error && <div className="text-center py-4 text-red-500">{error}</div>}
        {!hasMore && <div className="text-center py-4">No more posts</div>}
      </ul>
    </div>
  );
};

export default Posts;
