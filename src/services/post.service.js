import api from '../services/api';

export const getPost = async (postId) => {
  const { data } = await api.get(`/posts/${postId}`);
  return data;
};

export const createPost = async (formData) => {
  const { data } = await api.post(`/posts/${formData.communityId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

export const getCommunityPosts = async (communityId, page = 1) => {
  const { data } = await api.get(
    `/posts/communities/${communityId}/page/${page}`
  );
  return data;
};

export const getPostsByTag = async (tag, page = 1) => {
  const { data } = await api.get(`/posts/tag/${tag}/page/${page}`);
  return data;
};

export const getUserPosts = async (userId, page = 1) => {
  const { data } = await api.get(`/posts/users/${userId}/page/${page}`);
  return data;
};

export const getUserSavedPosts = async (page = 1) => {
  const { data } = await api.get(`/posts/saved/page/${page}`);
  return data;
};

export const getUserUpVotedPosts = async (userId, page = 1) => {
  const { data } = await api.get(`/posts/upvoted/${userId}/page/${page}`);
  return data;
};

export const getUserDownVotedPosts = async (userId, page = 1) => {
  const { data } = await api.get(`/posts/downvoted/${userId}/page/${page}`);
  return data;
};

export const getSubsribedCommunityPosts = async (page = 1) => {
  const { data } = await api.get(`/posts/subscribed/page/${page}`);
  return data;
};

export const isPostSaved = async (postId) => {
  const { data } = await api.get(`/posts/is-saved/${postId}`);
  return data;
};

export const savePost = async (postId) => {
  const { data } = await api.post(`/posts/save/${postId}`);
  return data;
};

export const unSavePost = async (postId) => {
  const { data } = await api.delete(`/posts/unsave/${postId}`);
  return data;
};

export const deletePost = async (postId) => {
  const { data } = await api.delete(`/posts/${postId}`);
  return data;
};
