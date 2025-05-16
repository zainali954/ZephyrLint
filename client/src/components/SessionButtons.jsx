import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/Slices/authSlice";
import { showConfirmModal } from "../redux/Slices/confirmModalSlice";
import { Delete03Icon, Login02Icon, Login03Icon } from "hugeicons-react";

export default function SessionButtons() {
    const { sessionId } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
  
    const logoutOtherSessions = () => {
      if(sessionId){
          dispatch(
              showConfirmModal({
                isOpen: true,
                title: "Logout Other Sessions?",
                message: "This will log you out from all other devices except this one.",
                action: "logoutOtherSessions",
                payload: sessionId
              })
            );
      }
    };
  
    const deleteAllSessionsHandler = () => {
      dispatch(
        showConfirmModal({
          isOpen: true,
          title: "Remove All Sessions?",
          message:
            "This will delete all your sessions, including this one. You will be logged out from everywhere. ⚠️ Don’t worry — your account and data will remain safe.",
          action: "deleteAllSessions",
        })
      );
    };
  
  return (
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="inline-flex items-center overflow-hidden rounded-xl border border-zinc-300 dark:border-zinc-700 shadow-sm">
            <button
              onClick={() => dispatch(logout())}
              className="cursor-pointer flex gap-1 items-center px-4 py-2 text-sm font-medium border-r border-zinc-300 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-600 dark:text-white transition-colors"
            >
              <Login02Icon size={18}/> Logout Current
            </button>
            <button
              onClick={logoutOtherSessions}
              className="cursor-pointer flex gap-1 items-center px-4 py-2 text-sm font-medium border-r border-zinc-300 dark:border-zinc-700 hover:bg-yellow-100 dark:hover:bg-yellow-900 text-yellow-800 dark:text-yellow-100 transition-colors"
            >
              <Login03Icon size={18}/> Logout Others
            </button>
            <button
              onClick={deleteAllSessionsHandler}
              className="cursor-pointer flex gap-1 items-center px-4 py-2 text-sm font-medium hover:bg-red-100 dark:hover:bg-red-900 text-red-800 dark:text-red-100 transition-colors"
            >
              <Delete03Icon size={18}/> Remove All
            </button>
          </div>
        </div>
      </div>
  );
}
