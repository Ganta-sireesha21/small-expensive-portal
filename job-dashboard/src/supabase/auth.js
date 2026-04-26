import { supabase } from './client';

const redirectUrl = `${window.location.origin}/login`;
const resetPasswordRedirectUrl = `${window.location.origin}/reset-password`;

// 🔐 SIGN IN
export const signIn = async ({ email, password }) => {
  return await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  });
};

// 📝 SIGN UP
export const signUp = async ({ email, password }) => {
  return await supabase.auth.signUp({
    email: email.trim(),
    password,
    options: {
      emailRedirectTo: redirectUrl,
    },
  });
};

// 🚪 LOGOUT
export const signOut = async () => {
  return await supabase.auth.signOut();
};

// 🔄 FORGOT PASSWORD
export const sendPasswordResetEmail = async (email) => {
  return await supabase.auth.resetPasswordForEmail(email.trim(), {
    redirectTo: resetPasswordRedirectUrl,
  });
};

// 🔑 UPDATE PASSWORD
export const updatePassword = async (password) => {
  return await supabase.auth.updateUser({ password });
};

// 📦 GET SESSION
export const getSession = async () => {
  return await supabase.auth.getSession();
};

// 🔁 AUTH STATE CHANGE (FIXED)
export const onAuthStateChange = (callback) => {
  return supabase.auth.onAuthStateChange(callback);
};