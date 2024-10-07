"use client";
import { useParams } from "next/navigation";
import Books from "@/data/books";
import BookDetail from "../../page";
import Image from "next/image";

const PageDetail = () => {
  const { id, page_number } = useParams();
  const book = Books.find((b) => b.id === parseInt(id));

  if (!book) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-500">বইয়ের তথ্য লোড হচ্ছে...</p>
      </div>
    );
  }

  const page = book.book.pages.find(
    (p) => p.page_number === parseInt(page_number)
  );

  if (!page) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-500">পৃষ্ঠার তথ্য পাওয়া যায়নি</p>
      </div>
    );
  }

  return (
    <div className="flex container mx-auto max-w-screen-xl w-full p-6 mt-10">
      <div>
        <BookDetail />
      </div>
      <div className="bg-white  max-w-2xl rounded-lg shadow-lg p-8 mb-8 w-full">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">{page.header}</h2>
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">
          {page.subheader}
        </h3>
        <p className="text-gray-700 mb-4">{page.text}</p>
        {page.image && (
          <Image
            src={page.image}
            width={page.imageWidth}
            height={page.imageHeight}
            alt={`Image for page ${page.page_number}`}
            className="mb-4 rounded-md shadow-md"
          />
        )}
        <p className="text-sm text-gray-500">নোট: {page.notes}</p>
      </div>
    </div>
  );
};

export default PageDetail;
