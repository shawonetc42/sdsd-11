"use client";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const TrackPageEngagement = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // ট্র্যাকিং একবারই হবে
    threshold: 0.1, // 10% ভিউ হলে ট্রিগার হবে
  });

  useEffect(() => {
    if (inView) {
      // এখানে আপনার API কল যুক্ত করুন
      fetch("/api/engagement", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          page_url: window.location.pathname, // বা আপনার পেজ URL
          user_id: "example_user_id", // এখানে আপনার ব্যবহারকারী আইডি যুক্ত করুন
        }),
      })
        .then((response) => response.json())
        .then((data) => console.log("Engagement logged:", data))
        .catch((error) => console.error("Error:", error));
    }
  }, [inView]);

  return <div ref={ref}>Track this section</div>;
};

export default TrackPageEngagement;
