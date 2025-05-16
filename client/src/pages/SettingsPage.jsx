import { useDispatch, useSelector } from "react-redux";
import { getSessions } from "../redux/Slices/authSlice";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { getDeviceInfo } from "../utils/parseUserAgent";
import { Link } from "react-router-dom";
import ProfileCard from "../components/ProfileCard";
import SessionButtons from "../components/SessionButtons";
import ApiKeyManager from "../components/APIKeyManager.jsx";
import ApiKeyModal from "../components/ApiKeyModal";

const Settings = () => {
    const { user, sessions, accessToken, sessionId } = useSelector((state) => state.auth);
    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(false);
    };
    const dispatch = useDispatch();

    useEffect(() => {
        if (accessToken) {
            dispatch(getSessions());
        }
    }, [accessToken]);

    return (
        <div className="flex flex-col md:flex-row gap-4  text-neutral-900 dark:text-neutral-100 transition-colors ">
            <ProfileCard user={user} />
            {isOpen && <ApiKeyModal closeModal={closeModal} />}

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full space-y-4"
            >
                {/* API Key Management Section */}
                <div className="bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-2xl p-6 shadow-lg">
                    <h2 className="text-xl font-medium mb-4">API Key Management</h2>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">
                        To enable <span className="text-indigo-500 font-medium">AI-powered code reviews</span>, please provide your Gemini API key.
                        Your key will be <span className="text-indigo-500 font-medium">securely encrypted</span> and stored in our database — accessible only to you and our backend services.
                        We <span className="text-indigo-500 font-medium">never share or expose</span> your key, and it's used solely to perform actions on your behalf.
                        You can <span className="text-indigo-500 font-medium">add, update, or remove</span> your key anytime from your settings.
                    </p>

                    <button
                        onClick={() => setIsOpen(true)}
                        className="cursor-pointer underline text-indigo-600 font-medium my-2"
                    >
                        How to get API Key?
                    </button>

                    <ApiKeyManager />
                </div>

                {/* Recent Sessions Section */}
                <div className="bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-2xl p-6 shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-medium">Recent Sessions</h2>
                        <Link
                            to={"/sessions"}
                            className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                        >
                            See All
                        </Link>
                    </div>

                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                        These are the devices and browsers where your account was recently accessed. If you see any suspicious
                        activity, please log out from other sessions or reset your password.
                    </p>

                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-6">
                        Note: Each session is automatically removed after 30 days.
                    </p>

                    <ul>
                        {sessions.slice(0, 5).map((session) => {
                            const { browserName, browserVersion, osName } = getDeviceInfo(session.userAgent);

                            return (
                                <li
                                    key={session._id}
                                    className="py-4 flex justify-between items-start border-b border-neutral-200 dark:border-neutral-700 last:border-none"
                                >
                                    <div>
                                        <p className="text-sm">
                                            <span className="font-medium">IP:</span>{" "}
                                            {session.ipAddress === "::1" ? "Localhost" : session.ipAddress}
                                        </p>
                                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                            {browserName} {browserVersion} on {osName}
                                        </p>
                                        <p className="text-xs text-neutral-400 mt-1">
                                            Created: {format(new Date(session.createdAt), "PPpp")}
                                        </p>
                                    </div>
                                    <div>
                                        <span
                                            className={`font-medium px-2 md:px-3 py-1 rounded-full text-xs md:text-sm ${session.isValid ? " bg-green-600 text-white" : "bg-neutral-500 text-white"
                                                }`}
                                        >
                                            {session.isValid ? "Active" : "Revoked"}
                                            {session._id === sessionId && " • This Device"}
                                        </span>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>

                    <SessionButtons />
                </div>
            </motion.div>
        </div>
    );
};

export default Settings;
