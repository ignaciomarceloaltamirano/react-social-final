import api from '../services/api';

export const getCurrentCommentVote = async (commentId) => {
  const { data } = await api.get(`/commentvotes/user/${commentId}`);
  return data;
};

export const getCommentVotes = async (commentId) => {
  const { data } = await api.get(`/commentvotes/comment/${commentId}`);
  return data;
};

export const voteComment = async ({ commentId, type }) => {
  const { data } = await api.put(`/commentvotes/${commentId}`, type);
  return data;
};
