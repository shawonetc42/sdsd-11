import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  // Fetching data from JSONPlaceholder API
  const data = await fetch("https://jsonplaceholder.typicode.com/posts")
    .then((res) => res.json())
    .catch((error) => console.error("Error fetching data:", error));

  return (
    <div className="bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-blue-500 mb-4">
        Welcome to Next.js with Tailwind CSS!
      </h1>
      {data.map((post) => (
        <div key={post.id} className="bg-white p-4 rounded-lg shadow-md mb-4">
          <h2 className="text-2xl font-bold text-blue-600">
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
          </h2>
          <p className="text-gray-700">{post.body}</p>
        </div>
      ))}
    </div>
  );
}
