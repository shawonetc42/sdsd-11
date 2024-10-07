import React from "react";
import Posts from "./Server/Posts";
import Loading from "./home/loading";

export default function PostsPage() {
  return (
    <div className="">
      <React.Suspense fallback={<Loading />}>
        <Posts />
      </React.Suspense>
    </div>
  );
}
