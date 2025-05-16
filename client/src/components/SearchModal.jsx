import { Cancel01Icon } from "hugeicons-react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function SearchModal({ isOpen, onClose }) {
  const inputRef = useRef();
  const [query, setQuery] = useState("");
  const { reviews } = useSelector((state) => state.review);
  const navigate = useNavigate();

  const results = reviews?.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleResultClick = (id) => {
    navigate(`/home?review=${id}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50  flex items-center justify-center px-4">
      <div className="relative bg-white dark:bg-neutral-900 w-full max-w-lg rounded-xl shadow-2xl p-4 border border-neutral-300 dark:border-neutral-700 transition-all duration-200 ease-in-out">

        {/* Header */}

        <h2 className="text-base font-semibold text-neutral-800 dark:text-neutral-200 mb-4">
        Quick Search
        </h2>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-neutral-500 hover:text-neutral-800 dark:hover:text-white transition"
          aria-label="Close"
        >
          <Cancel01Icon size={20} />
        </button>
        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by session title..."
          className="w-full px-4 py-2 mb-2 text-sm rounded-md border border-neutral-300 dark:border-neutral-600 bg-neutral-100 dark:bg-neutral-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Divider */}
        {query && <hr className="my-2 border-neutral-300 dark:border-neutral-700" />}

        {/* Results */}
        {query && (
          <ul className="mt-1 max-h-60 overflow-y-auto text-sm text-gray-700 dark:text-neutral-300 divide-y divide-neutral-200 dark:divide-neutral-700">
            {results.length > 0 ? (
              results.map((item) => (
                <li
                  key={item._id}
                  onClick={() => handleResultClick(item._id)}
                  className="py-2 px-3 hover:bg-blue-50 dark:hover:bg-neutral-800 cursor-pointer transition rounded-md"
                >
                  <span className="block font-medium">{item.title}</span>
                </li>
              ))
            ) : (
              <li className="py-3 px-3 text-center text-neutral-500 italic">
                No results found
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
