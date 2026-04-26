import { useState, useEffect } from 'react';
import { supabase } from '../supabase/client';
import toast from 'react-hot-toast';
import { validatePassword } from '../utils/validation';
import '../styles/Auth.css';

export default function ResetPassword({ onResetSuccess, onBackToLogin }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isValidLink, setIsValidLink] = useState(false);

  useEffect(() => {
    // Check if user has valid reset session
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setIsValidLink(!!session);
    };

    checkSession();
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(password)) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) {
        toast.error(error.message || 'Failed to reset password');
        setErrors({ general: error.message });
      } else {
        toast.success('Password reset successfully!');
        setTimeout(() => {
          onResetSuccess();
        }, 1500);
      }
    } catch (err) {
      toast.error('An error occurred while resetting password');
      console.error('Reset password error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isValidLink) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <h1>Invalid Reset Link</h1>
          <p className="auth-subtitle">This reset link has expired or is invalid</p>
          <button
            className="btn btn-primary"
            onClick={onBackToLogin}
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Create New Password</h1>
        <p className="auth-subtitle">Enter your new password</p>

        {errors.general && <div className="error-message">{errors.general}</div>}

        <form onSubmit={handleResetPassword}>
          <div className="form-group">
            <label htmlFor="password">New Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors({ ...errors, password: '' });
              }}
              className={errors.password ? 'input-error' : ''}
              placeholder="••••••"
              disabled={loading}
            />
            {errors.password && (
              <span className="error-text">{errors.password}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (errors.confirmPassword)
                  setErrors({ ...errors, confirmPassword: '' });
              }}
              className={errors.confirmPassword ? 'input-error' : ''}
              placeholder="••••••"
              disabled={loading}
            />
            {errors.confirmPassword && (
              <span className="error-text">{errors.confirmPassword}</span>
            )}
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Resetting Password...' : 'Reset Password'}
          </button>
        </form>

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
