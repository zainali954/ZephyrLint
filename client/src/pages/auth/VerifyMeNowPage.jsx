import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"
import { motion } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import { verify } from "../../redux/Slices/authSlice";

export default function VerifyNowPage() {
    const [status, setStatus] = useState("loading"); // 'loading' | 'success' | 'error'
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const email = searchParams.get("email")

    const dispatch = useDispatch();
    const navigate = useNavigate()

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await dispatch(verify({ email, token })).unwrap();
                if (response) {
                    setStatus("success");
                } else {
                    setStatus("error");
                }
            } catch (err) {
                setStatus("error");
            }
        };

        if (token && token) {
            verifyEmail();
        } else {
            setStatus("error");
        }
    }, [token, dispatch]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-900 px-4">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-2xl shadow-xl p-8 text-center"
            >
                {status === "loading" && (
                    <div className="flex flex-col items-center gap-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="icon icon-tabler icons-tabler-outline icon-tabler-loader-2 animate-spin text-purple-600"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M12 3a9 9 0 1 0 9 9" />
                        </svg>
                        <p className="text-zinc-700 dark:text-zinc-300 text-sm">
                            Verifying your email...
                        </p>
                    </div>
                )}

                {status === "success" && (
                    <div className="flex flex-col items-center gap-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="icon icon-tabler icons-tabler-outline icon-tabler-circle-check text-green-600"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                            <path d="M9 12l2 2l4 -4" />
                        </svg>
                        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                            Email Verified!
                        </h2>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                            Your email has been successfully verified. You can now log in.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => {
                                // redirect to login
                                navigate("/login")
                            }}
                            className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition cursor-pointer"
                        >
                            Go to Login
                        </motion.button>
                    </div>
                )}

                {status === "error" && (
                    <div className="flex flex-col items-center gap-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="icon icon-tabler icons-tabler-outline icon-tabler-circle-x text-red-600"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                            <path d="M10 10l4 4m0 -4l-4 4" />
                        </svg>
                        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                            Verification Failed
                        </h2>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                            The link is invalid or has expired. Please request a new one.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => {
                                const url = email ? `/verify-email?email=${email}` : "/verify-email"
                                navigate(url)
                            }}
                            className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition cursor-pointer"
                        >
                            Request Again
                        </motion.button>
                    </div>
                )}
            </motion.div>
        </div>
    );
}