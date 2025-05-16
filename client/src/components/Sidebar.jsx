import { Search01Icon, MoreVerticalIcon, Menu01Icon } from "hugeicons-react";
import { motion } from "motion/react"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { deleteReviewById, fetchReviews, setCode, setResult, setTitle, updateReviewTitle } from "../redux/Slices/reviewSlice";
import { showConfirmModal } from "../redux/Slices/confirmModalSlice";


export default function Sidebar({ toggleSidebar, openSearch }) {
    const { reviews } = useSelector(state => state.review)
    const navigate = useNavigate()
    const [menuOpenIndex, setMenuOpenIndex] = useState("")

    const [searchParams] = useSearchParams()
    const reviewId = searchParams.get("review")
    const dispatch = useDispatch()

    const handleDelete = (id) => {
        dispatch(
            showConfirmModal({
                isOpen: true,
                title: "Remove Review?",
                message:
                    "Are you sure you want to delete this review? This action cannot be undone.",
                action: "deleteReviewById",
                payload:id
            })
        );
        // dispatch(deleteReviewById(id));
        if (id === reviewId) {
            dispatch(setCode(""));
            dispatch(setTitle(""));
            dispatch(setResult(""));
            navigate("/home");
        }
    };

    useEffect(() => {
        dispatch(fetchReviews())
    }, [])


    return (
        <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="w-64 fixed top-0 left-0 z-20 h-screen bg-neutral-100 dark:bg-neutral-900 text-white flex flex-col border-r border-neutral-300 dark:border-neutral-700">
            {/* Top Section */}
            <div className="h-14 px-4 flex items-center justify-between border-b border-neutral-300 dark:border-neutral-700">
                <div className="flex items-center space-x-2">
                    <button
                        onClick={toggleSidebar}
                        className="cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800 dark:hover:text-neutral-200 text-neutral-700 dark:text-neutral-400 p-2 rounded-lg transition"
                    >
                        <Menu01Icon size={20} />
                    </button>

                </div>
                <span className="text-lg font-semibold tracking-wide text-neutral-900 dark:text-neutral-200">ZephyrLint</span>

                <button onClick={openSearch} className="cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800 dark:hover:text-neutral-200 text-neutral-700 dark:text-neutral-400 p-2 rounded-lg transition">
                    <Search01Icon size={18} />
                </button>
            </div>

            {/* Sessions */}
            <div className="flex-1 overflow-y-auto">
                <div className="p-2 space-y-1">
                    {reviews.map((review, idx) => {
                        const isActive = review._id === reviewId;
                        const isMenuOpen = menuOpenIndex === idx;

                        return (
                            <div
                                key={idx}
                                className={`relative flex items-center justify-between px-3 py-2 rounded-lg text-sm cursor-pointer ${isActive
                                    ? "bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100"
                                    : "hover:bg-neutral-200 text-neutral-500 hover:text-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
                                    }`}
                            >
                                <button
                                    className="flex-1 text-left truncate cursor-pointer"
                                    onClick={() => {
                                        navigate(`/home?review=${review._id}`);
                                        toggleSidebar();
                                    }}
                                >
                                    {review.title}
                                </button>

                                <div className="relative">
                                    <button
                                        onClick={() => setMenuOpenIndex(isMenuOpen ? null : idx)}
                                        className="text-black dark:text-white hover:bg-neutral-300 dark:hover:bg-neutral-700 cursor-pointer rounded-md p-1 transition"
                                    >
                                        <MoreVerticalIcon size={16} />
                                    </button>

                                    {/* Dropdown Menu */}
                                    {isMenuOpen && (
                                        <div className="absolute right-0 mt-2 w-28 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-md shadow-lg z-10">
                                            <button
                                                className="w-full px-3 py-2 text-left text-sm hover:bg-neutral-100 dark:hover:bg-neutral-700"
                                                onClick={() => {
                                                    setMenuOpenIndex(null);
                                                    // Trigger rename logic here
                                                    const rename = prompt(`Rename: ${review.title}`);
                                                    dispatch(updateReviewTitle({ id: review._id, title: rename }))
                                                }}
                                            >
                                                Rename
                                            </button>
                                            <button
                                                className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                                                onClick={() => {
                                                    setMenuOpenIndex(null);
                                                    handleDelete(review._id)
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}

                </div>
            </div>

            {/* Footer */}
            <div className="p-4 text-xs text-gray-600 border-t border-neutral-300 dark:border-neutral-700">
                v1.0.0 — Secure Sessions
            </div>
        </motion.div>
    );
}
