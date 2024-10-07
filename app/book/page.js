import Link from "next/link";
import Books from "@/data/books";

const Home = () => {
  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">বইয়ের তালিকা</h1>
      {Books.map((book) => (
        <div
          key={book.id}
          className="bg-white rounded-lg shadow-md p-6 mb-6 w-full max-w-2xl"
        >
          <h2 className="text-2xl font-bold text-gray-800">
            {book.book.title}
          </h2>
          <p className="text-lg text-gray-600 mt-2">লেখক: {book.book.author}</p>
          <Link href={`/book-view/${book.id}`}>
            <p className="text-blue-500 hover:underline mt-4">
              বিস্তারিত দেখুন
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Home;
