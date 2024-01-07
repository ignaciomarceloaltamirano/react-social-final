import toast from 'react-hot-toast';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  getCurrentUser,
  login,
  registerUser,
} from '../../services/auth.service';
import {
  createCommunity,
  deleteCommunity,
  getCommunities,
  getCommunity,
  updateCommunity,
} from '../../services/community.service';
import { useNavigate } from 'react-router-dom';
import {
  getCommunityMembersCount,
  getSubscription,
  subscribeToCommunity,
  unSubscribeFromCommunity,
} from '../../services/subscription.service';
import {
  createPost,
  deletePost,
  getCommunityPosts,
  getPost,
  getPostsByTag,
  getSubsribedCommunityPosts,
  getUserDownVotedPosts,
  getUserPosts,
  getUserSavedPosts,
  getUserUpVotedPosts,
  isPostSaved,
  savePost,
  unSavePost,
  updatePost,
} from '../../services/post.service';
import { getTags } from '../../services/tag.service';
import {
  getCurrentVote,
  getPostVotes,
  votePost,
} from '../../services/vote.service';
import {
  createComment,
  deleteComment,
  getPostComments,
  updateComment,
} from '../../services/comment.service';
import {
  getCommentVotes,
  getCurrentCommentVote,
  voteComment,
} from '../../services/comment-vote.service';
import {
  getUser,
  getUsers,
  updatePassword,
  updateUser,
} from '../../services/user.service';
import { searchPosts } from '../../services/search.service';

/* ***** USERS ***** */
export const useLogIn = () => {
  return useMutation({
    mutationFn: (user) => login(user),
    onError: (res) => {
      if (res.response.status === 401) {
        toast.error('Bad credentials.');
      }
    },
  });
};

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: (user) => registerUser(user),
    onSuccess: (res) => {
      toast.success(res.data.message);
    },
    onError: (error) => {
      if (error.response.status === 409) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.response.data.error);
      }
    },
  });
};

export const useGetUser = (username) => {
  return useQuery({
    queryKey: ['users', username],
    queryFn: () => getUser(username),
    enabled: !!username,
  });
};

export const useGetUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers(),
  });
};

export const useUpdateUser = () => {
  const user = getCurrentUser();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => updateUser(data),
    onSuccess: (res) => {
      const updatedUser = {
        ...user,
        username: res.username,
        imageUrl: res.imageUrl,
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      toast.success('User updated.');
      queryClient.invalidateQueries('users');
      navigate(`/users/${res.username}`);
    },
    onError: (error) => {
      console.log(error);
      if (error.status === 400) {
        toast.error(error.message);
      } else if (error.response.status === 401) {
        toast.error('Name or email already taken.');
      } else {
        toast.error(error.response.data.message);
      }
    },
  });
};

export const useUpdatePassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => updatePassword(data),
    onSuccess: () => {
      toast.success('Password updated.');
      queryClient.invalidateQueries('users');
    },
    onError: (error) => {
      if (error.status === 400) {
        toast.error(error.message);
      } else {
        toast.error(error.response.data.message);
      }
    },
  });
};

/* ***** COMMUNITIES ***** */
export const useGetCommunity = (communityName) => {
  return useQuery({
    queryKey: ['community', communityName],
    queryFn: () => getCommunity(communityName),
    enabled: !!communityName,
  });
};

export const useGetCommunities = () => {
  return useQuery({
    queryKey: ['communities'],
    queryFn: () => getCommunities(),
  });
};

export const useCreateCommunity = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (community) => createCommunity(community),
    onSuccess: (res) => {
      toast.success(`Community "${res.name}" created.`);
      navigate(`/communities/${res.name}`);
    },
    onError: (error) => {
      console.log(error);
      if (error.response.status === 409) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.response.data.error);
      }
    },
  });
};

export const useUpdateCommunity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (communityId) => updateCommunity(communityId),
    onSuccess: () => {
      toast.success('Community updated');
      queryClient.invalidateQueries('community');
      queryClient.invalidateQueries('communities');
    },
    onError: (error) => {
      if (error.status === 400) {
        toast.error(error.message);
      } else {
        toast.error(error.response.data.message);
      }
    },
  });
};

export const useDeleteCommunity = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (communityId) => deleteCommunity(communityId),
    onSuccess: () => {
      toast.success('Community deleted');
      queryClient.invalidateQueries('communities');
      navigate('/');
    },
    onError: (error) => {
      if (error.status === 400) {
        toast.error(error.message);
      } else {
        toast.error(error.response.data.message);
      }
    },
  });
};

