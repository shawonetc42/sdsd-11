// app/posts/[id]/page.js
export default async function PostPage({ params }) {
  const { id } = params; // Get the post ID from the URL parameters
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const post = await res.json();

  // Check if the post exists
  if (!post.id) {
    return <h1>Post not found</h1>;
  }

  return (
    <div className="bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-blue-500">{post.title}</h1>
      <p className="text-gray-700 mt-4">{post.body}</p>
    </div>
  );
}
