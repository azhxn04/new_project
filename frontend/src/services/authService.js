import { supabase } from './supabaseClient';

const toUser = (user) => {
  if (!user) return null;

  return {
    id: user.id,
    name: user.user_metadata?.name || user.user_metadata?.full_name || '',
    email: user.email || '',
    businessName: user.user_metadata?.business_name || 'New Enterprise',
    role: user.user_metadata?.role || 'entrepreneur',
  };
};

const throwIfError = (error) => {
  if (error) throw error;
};

export const authService = {
  async login({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    throwIfError(error);

    return {
      user: toUser(data.user),
      token: data.session?.access_token,
      isMock: false,
    };
  },

  async register({ name, email, password, businessName }) {
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          name: name.trim(),
          business_name: businessName?.trim() || 'New Enterprise',
          role: 'entrepreneur',
        },
      },
    });

    throwIfError(error);

    if (!data.session) {
      throw new Error('Account created. Check your email to confirm your account before signing in.');
    }

    return {
      user: toUser(data.user),
      token: data.session.access_token,
      isMock: false,
    };
  },

  async getCurrentUser() {
    const { data, error } = await supabase.auth.getSession();
    throwIfError(error);
    return toUser(data.session?.user);
  },

  async logout() {
    const { error } = await supabase.auth.signOut();
    throwIfError(error);
  },

  toUser,
};