/* ***** SUBSCRIPTIONS ***** */
export const useGetCommunityMembersCount = (communityId) => {
  return useQuery({
    queryKey: ['members-count', communityId],
    queryFn: () => getCommunityMembersCount(communityId),
    enabled: !!communityId,
  });
};

export const useGetSubscription = (communityId) => {
  return useQuery({
    queryKey: ['subscription', communityId],
    queryFn: () => getSubscription(communityId),
    enabled: !!communityId,
  });
};

export const useSubscribe = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (communityId) => subscribeToCommunity(communityId),
    onSuccess: (res) => {
      queryClient.invalidateQueries(['subscription', res.id]);
    },
    onError: (error) => {
      console.log(error);
      if (error.response.status === 409) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.response.data.error);
      }
    },
  });
};

export const useUnSubscribe = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (communityId) => unSubscribeFromCommunity(communityId),
    onSuccess: (res) => {
      queryClient.invalidateQueries(['subscription', res.id]);
    },
    onError: (error) => {
      console.log(error);
      if (error.response.status === 409) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.response.data.error);
      }
    },
  });
};

/* ***** POSTS ***** */
export const useGetPost = (postId) => {
  return useQuery({
    queryKey: ['post', postId],
    queryFn: () => getPost(postId),
    enabled: !!postId,
  });
};

export const useGetCommunityPosts = (community) => {
  return useInfiniteQuery({
    queryKey: ['community-posts'],
    queryFn: ({ pageParam = 1 }) => getCommunityPosts(community.id, pageParam),
    getNextPageParam: (lastPage) => {
      const { totalPages, currentPage } = lastPage;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    enabled: !!community,
  });
};

export const useGetPostsByTag = (tag) => {
  return useInfiniteQuery({
    queryKey: ['tag-posts'],
    queryFn: ({ pageParam = 1 }) => getPostsByTag(tag, pageParam),
    getNextPageParam: (lastPage) => {
      const { totalPages, currentPage } = lastPage;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    enabled: !!tag,
  });
};

export const useGetSubscribedCommunityPosts = () => {
  return useInfiniteQuery({
    queryKey: ['subsribed-communities-posts'],
    queryFn: ({ pageParam = 1 }) => getSubsribedCommunityPosts(pageParam),
    getNextPageParam: (lastPage) => {
      const { totalPages, currentPage } = lastPage;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });
};

export const useGetUserPosts = (userId) => {
  return useInfiniteQuery({
    queryKey: ['user-posts', userId],
    queryFn: ({ pageParam = 1 }) => getUserPosts(userId, pageParam),
    getNextPageParam: (lastPage) => {
      const { totalPages, currentPage } = lastPage;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    enabled: !!userId,
  });
};

export const useGetUserSavedPosts = () => {
  return useInfiniteQuery({
    queryKey: ['user-saved-posts'],
    queryFn: ({ pageParam = 1 }) => getUserSavedPosts(pageParam),
    getNextPageParam: (lastPage) => {
      const { totalPages, currentPage } = lastPage;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });
};

export const useGetUserUpVotedPosts = (userId) => {
  return useInfiniteQuery({
    queryKey: ['user-upvoted-posts', userId],
    queryFn: ({ pageParam = 1 }) => getUserUpVotedPosts(userId, pageParam),
    getNextPageParam: (lastPage) => {
      const { totalPages, currentPage } = lastPage;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    enabled: !!userId,
  });
};

export const useGetUserDownVotedPosts = (userId) => {
  return useInfiniteQuery({
    queryKey: ['user-downvoted-posts', userId],
    queryFn: ({ pageParam = 1 }) => getUserDownVotedPosts(userId, pageParam),
    getNextPageParam: (lastPage) => {
      const { totalPages, currentPage } = lastPage;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    enabled: !!userId,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData) => createPost(formData),
    onSuccess: () => {
      toast.success('Post created');
      queryClient.invalidateQueries('posts');
    },
    onError: (error) => {
      console.log(error);
      if (error.status === 400) {
        toast.error(error.message);
      } else {
        toast.error(error.response.data.message);
      }
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData) => updatePost(formData),
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
    },
    onError: (error) => {
      console.log(error);
      if (error.status === 400) {
        toast.error(error.message);
      } else {
        toast.error(error.response.data.message);
      }
    },
  });
};

export const useIsPostSaved = (postId) => {
  return useQuery({
    queryKey: ['post', postId],
    queryFn: () => isPostSaved(postId),
    enabled: !!postId,
  });
};

export const useSavePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId) => savePost(postId),
    onSuccess: (res, postId) => {
      queryClient.invalidateQueries(['post', postId]);
      toast.success('Post saved');
    },
    onError: (error) => {
      if (error.status === 400) {
        toast.error(error.message);
      } else {
        toast.error(error.response.data.message);
      }
    },
  });
};

export const useUnSavePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId) => unSavePost(postId),
    onSuccess: (res, postId) => {
      queryClient.invalidateQueries(['post', postId]);
      toast.success('Post unsaved');
    },
    onError: (error) => {
      if (error.status === 400) {
        toast.error(error.message);
      } else {
        toast.error(error.response.data.message);
      }
    },
  });
};

