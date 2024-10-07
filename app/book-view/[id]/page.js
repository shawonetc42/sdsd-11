"use client";
import { useParams } from "next/navigation";
import Books from "@/data/books";
import BookDetail from "@/app/book/[id]/page";
import Image from "next/image";

const BookView = () => {
  const { id } = useParams();

  // Get the book data based on ID
  const book = Books.find((b) => b.id === parseInt(id));

  if (!book) {
    return <p className="text-center text-gray-600">Loading...</p>; // In case the book is not found or still loading
  }

  return (
    <div className="flex max-w-screen-xl mx-auto p-6 mt-10">
      <BookDetail />
      <div className="rounded-lg shadow-lg p-8 mb-8 w-full max-w-4xl ">
        <div>
          {book.book.pages.map((page, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow-lg p-8 mb-8 w-full max-w-screen-xl mx-auto "
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {page.header}
              </h2>
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                {page.subheader}
              </h3>
              <p
                className="text-gray-700 mb-4"
                dangerouslySetInnerHTML={{ __html: page.text }}
              />
              {page.image && (
                <Image
                  width={page.imageWidth}
                  height={page.imageHeight}
                  src={page.image}
                  alt={`Image for page ${page.page_number}`}
                  className="mb-4 rounded-md shadow-md"
                />
              )}
              <p className="text-sm text-gray-500">নোট: {page.notes}</p>
              <div className="flex justify-self-end">
                <p className="text-sm text-gray-500 ml-auto">
                  Page: {page.page_number}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookView;
