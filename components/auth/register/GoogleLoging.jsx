"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation"; // if you are using Next.js

const Dashboard = () => {
  const searchParams = useSearchParams();
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const token = searchParams.get("access_token");
    if (token) {
      setAccessToken(token);
      // টোকেন ব্যবহার করতে চান
      console.log("Access Token:", token);
    }
  }, [searchParams]);

  return (
    <div className="mt-20">
      <h2>Dashboard</h2>
      {accessToken ? (
        <p>Access Token: {accessToken}</p>
      ) : (
        <p>Access Token পাওয়া যায়নি</p>
      )}
    </div>
  );
};

export default Dashboard;
