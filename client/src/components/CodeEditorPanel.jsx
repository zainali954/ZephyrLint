import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import { languageOptions } from "../constants/LanguageOptions";
import 'prismjs/themes/prism-tomorrow.css';
// Language support
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-docker';
import 'prismjs/components/prism-git';
import 'prismjs/components/prism-markup-templating'; // required for PHP
import 'prismjs/components/prism-php';
import Button from "./Button";
import { Copy01Icon, Download01Icon, InformationCircleIcon } from "hugeicons-react";
import { useDispatch, useSelector } from "react-redux";
import { setCode, setLanguage, setResult, setTitle } from "../redux/Slices/reviewSlice";
import { useEffect, useState } from "react";
import Tabs from "./Tabs";
import { downloadFile } from "../utils/downloadFile";
import { languageExtensions } from "../constants/languageExtensions";

export default function CodeEditorPanel({ reviewCode, loading, shareMode = false }) {
    const dispatch = useDispatch();
    const { code, language, title } = useSelector((state) => state.review);
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    function handleDownload() {
        const extension = languageExtensions[language] || "txt";
        downloadFile({
            filename: `code-snippet.${extension}`,
            content: code,
            type: "text/plain", // or smarter based on language
        });
    }

    useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        reviewCode(); // Trigger review
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [reviewCode]);
    return (
        <div className="relative h-full flex flex-col bg-neutral-100 dark:bg-neutral-900 p-4 overflow-hidden w-full md:w-auto md:flex-[1]">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200 mb-3">Code Editor</h2>


                <div className="flex items-center gap-2">
                    <div className="relative group">
                        <span className="text-neutral-700 dark:text-neutral-300 text-sm cursor-pointer"><InformationCircleIcon size={20} /></span>
                        <div className="absolute right-6 -bottom-4 bg-neutral-100 border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 text-xs text-black dark:text-white p-2 rounded w-60  opacity-0 group-hover:opacity-100 transition">
                            Sets syntax highlighting and helps identify the code for better review.
                        </div>
                    </div>

                    <select
                        value={language}
                        onChange={(e) => dispatch(setLanguage(e.target.value))}
                        className="bg-white hover:bg-neutral-100 border border-neutral-300 text-neutral-700 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:border-neutral-700 dark:text-white focus:ring-neutral-500 text-sm rounded px-2 py-1"
                    >
                        {languageOptions.map((lang) => (
                            <option key={lang} value={lang}>
                                {lang.toUpperCase()}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {!shareMode && <input
                type="text"
                value={title}
                title="You can add title to easily find it out."
                onChange={(e) => dispatch(setTitle(e.target.value))}
                placeholder="e.g., JavaScript Code Review"
                className="py-2 text-sm bg-white dark:bg-neutral-800 border dark:border-neutral-600 border-neutral-300 dark:text-neutral-200 rounded-md px-4"
            />}

            <div className="flex-1 overflow-auto rounded-lg custom-scrollbar">

                <Editor
                    placeholder="Type your code here..."
                    value={code}
                    onValueChange={(val) => dispatch(setCode(val))}
                    highlight={(code) => Prism.highlight(code, Prism.languages[language], language)}
                    padding={12}
                    disabled={shareMode}
                    className="container__editor text-neutral-900 dark:text-neutral-100"
                    style={{
                        fontFamily: '"Fira Code", monospace',
                        fontSize: 14,
                        minHeight: '100%',
                        whiteSpace: 'pre',
                    }}
                />
            </div>

           
            {!shareMode && (
                <div className="pt-4 mt-4 border-t border-neutral-300 dark:border-neutral-700 flex flex-col md:flex-row justify-between gap-2">

                    <Tabs />
                    <div className="flex  gap-2">
                        <Button variant={"secondary"} disabled={loading} onClick={() => {
                            dispatch(setCode(""));
                            dispatch(setTitle(""));
                            dispatch(setResult(""));
                        }}>
                            Clear
                        </Button>
                        <Button loading={loading} onClick={reviewCode}>
                            Review
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}