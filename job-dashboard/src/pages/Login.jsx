import { useState } from 'react';
import { supabase } from '../supabase/client';
import toast from 'react-hot-toast';
import { validateEmail, validatePassword } from '../utils/validation';
import '../styles/Auth.css';

export default function Login({
  onLoginSuccess,
  onNavigateToSignUp,
  onNavigateToForgotPassword,
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(password)) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message || 'Login failed');
        setErrors({ general: error.message });
      } else {
        toast.success('Login successful!');
        onLoginSuccess();
      }
    } catch (err) {
      toast.error('An error occurred during login');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Admin Dashboard</h1>
        <p className="auth-subtitle">Job Listings Platform</p>

        {errors.general && <div className="error-message">{errors.general}</div>}

        <form onSubmit={handleLogin}>
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
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="auth-links">
          <p>
            Don't have an account?{' '}
            <button
              type="button"
              className="link-button"
              onClick={onNavigateToSignUp}
              disabled={loading}
            >
              Sign up here
            </button>
          </p>
          <p>
            <button
              type="button"
              className="link-button"
              onClick={onNavigateToForgotPassword}
              disabled={loading}
            >
              Forgot your password?
            </button>
          </p>
        </div>

        <p className="auth-footer">
          Test credentials: Use your Supabase auth user
        </p>
      </div>
    </div>
  );
}
