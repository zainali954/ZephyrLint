import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import 'highlight.js/styles/github-dark.css';
import { useSelector } from "react-redux";
import Button from "./Button";
import { Copy01Icon, Download01Icon } from "hugeicons-react";
import { useState } from "react";
import { downloadFile } from "../utils/downloadFile";

export default function FeedbackPanel({ loading, shareMode = false }) {
  const { result } = useSelector((state) => state.review);


  return (
    
    <div className="relative h-full flex flex-col bg-neutral-100 dark:bg-neutral-900 p-4 overflow-y-auto flex-1">
      <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200 mb-3">AI Feedback</h2>
      <div className="markdown-body prose dark:prose-invert custom-dark-prose prose-pre:bg-neutral-900 dark:prose-pre:bg-neutral-950 prose-pre:border prose-pre:border-neutral-700 max-w-none overflow-auto custom-scrollbar">
        {loading ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-green-400 font-mono">
              <span className="animate-pulse">Reviewing your code, please wait...</span>
              <span className="dot-flash" />
              <span className="dot-flash delay-200" />
              <span className="dot-flash delay-400" />
            </div>
            <div className="space-y-2 pt-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`h-4 rounded bg-neutral-300 dark:bg-neutral-700 animate-pulse ${i % 2 === 0 ? 'w-11/12' : 'w-3/4'}`}
                />
              ))}
            </div>
          </div>
        ) : (
          <Markdown rehypePlugins={[rehypeHighlight]}>
            {result || '*Submit your code for review to see the result.*'}
          </Markdown>
        )}

      </div>
    </div>
  );
}
