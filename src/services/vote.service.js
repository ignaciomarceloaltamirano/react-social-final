import api from './api';

export const getCurrentVote = async (postId) => {
  const { data } = await api.get(`/votes/user/${postId}`);
  return data;
};

export const getPostVotes = async (postId) => {
  const { data } = await api.get(`/votes/post/${postId}`);
  return data;
};

export const votePost = async ({ postId, type }) => {
  const { data } = await api.put(`/votes/${postId}`, type);
  return data;
};
