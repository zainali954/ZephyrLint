import { Cancel01Icon } from "hugeicons-react";
import { useState } from "react";

export default function ApiKeyModal({ closeModal }) {


  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center md:px-4">
      <div className="bg-white dark:bg-neutral-900 w-full max-w-xl p-6 rounded-2xl shadow-2xl border border-neutral-300 dark:border-neutral-700 relative space-y-6">
        {/* Close button */}
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-neutral-500 hover:text-neutral-800 dark:hover:text-white transition"
          aria-label="Close"
        >
          <Cancel01Icon size={20} />
        </button>

        {/* Header */}
        <h2 className="text-lg font-bold text-neutral-900 dark:text-white">Get Your API Key</h2>

        <ol className="list-decimal list-inside space-y-2 text-neutral-700 dark:text-neutral-300">
          <li>
            Go to{" "}
            <a
              href="https://aistudio.google.com/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline"
            >
              aistudio.google.com/apikey
            </a>
          </li>
          <li>Log in with your Google account (if prompted).</li>
          <li>Click on "Create API Key".</li>
          <li>Copy the API key provided.</li>
          <li>Return to this app and paste it where required.</li>
        </ol>
      </div>
    </div>
  );
}
