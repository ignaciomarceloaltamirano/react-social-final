import api from './api';
import { getUser, removeUser, setUser } from './token.service';

export const login = async (user) => {
  const { data } = await api.post('/auth/login', user);

  if (data.accessToken) {
    setUser(data);
  }
  return data;
};

export const logout = () => {
  removeUser();
};

export const registerUser = async (user) => {
  return await api.post('/auth/register', user, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const registerMod = async (mod) => {
  return await api.post('/auth/register-mod', mod, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const registerAdmin = async (admin) => {
  return await api.post('/auth/register-admin', admin, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getCurrentUser = () => {
  return getUser();
};
