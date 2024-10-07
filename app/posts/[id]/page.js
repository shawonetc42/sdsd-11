import TruncatedText from "@/components/helper/TruncatedText";
import CommentActions from "@/components/model/Comments";
import React from "react";

// Utility function to remove HTML tags from a string
function stripHtmlTags(str) {
  return str.replace(/<\/?[^>]+(>|$)/g, "");
}

export async function generateMetadata({ params }) {
  const { id } = params;
  const response = await fetch(`https://flashmain.vercel.app/posts/${id}`);
  const post = await response.json();

  // Remove HTML tags from the questiontext
  const strippedText = stripHtmlTags(post.questiontext);

  return {
    title: strippedText,
    description: strippedText,
  };
}

export default async function Posts({ params }) {
  const id = params.id;
  const response = await fetch(`https://flashmain.vercel.app/posts/${id}`);
  const data = await response.json();

  console.log(data);

  return (
    <div className="mt-36 bg-white py-2 md:mt-20 px-4 container mx-auto max-w-3xl">
      <TruncatedText text={data.questiontext} />
      <CommentActions item={data} />
    </div>
  );
}
