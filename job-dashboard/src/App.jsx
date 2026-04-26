import { useEffect, useState } from 'react'
import { getSession, onAuthStateChange } from './supabase/auth'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Dashboard from './pages/Dashboard'
import { Toaster } from 'react-hot-toast'
import './App.css'

export default function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [authPage, setAuthPage] = useState(
    window.location.pathname === '/reset-password' ? 'resetPassword' : 'login'
  )

  useEffect(() => {
    const checkSession = async () => {
      try {
        const {
          data: { session },
        } = await getSession()

        setUser(session?.user ?? null)
      } catch (error) {
        console.error('Session check error:', error)
      } finally {
        setLoading(false)
      }
    }

    checkSession()

    // ✅ FIXED AUTH LISTENER (SAFE)
    const { data: listener } = onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      listener?.subscription?.unsubscribe()
    }
  }, [])

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <>
      <Toaster position="top-right" />

      {!user ? (
        <>
          {authPage === 'login' && (
            <Login
              onLoginSuccess={() => {}}
              onNavigateToSignUp={() => setAuthPage('signup')}
              onNavigateToForgotPassword={() => setAuthPage('forgotPassword')}
            />
          )}

          {authPage === 'signup' && (
            <SignUp
              onSignUpSuccess={() => setAuthPage('login')}
              onBackToLogin={() => setAuthPage('login')}
            />
          )}

          {authPage === 'forgotPassword' && (
            <ForgotPassword
              onBackToLogin={() => setAuthPage('login')}
            />
          )}

          {authPage === 'resetPassword' && (
            <ResetPassword
              onResetSuccess={() => setAuthPage('login')}
              onBackToLogin={() => setAuthPage('login')}
            />
          )}
        </>
      ) : (
        <Dashboard onLogout={() => setUser(null)} currentUser={user} />
      )}
    </>
  )
}