import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import { Logout01Icon, Menu01Icon, PlusSignIcon, Share06Icon, UserCircle02Icon } from "hugeicons-react";
import ThemeToggler from "./ThemeToggler";
import { logout } from "../redux/Slices/authSlice";
import Button from "./Button";
import { useState } from "react";
import { setCode, setResult, setTitle } from "../redux/Slices/reviewSlice";
import logo from '../assets/favicon.ico'

export default function TopBar({ toggleSidebar, handleShareModal, shareMode = false }) {
  const { user } = useSelector((state) => state.auth);
  const [profileMenu, setProfileMenu] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleNew = () => {
    dispatch(setCode(""))
    dispatch(setResult(""))
    dispatch(setTitle(""))
    navigate("/home")
  }
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="relative w-full bg-zinc-100 dark:bg-neutral-900 border-b border-neutral-300 dark:border-neutral-700 px-4 h-15 flex items-center justify-between top-0 z-10"
    >
      <div className="flex gap-2 items-center">
        {user && !shareMode && (
          <>
            <button
              onClick={toggleSidebar}
              className="cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800 dark:hover:text-neutral-200 text-neutral-700 dark:text-neutral-400 p-2 rounded-lg transition"
            >
              <Menu01Icon size={20} />
            </button>
            <Button onClick={handleNew}><PlusSignIcon size={20} /> New</Button>
          </>
        )}
      </div>

      {/* Centered Logo */}
      <div className="hidden md:block  absolute left-1/2 transform -translate-x-1/2  select-none text-center">
        <Link to="/home" className="text-lg font-semibold dark:text-white text-zinc-800 flex gap-2 items-center">
          <img src={logo} alt="logo"  className="w-9"/>
          ZephyrLint
        </Link>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 md:gap-4">
        <ThemeToggler />
        <button
          onClick={handleShareModal}
          className="   cursor-pointer text-sm py-2 px-3 rounded-lg border dark:border-neutral-600 border-neutral-300 bg-white hover:bg-neutral-100 dark:bg-neutral-800 hover:dark:bg-neutral-700 text-neutral-800 dark:text-neutral-100 flex gap-2 items-center"
        >
          <Share06Icon size={16} />
          <span>Share</span>
        </button>

        {user ? (
          <div className="relative">
            <button
              onClick={() => setProfileMenu((prev) => !prev)}
              className="flex items-center space-x-2 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-700 px-3 py-2 rounded-lg transition border border-transparent hover:border-neutral-300 dark:hover:border-neutral-600 hover:cursor-pointer"
            >
              <UserCircle02Icon size={20} />
              <span className="text-sm font-medium hidden sm:inline">My Account</span>
            </button>

            {profileMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-neutral-200 dark:bg-neutral-700 rounded-lg shadow-lg border border-neutral-300 dark:border-neutral-600 z-10 overflow-hidden">
                <button
                  onClick={() => navigate("/settings")}
                  className="hover:cursor-pointer w-full text-left px-4 py-2 text-sm text-neutral-800 dark:text-neutral-200 hover:bg-neutral-300 dark:hover:bg-neutral-800"
                >
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="hover:cursor-pointer w-full text-left px-4 py-2 text-sm hover:bg-neutral-300 dark:hover:bg-neutral-800 text-red-400"
                >
                  <Logout01Icon size={16} className="inline mr-2 -mt-1" />
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Button onClick={() => navigate("/login")}>
            <UserCircle02Icon size={18} />
            <span className="ml-1">Login</span>
          </Button>
        )}

      </div>
    </motion.header>

  );
}
