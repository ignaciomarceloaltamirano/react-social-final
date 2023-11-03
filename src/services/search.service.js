import api from './api';

export const searchPosts = async (query, page = 1) => {
  const { data } = await api.get(`/search/page/${page}?query=${query}`);
  return data;
};
