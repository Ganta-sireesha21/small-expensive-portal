import { useState, useEffect } from 'react';
import { validateJobForm } from '../utils/validation';
import '../styles/JobForm.css';

export default function JobForm({ onSubmit, onCancel, initialData = null, loading = false }) {
  const [formData, setFormData] = useState({
    title: '',
    salary: '',
    location: '',
  });
  const [errors, setErrors] = useState({});

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        salary: initialData.salary || '',
        location: initialData.location || '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'salary' ? (value === '' ? '' : Number(value)) : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateJobForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit(formData);
  };

  return (
    <form className="job-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Job Title</label>
        <input
          id="title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g., Senior Developer"
          className={errors.title ? 'input-error' : ''}
          disabled={loading}
        />
        {errors.title && <span className="error-text">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="salary">Salary ($)</label>
        <input
          id="salary"
          type="number"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          placeholder="e.g., 100000"
          className={errors.salary ? 'input-error' : ''}
          disabled={loading}
          min="0"
          step="1000"
        />
        {errors.salary && <span className="error-text">{errors.salary}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="location">Location</label>
        <input
          id="location"
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="e.g., New York, NY"
          className={errors.location ? 'input-error' : ''}
          disabled={loading}
        />
        {errors.location && <span className="error-text">{errors.location}</span>}
      </div>

      <div className="form-actions">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Saving...' : initialData ? 'Update Job' : 'Add Job'}
        </button>
      </div>
    </form>
  );
}
