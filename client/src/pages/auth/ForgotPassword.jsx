import { motion } from "motion/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { forgotPassword } from "../../redux/Slices/authSlice";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch()
  const {isLoading} = useSelector(state => state.auth)

  const handleSubmit = (e) => {
    e.preventDefault();
    if(email){
        dispatch(forgotPassword({email}))
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-900 transition-colors px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-2xl shadow-xl p-8"
      >
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-6 text-center">
          Forgot your password?
        </h2>
        <p className="text-sm text-zinc-400 text-center">
          Enter your email and we’ll send you a link to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              Email address
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="you@example.com"
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.02 }}
            disabled={isLoading}
            type="submit"
            className={`w-full  bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition-all ${isLoading? "cursor-not-allowed" : "cursor-pointer"}`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-1">
                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                Processing...
              </span>
            ) : (
              "Sent reset link"
            )}
          </motion.button>
        </form>

        <div className="text-center text-sm text-zinc-500">
          Remember your password?{" "}
          <Link
            to="/login"
            className="text-indigo-500 hover:underline hover:text-indigo-400"
          >
            Go back to login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