export const useDeletePost = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId) => deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
      toast.success('Post deleted');
      navigate('/');
    },
    onError: (error) => {
      if (error.status === 400) {
        toast.error(error.message);
      } else {
        toast.error(error.response.data.message);
      }
    },
  });
};

/* ***** TAGS ***** */
export const useGetTags = () => {
  return useQuery({
    queryKey: ['tags'],
    queryFn: () => getTags(),
  });
};

/* ***** VOTES ***** */
export const useGetCurrentVote = (postId) => {
  return useQuery({
    queryKey: ['current-vote', postId],
    queryFn: () => getCurrentVote(postId),
    enabled: !!postId,
  });
};

export const useGetPostVotes = (postId) => {
  return useQuery({
    queryKey: ['post-votes', postId],
    queryFn: () => getPostVotes(postId),
    enabled: !!postId,
  });
};

export const useVotePost = (type) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId) => votePost(postId, type),
    onSuccess: (postId) => {
      queryClient.invalidateQueries(['current-vote', postId]);
      queryClient.invalidateQueries(['post-votes', postId]);
    },
    onError: (error) => {
      if (error.status === 400) {
        toast.error(error.message);
      } else {
        toast.error(error.response.data.message);
      }
    },
  });
};

/* ***** COMMENTS ***** */
export const useGetPostComments = (postId) => {
  return useQuery({
    queryKey: ['post-comments', postId],
    queryFn: () => getPostComments(postId),
    enabled: !!postId,
  });
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId, text, replyToId) =>
      createComment(postId, text, replyToId),
    onSuccess: (postId) => {
      toast.success('Comment created.');
      queryClient.invalidateQueries(['post', postId]);
    },
    onError: (error) => {
      if (error.status === 400) {
        toast.error(error.message);
      } else {
        toast.error(error.response.data.message);
      }
    },
  });
};

export const useUpdateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId) => updateComment(commentId),
    onSuccess: () => {
      toast.success('Comment updated.');
      queryClient.invalidateQueries('post-comments');
    },
    onError: (error) => {
      if (error.status === 400) {
        toast.error(error.message);
      } else {
        toast.error(error.response.data.message);
      }
    },
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId) => deleteComment(commentId),
    onSuccess: () => {
      toast.success('Comment deleted.');
      queryClient.invalidateQueries(['current-comment-vote']);
      queryClient.invalidateQueries(['comment-votes']);
    },
    onError: (error) => {
      if (error.status === 400) {
        toast.error(error.message);
      } else {
        toast.error(error.response.data.message);
      }
    },
  });
};

/* ***** COMMENT VOTES ***** */
export const useGetCurrentCommentVote = (commentId) => {
  return useQuery({
    queryKey: ['current-comment-vote', commentId],
    queryFn: () => {
      if (commentId) {
        return getCurrentCommentVote(commentId);
      }
      return null;
    },
    enabled: !!commentId,
  });
};

export const useGetCommentVotes = (commentId) => {
  return useQuery({
    queryKey: ['comment-votes', commentId],
    queryFn: () => {
      if (commentId) {
        return getCommentVotes(commentId);
      }
      return null;
    },
    enabled: !!commentId,
  });
};

export const useVoteComment = (type) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId) => voteComment(commentId, type),
    onSuccess: (commentId) => {
      queryClient.invalidateQueries('current-comment-vote', commentId);
      queryClient.invalidateQueries('comment-votes', commentId);
    },
    onError: (error) => {
      if (error.status === 400) {
        toast.error(error.message);
      } else {
        toast.error(error.response.data.message);
      }
    },
  });
};

/* ***** SEARCH ***** */
export const useSearchPosts = (query) => {
  return useInfiniteQuery({
    queryKey: ['search-posts', query],
    queryFn: ({ pageParam = 1 }) => searchPosts(query, pageParam),
    getNextPageParam: (lastPage) => {
      const { totalPages, currentPage } = lastPage;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    enabled: !!query,
  });
};
