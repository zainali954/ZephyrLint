import { useDispatch, useSelector } from "react-redux";
import { getSessions } from "../redux/Slices/authSlice";
import { useEffect } from "react";
import { format } from "date-fns";
import { motion } from "motion/react";
import { getDeviceInfo } from "../utils/parseUserAgent";
import SessionButtons from "../components/SessionButtons";

const SessionsPage = () => {
  const { sessions, sessionId, accessToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (accessToken) {
      dispatch(getSessions());
    }
  }, [accessToken]);


  return (
    <div className="min-h-screen px-0 py-4 md:py-8 text-zinc-900 dark:text-zinc-100 transition-colors">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full md:max-w-4xl mx-auto space-y-8"
      >
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">All Sessions</h1>
        </div>

        <div className="bg-neutral-100 dark:bg-neutral-900 border border-zinc-300 dark:border-zinc-700 rounded-2xl p-6 shadow-lg">
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
            This is a full list of your active and past sessions across all devices. If anything seems off, you can log out from other sessions or remove all.
          </p>

          <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6">
            Note: Each session is automatically removed after 30 days. Don’t worry — your account and data will remain safe.
          </p>

          <ul>
            {sessions.map((session) => {
              const { browserName, browserVersion, osName } = getDeviceInfo(session.userAgent);

              return (
                <li
                  key={session._id}
                  className="py-4 flex justify-between items-start border-b border-zinc-200 dark:border-zinc-700 last:border-none"
                >
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">IP:</span>{" "}
                      {session.ipAddress === "::1" ? "Localhost" : session.ipAddress}
                    </p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      {browserName} {browserVersion} on {osName}
                    </p>
                    <p className="text-xs text-zinc-400 mt-1">
                      Created: {format(new Date(session.createdAt), "PPpp")}
                    </p>
                  </div>
                  <div>
                    <span
                      className={`text-xs md:text-sm font-medium px-2 md:px-3 py-1 rounded-full ${
                        session.isValid ? " bg-green-600 text-white" : "bg-zinc-500 text-white"
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
          <SessionButtons/>

        </div>
      </motion.div>
    </div>
  );
};

export default SessionsPage;
