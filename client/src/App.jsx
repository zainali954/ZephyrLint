import { useEffect, useState } from 'react'
// import './App.css'
import LoginPage from './pages/auth/LoginPage'
import { Route, Routes, useNavigate } from 'react-router-dom'
import SignupPage from './pages/auth/SignupPage'
import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import { clearNotification } from './redux/Slices/notificationSlice'
import HomePage from './pages/HomePage'
import ProtectedRoute from './services/ProtectedRoute'
import VerifyEmailPage from './pages/auth/VerifyEmailPage'
import VerifyNowPage from './pages/auth/VerifyMeNowPage'
import Loader from './components/Loader'
import { refreshAccessToken } from './redux/Slices/authSlice'
import { setNavigate } from './utils/NavigationService'
import ForgotPasswordPage from './pages/auth/ForgotPassword'
import ResetPasswordPage from './pages/auth/ResetPassword'
import GoogleCallback from './pages/auth/GoogleCallback'
import { AnimatePresence } from 'motion/react'
import ConfirmationModal from './components/ConfirmationModal'
import SessionsPage from './pages/SessionsPage'
import Layout from './components/layout'
import Settings from './pages/SettingsPage'
import SharePage from './pages/SharePage'
import LandingPage from './pages/LandingPage'

function App() {
  const { user, accessToken } = useSelector(state => state.auth)
  const { error, message } = useSelector(state => state.notification)
  const { isOpen } = useSelector((state) => state.confirmModal);

  const isLoading = useSelector(state=> state.auth.isLoading || state.user.isLoading)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isDark, setIsDark] = useState("")

  useEffect(() => {
    if (message) {
      toast.success(message)
    }
    if (error) {
      toast.error(error)
    }
    setTimeout(() => {
      dispatch(clearNotification())
    }, 3000);
  }, [error, message, dispatch])

  useEffect(() => {
    if (user && !accessToken) {
      dispatch(refreshAccessToken());
    }
  }, [user]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    setNavigate(navigate)
  }, [navigate])

  return (

    <>
      <AnimatePresence>
        {isOpen && <ConfirmationModal />}
      </AnimatePresence>
      {/* {isLoading && <Loader />} */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={isDark ? "dark" : "light"}
      />

      <Routes>
        <Route index element={<LandingPage/>} />
        <Route path={'/login'} element={<LoginPage />} />
        <Route path={'/forgot-password'} element={<ForgotPasswordPage />} />
        <Route path={'/reset-password'} element={<ResetPasswordPage />} />
        <Route path={'/signup'} element={<SignupPage />} />
        <Route path={'/auth/google/callback'} element={<GoogleCallback />} />
        <Route path={'/verify-email'} element={<VerifyEmailPage />} />
        <Route path={'/verify'} element={<VerifyNowPage />} />
        <Route path={'/view/:id'} element={<SharePage />} />

        <Route path={'/home'} element={
          <ProtectedRoute>
              <HomePage />
          </ProtectedRoute>
        } />
        <Route path={'/sessions'} element={
          <ProtectedRoute>
            <Layout>
              <SessionsPage />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path={'/settings'} element={
          <ProtectedRoute>
            <Layout>
              <Settings />
            </Layout>
          </ProtectedRoute>
        } />
      </Routes>
    </>
  )
}

export default App
