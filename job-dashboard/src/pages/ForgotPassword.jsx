import { useState } from 'react';
import { supabase } from '../supabase/client';
import toast from 'react-hot-toast';
import { validateEmail } from '../utils/validation';
import '../styles/Auth.css';

export default function ForgotPassword({ onBackToLogin }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        toast.error(error.message || 'Failed to send reset email');
        setErrors({ general: error.message });
      } else {
        toast.success('Password reset link sent to your email!');
        setSubmitted(true);
        setTimeout(() => {
          onBackToLogin();
        }, 3000);
      }
    } catch (err) {
      toast.error('An error occurred. Please try again.');
      console.error('Password reset error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Reset Password</h1>
        <p className="auth-subtitle">Enter your email to receive a reset link</p>

        {submitted ? (
          <div className="success-message">
            <p>
              ✓ Password reset link has been sent to <strong>{email}</strong>
            </p>
            <p className="small-text">
              Check your email and follow the link to reset your password.
            </p>
            <p className="small-text">Redirecting to login...</p>
          </div>
        ) : (
          <>
            {errors.general && (
              <div className="error-message">{errors.general}</div>
            )}

            <form onSubmit={handleResetPassword}>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: '' });
                  }}
                  className={errors.email ? 'input-error' : ''}
                  placeholder="admin@example.com"
                  disabled={loading}
                />
                {errors.email && (
                  <span className="error-text">{errors.email}</span>
                )}
              </div>

              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Sending Reset Link...' : 'Send Reset Link'}
              </button>
            </form>
          </>
        )}

        <div className="auth-links">
          <p>
            <button
              type="button"
              className="link-button"
              onClick={onBackToLogin}
              disabled={loading}
            >
              Back to Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
