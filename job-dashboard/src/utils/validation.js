export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password && password.length >= 6;
};

export const validateJobForm = (formData) => {
  const errors = {};

  if (!formData.title?.trim()) {
    errors.title = 'Job title is required';
  }

  if (!formData.salary) {
    errors.salary = 'Salary is required';
  } else if (formData.salary <= 0) {
    errors.salary = 'Salary must be greater than 0';
  }

  if (!formData.location?.trim()) {
    errors.location = 'Location is required';
  }

  return errors;
};
