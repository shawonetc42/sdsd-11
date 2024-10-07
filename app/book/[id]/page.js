"use client";
import { useParams } from "next/navigation";
import Books from "../../../data/books"; // আপনার ডাটা ফাইলের পাথ

const BookDetail = () => {
  const { id } = useParams();

  // Get the book data based on ID
  const book = Books.find((b) => b.id === parseInt(id));

  if (!book) {
    return <p className="text-center text-gray-600">Loading...</p>; // In case the book is not found or still loading
  }

  return (
    <div className="flex flex-col items-center p-6 mt-10">
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8 w-full max-w-4xl">
        <h2 className="text-xl font-extrabold text-gray-900">
          {book.book.title}
        </h2>
        <p className="text-lg text-gray-700 mt-2">লেখক: {book.book.author}</p>
        <p className="text-sm text-gray-600 mt-1">ISBN: {book.book.isbn}</p>
        <p className="text-sm text-gray-600">
          প্রকাশিত: {book.book.published_date}
        </p>

        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            অধ্যায় সমূহ:
          </h3>
          {book.book.chapters.map((chapter, idx) => (
            <div key={idx} className="bg-gray-50 p-4 rounded-lg shadow-sm mb-4">
              <h4 className="text-md font-semibold text-gray-900">
                অধ্যায় {chapter.chapter_number}: {chapter.chapter_title}
              </h4>
              <p className="text-gray-700 mt-2">{chapter.content}</p>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            পৃষ্ঠাসমূহ:
          </h3>
          {book.book.pages.map((page, idx) => (
            <div key={idx} className="border rounded-lg mb-3 p-4 bg-gray-50">
              <h4 className=" font-semibold text-gray-900">
                <a
                  href={`/book/${book.id}/page/${page.page_number}`}
                  className="text-blue-600 hover:underline"
                >
                  পৃষ্ঠা {page.page_number}
                </a>
                <p className="text-sm text-gray-500">নোট: {page.notes}</p>
              </h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
