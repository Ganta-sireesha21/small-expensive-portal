import { useState } from 'react';
import { signUp } from '../supabase/auth.js';
import toast from 'react-hot-toast';
import { validateEmail, validatePassword } from '../utils/validation';
import '../styles/Auth.css';

export default function SignUp({ onSignUpSuccess, onBackToLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(trimmedEmail)) {
      newErrors.email = 'Please enter a valid email';
    }

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

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const trimmedEmail = email.trim().toLowerCase();

      const { data, error } = await signUp({
        email: trimmedEmail,
        password,
      });

      if (error) {
        console.log("SIGNUP ERROR:", error);
        toast.error(error.message || 'Sign up failed');
        setErrors({ general: error.message });
      } else {
        console.log("SIGNUP SUCCESS:", data);
        toast.success('Account created successfully!');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setTimeout(() => {
          onSignUpSuccess?.();
        }, 1500);
      }
    } catch (err) {
      console.error('Sign up error:', err);
      toast.error('An error occurred during sign up');
      setErrors({ general: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Create Account</h1>
        <p className="auth-subtitle">Job Dashboard Admin</p>

        {errors.general && <div className="error-message">{errors.general}</div>}

        <form onSubmit={handleSignUp}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
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
              autoComplete="email"
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
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
              autoComplete="new-password"
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
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
              autoComplete="new-password"
            />
            {errors.confirmPassword && (
              <span className="error-text">{errors.confirmPassword}</span>
            )}
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className="auth-links">
          <p>
            Already have an account?{' '}
            <button
              type="button"
              className="link-button"
              onClick={onBackToLogin}
              disabled={loading}
            >
              Login here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}