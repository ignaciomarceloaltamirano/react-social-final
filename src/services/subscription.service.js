import api from '../services/api';

export const getCommunityMembersCount = async (communityId) => {
  const { data } = await api.get(`/subscriptions/${communityId}/count`);
  return data;
};

export const getSubscription = async (communityId) => {
  const { data } = await api.get(`/subscriptions/${communityId}`);
  return data;
};

export const subscribeToCommunity = async (communityId) => {
  const { data } = await api.post(`/subscriptions/subscribe/${communityId}`);
  return data;
};

export const unSubscribeFromCommunity = async (communityId) => {
  const { data } = await api.delete(
    `/subscriptions/unsubscribe/${communityId}`
  );
  return data;
};
