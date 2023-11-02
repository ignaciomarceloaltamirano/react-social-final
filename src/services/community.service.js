import api from '../services/api';

export const getCommunity = async (communityName) => {
  const res = await api.get(`/communities/${communityName}`);
  return res.data;
};

export const getCommunities = async () => {
  const res = await api.get(`/communities`);
  return res.data;
};

export const createCommunity = async (community) => {
  const res = await api.post(`/communities`, community);
  return res.data;
};

export const updateCommunity = async ({ communityId, name }) => {
  const res = await api.put(`/communities/${communityId}`, name);
  return res.data;
};

export const deleteCommunity = async (communityId) => {
  const res = await api.delete(`/communities/${communityId}`);
  return res.data;
};
