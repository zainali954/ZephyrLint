import { useSelector, useDispatch } from "react-redux";
import { InformationCircleIcon, Delete03Icon } from "hugeicons-react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { deleteAllSessions, logout, logoutOtherSessions, removeApiKey, setName } from "../redux/Slices/authSlice";
import { hideConfirmModal } from "../redux/Slices/confirmModalSlice";
import { updateName, updatePassword } from "../redux/Slices/userSlice";
import { deleteReviewById } from "../redux/Slices/reviewSlice";

const ConfirmationModal = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { title, message, action, payload } = useSelector((state) => state.confirmModal);


    const actionMapper = {
        logoutOtherSessions: async (data) => {
            await dispatch(logoutOtherSessions(data)).unwrap();
        },
        deleteAllSessions: async () => {
            await dispatch(deleteAllSessions()).unwrap();
        },
        updateName: async (data) => {
            await dispatch(updateName(data)).unwrap();
            dispatch(setName(data)); 
        },
        updatePassword: async (data) => {
            await dispatch(updatePassword(data)).unwrap();
            dispatch(logout());
            navigate("/login"); 
        },
        removeApiKey: async ()=>{
            await dispatch(removeApiKey())
        },
        deleteReviewById: async (data)=>{
            await dispatch(deleteReviewById(data))
        }
    };

    const handleConfirm = async () => {
        try {
            if (action && actionMapper[action]) {
                await actionMapper[action](payload);
            }
            dispatch(hideConfirmModal());
        } catch (err) {
            console.error("Failed to perform action.", err);
            dispatch(hideConfirmModal());
        }
    };
    const isDeleteAction = action?.startsWith('delete');

    return (
        <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4"
        >
            <motion.div
                key="popup"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="w-full max-w-lg rounded-xl shadow-lg p-6 flex flex-col gap-4 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700"
            >

                {/* Top Icon */}
                <div className={`w-fit ${isDeleteAction ? 'bg-red-100 text-red-600' : 'bg-purple-100 text-purple-600'} dark:bg-opacity-25 rounded-lg p-2`}>
                    {isDeleteAction ? <Delete03Icon size={20} /> : <InformationCircleIcon size={20} />}
                </div>

                {/* Title and Message */}
                <div>
                    <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{title}</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{message}</p>
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3 mt-4">
                    <button
                        onClick={() => dispatch(hideConfirmModal())}
                        className="cursor-pointer bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 dark:text-zinc-300 text-zinc-800 px-4 py-1.5 rounded-md text-sm"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirm}
                        className={`cursor-pointer px-4 py-1.5 rounded-md text-sm text-white ${isDeleteAction ? 'bg-red-500 hover:bg-red-600' : 'bg-purple-500 hover:bg-purple-600'}`}
                    >
                        Confirm
                    </button>
                </div>

            </motion.div>
        </motion.div>
    );
};

export default ConfirmationModal;
