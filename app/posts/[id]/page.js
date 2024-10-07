import TruncatedText from "@/components/helper/TruncatedText";

// app/posts/[id]/page.js
export default async function PostPage({ params }) {
  const { id } = params; // Get the post ID from the URL parameters
  const res = await fetch(`https://flashmain.vercel.app/posts/${id}`);
  const post = await res.json();

  return (
    <div className="bg-gray-100 p-4 mt-20">
      <h1> hello world</h1>
      {/* <TruncatedText text={data.questiontext} />
      <h1 className="text-4xl font-bold text-blue-500">{post.title}</h1>
      <p className="text-gray-700 mt-4">{post.body}</p> */}
    </div>
  );
}
