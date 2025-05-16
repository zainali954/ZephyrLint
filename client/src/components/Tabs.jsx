import { useDispatch, useSelector } from "react-redux";
import { setMode } from "../redux/Slices/reviewSlice";

const modes = [
    { key: "general", label: "General" },
    { key: "deep", label: "Deep" },
    { key: "rewrite", label: "Rewrite" },
    { key: "performance", label: "Performance" },
];

export default function ModelModeSelector() {
    const activeMode = useSelector(
        state => state.review.mode,
    );
    const dispatch = useDispatch()
    const handleSelect = (key) => {
        dispatch(setMode(key))
    };

    return (
        <div className="inline-flex rounded-md overflow-hidden border border-neutral-300 dark:border-neutral-500 w-full sm:w-fit overflow-x-auto">
            {modes.map((mode, index) => (
                <button
                    key={mode.key}
                    onClick={() => handleSelect(mode.key)}
                    className={`px-4 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none
            ${activeMode === mode.key
                            ? "bg-indigo-600/20 text-black dark:text-white"
                            : "bg-white dark:bg-neutral-900 text-neutral-500 dark:text-neutral-300 hover:bg-indigo-50 dark:hover:bg-neutral-800"}
            ${index !== modes.length - 1 ? "border-r border-neutral-300 dark:border-neutral-500" : ""}`}
                >
                    {mode.label}
                </button>
            ))}
        </div>
    );
}
