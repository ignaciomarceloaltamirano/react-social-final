import api from './api';

export const getPostComments = async (postId) => {
  if (postId) {
    const { data } = await api.get(`/comments/post/${postId}`);
    return data;
  }
};

export const createComment = async ({ postId, text, replyToId }) => {
  const { data } = await api.post(`/comments/${postId}`, { text, replyToId });
  return data;
};

export const updateComment = async ({ commentId, text }) => {
  const { data } = await api.put(`/comments/${commentId}`, text);
  return data;
};

export const deleteComment = async (commentId) => {
  const { data } = await api.delete(`/comments/${commentId}`);
  return data;
};
