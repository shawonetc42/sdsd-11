"use client";
import React, { useState } from "react";

const BookForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    published_date: "",
    genre: "",
    rating: "",
    price: "",
    availability: "",
    pages: [
      {
        page_number: 1,
        header: "",
        subheader: "",
        text: "",
        image: "",
        notes: "",
      },
    ],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePageChange = (idx, e) => {
    const { name, value } = e.target;
    const updatedPages = formData.pages.map((page, i) =>
      i === idx ? { ...page, [name]: value } : page
    );
    setFormData({ ...formData, pages: updatedPages });
  };

  const addPage = () => {
    setFormData({
      ...formData,
      pages: [
        ...formData.pages,
        {
          page_number: formData.pages.length + 1,
          header: "",
          subheader: "",
          text: "",
          image: "",
          notes: "",
        },
      ],
    });
  };

  const removePage = (idx) => {
    const updatedPages = formData.pages.filter((_, i) => i !== idx);
    setFormData({ ...formData, pages: updatedPages });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">বই যোগ করুন</h1>

      {/* Book Details Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            বইয়ের শিরোনাম
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            লেখকের নাম
          </label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            ISBN
          </label>
          <input
            type="text"
            name="isbn"
            value={formData.isbn}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            প্রকাশের তারিখ
          </label>
          <input
            type="date"
            name="published_date"
            value={formData.published_date}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            শ্রেণী
          </label>
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            রেটিং
          </label>
          <input
            type="number"
            step="0.1"
            name="rating"
            value={formData.rating}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            মূল্য
          </label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            উপলব্ধতা
          </label>
          <input
            type="text"
            name="availability"
            value={formData.availability}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
          />
        </div>
      </div>

      {/* Pages Section */}
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        পৃষ্ঠা যোগ করুন
      </h2>
      {formData.pages.map((page, idx) => (
        <div key={idx} className="bg-white p-6 shadow-md rounded-lg mb-4">
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            পৃষ্ঠা সংখ্যা
          </label>
          <input
            type="number"
            name="page_number"
            value={page.page_number}
            onChange={(e) => handlePageChange(idx, e)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
          />
          <label className="block text-sm font-semibold mb-2 mt-2 text-gray-700">
            হেডার
          </label>
          <input
            type="text"
            name="header"
            value={page.header}
            onChange={(e) => handlePageChange(idx, e)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
          />
          <label className="block text-sm font-semibold mb-2 mt-2 text-gray-700">
            সাবহেডার
          </label>
          <input
            type="text"
            name="subheader"
            value={page.subheader}
            onChange={(e) => handlePageChange(idx, e)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
          />
          <label className="block text-sm font-semibold mb-2 mt-2 text-gray-700">
            পাঠ্য
          </label>
          <textarea
            name="text"
            value={page.text}
            onChange={(e) => handlePageChange(idx, e)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm h-32"
          />
          <label className="block text-sm font-semibold mb-2 mt-2 text-gray-700">
            ছবি URL
          </label>
          <input
            type="text"
            name="image"
            value={page.image}
            onChange={(e) => handlePageChange(idx, e)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
          />
          <label className="block text-sm font-semibold mb-2 mt-2 text-gray-700">
            নোটস
          </label>
          <textarea
            name="notes"
            value={page.notes}
            onChange={(e) => handlePageChange(idx, e)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm h-32"
          />
          <button
            type="button"
            onClick={() => removePage(idx)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4"
          >
            এই পৃষ্ঠা সরান
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addPage}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-6"
      >
        আরও পৃষ্ঠা যোগ করুন
      </button>

      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded-lg"
      >
        ফর্ম জমা দিন
      </button>
    </div>
  );
};

export default BookForm;
