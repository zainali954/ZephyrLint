
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setApiKey } from "../redux/Slices/authSlice"; // Example actions
import { showConfirmModal } from "../redux/Slices/confirmModalSlice";

const ApiKeyManager = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [key, setKey] = useState("");
    const addKey = async () => {
        if (!key.trim()) return;
        dispatch(setApiKey(key))
        setKey("");
    };

    const handleRemove = () => {
        dispatch(
            showConfirmModal({
                isOpen: true,
                title: "Remove Api?",
                message:
                    "Are you sure you want to remove this API key? You’ll need to add another one to continue using the AI review feature.",
                action: "removeApiKey",
            })
        );
    };

    return (
        <div className="space-y-4">
            {user.hasKey ? (
                <div className="flex items-center justify-between bg-zinc-100 dark:bg-zinc-800 px-4 py-3 rounded-lg shadow-sm">
                    <input
                        value={"Your API Key"}
                        disabled
                        className="bg-transparent border-none outline-none text-sm font-medium text-zinc-900 dark:text-white w-1/2 cursor-not-allowed"
                    />
                    <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-zinc-400">********</span>
                        <button
                            onClick={handleRemove}
                            className="text-sm text-red-500 hover:underline"
                        >
                            Remove
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex items-center gap-2">
                    <input
                        value={key}
                        onChange={(e) => setKey(e.target.value)}
                        placeholder="Enter Gemini API Key"
                        className="flex-1 px-3 py-2 rounded bg-zinc-200 dark:bg-zinc-700 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-500"
                    />
                    <button
                        onClick={addKey}
                        className="w-fit px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
                    >
                        Add Key
                    </button>
                </div>
            )}
        </div>
    );
};

export default ApiKeyManager;
