// app/page.js
import React from "react";
import Link from "next/link";
import TruncatedText from "@/components/helper/TruncatedText";
import CommentActions from "@/components/model/Comments";
import Writecomment from "@/components/model/Writecomment";
import timeSince from "@/components/helper/timeSince";
import NavigationMenu from "@/components/model/navigationMenu";
import RightSide from "@/components/model/rightSide";
import PostList from "./pagi/page";
import StatusUpdate from "@/components/client/router/StatusUpdate";
import PostsPage from "./b/page";

export default async function Home() {
  return (
    <>
      <main>
        <h1>Hello World 3</h1>
      </main>
    </>
  );
}
