import { Cancel01Icon, Copy01Icon, Download01Icon, File01Icon, SourceCodeIcon } from "hugeicons-react";
import { useState } from "react";
import { downloadFile } from "../utils/downloadFile";
import { languageExtensions } from "../constants/languageExtensions";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

export default function ShareModal({ onClose }) {
  const [copiedField, setCopiedField] = useState(null);
  const {code, language, result} = useSelector(state => state.review)
  const [searchParams] = useSearchParams()
  const reviewId = searchParams.get("review")
  const shareUrl = `${window.location.origin}/view/${reviewId}`;
  const ext = languageExtensions[language] || "txt";

  const handleCopy = async (text, field) => {
    await navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleCodeDownload = () => {
    downloadFile({
      filename: `code-snippet.${ext}`,
      content:code,
      type: "text/plain",
    });
  };

  const handleResultDownload = () => {
    downloadFile({
      filename: `review-result.md`,
      content:result,
      type: "text/plain",
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center md:px-4">
      <div className="bg-white dark:bg-neutral-900 w-full max-w-xl p-6 rounded-2xl shadow-2xl border border-neutral-300 dark:border-neutral-700 relative space-y-6">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-neutral-500 hover:text-neutral-800 dark:hover:text-white transition"
          aria-label="Close"
        >
          <Cancel01Icon size={20} />
        </button>

        {/* Header */}
        <h2 className="text-lg font-bold text-neutral-900 dark:text-white">🔗 Share Review</h2>

        {/* Share URL section */}
        <div className="space-y-2">
          <label className="block text-sm text-neutral-700 dark:text-neutral-300 font-medium">Public Share URL</label>
          <div className="flex gap-2">
            <input
              readOnly
              value={shareUrl}
              className="flex-1 px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 text-sm text-neutral-800 dark:text-white"
            />
            <button
              onClick={() => handleCopy(shareUrl, "url")}
              className="px-3 py-2 rounded-md border border-blue-400 bg-blue-600/20 hover:bg-blue-600/50 text-blue-600 dark:text-blue-200 flex items-center gap-1 text-sm"
            >
              <Copy01Icon size={14} />
              {copiedField === "url" ? "Copied" : "Copy"}
            </button>
          </div>
        </div>

        {/* Action Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Code Actions */}
          <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-4 border border-neutral-300 dark:border-neutral-700">
            <div className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-3 flex items-center gap-2"><SourceCodeIcon size={16}/> Code Snippet</div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleCopy(code, "code")}
                className="w-full px-3 py-2 rounded-md border border-blue-400 bg-blue-600/20 hover:bg-blue-600/50 text-blue-600 dark:text-blue-200 flex items-center justify-center gap-2 text-sm"
              >
                <Copy01Icon size={14} />
                {copiedField === "code" ? "Copied" : "Copy Code"}
              </button>
              <button
                onClick={() => handleCodeDownload()}
                className="w-full px-3 py-2 rounded-md border border-blue-400 bg-blue-600/20 hover:bg-blue-600/50 text-blue-600 dark:text-blue-200 flex items-center justify-center gap-2 text-sm"
              >
                <Download01Icon size={14} />
                Download Code
              </button>
            </div>
          </div>

          {/* Review Actions */}
          <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-4 border border-neutral-300 dark:border-neutral-700">
            <div className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-3 flex items-center gap-2"><File01Icon size={16}/> Review Output</div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleCopy(result, "review")}
                className="w-full px-3 py-2 rounded-md border border-blue-400 bg-blue-600/20 hover:bg-blue-600/50 text-blue-600 dark:text-blue-200 dark flex items-center justify-center gap-2 text-sm"
              >
                <Copy01Icon size={14} />
                {copiedField === "review" ? "Copied" : "Copy Review"}
              </button>
              <button
                onClick={() => handleResultDownload()}
                className="w-full px-3 py-2 rounded-md border border-blue-400 bg-blue-600/20 hover:bg-blue-600/50 text-blue-600 dark:text-blue-200 flex items-center justify-center gap-2 text-sm"
              >
                <Download01Icon size={14} />
                Download Review
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
