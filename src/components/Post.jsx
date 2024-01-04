/* eslint-disable react/prop-types */
import { Divider, IconButton, Paper, Stack, Typography } from '@mui/material';
import { formatDateDistance } from '../lib/utils';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { Grid } from '@mui/material';
import {
  useGetPostVotes,
  useGetCurrentVote,
  useVotePost,
  useSavePost,
  useUnSavePost,
  useIsPostSaved,
  useDeletePost,
} from '../lib/react-query/queries';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DeleteIcon from '@mui/icons-material/Delete';
import { getCurrentUser } from '../services/auth.service';
import toast from 'react-hot-toast';

const Post = ({ post }) => {
  const theme = useTheme();
  const user = getCurrentUser();
  const { data: currentVote } = useGetCurrentVote(post?.id);
  const { data: postVotes } = useGetPostVotes(post?.id);
  const { mutateAsync: votePost } = useVotePost();
  const { mutateAsync: savePost } = useSavePost();
  const { mutateAsync: unSavePost } = useUnSavePost();
  const { mutateAsync: deletePost } = useDeletePost();
  const { data: isPostSaved } = useIsPostSaved(post?.id);
  const navigate = useNavigate();

  const handleVotePost = async (type) => {
    votePost({ postId: post?.id, type });
  };

  const handleNavigate = () => {
    navigate(`/posts/${post?.id}`);
  };

  const handleSavePost = async (e) => {
    e.stopPropagation();
    isPostSaved ? unSavePost(post?.id) : savePost(post?.id);
  };

  const totalVotes =
    postVotes &&
    postVotes?.reduce((a, c) => (c.type === 'UPVOTE' ? a + 1 : a - 1), 0);

  const handleDeletePost = async (e) => {
    e.stopPropagation();
    deletePost(post?.id);
    toast.success('Post deleted');
  };

  return (
    <Stack sx={{ mb: 2, cursor: 'pointer' }} onClick={handleNavigate}>
      <Paper sx={{ p: 2, borderRadius: '5px' }}>
        <Grid container spacing={2}>
          <Grid item xs={1}>
            <Stack
              direction='column'
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
              spacing={1}
            >
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleVotePost('UPVOTE');
                }}
                sx={{
                  color: currentVote?.type === 'UPVOTE' ? 'primary.main' : '',
                }}
              >
                <ArrowUpwardIcon />
              </IconButton>
              {totalVotes && <Typography>{totalVotes}</Typography>}
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleVotePost('DOWNVOTE');
                }}
                sx={{
                  color: currentVote?.type === 'DOWNVOTE' ? 'error.main' : '',
                }}
              >
                <ArrowDownwardIcon />
              </IconButton>
            </Stack>
          </Grid>
          <Grid item xs={11}>
            <Stack spacing={1}>
              <Stack
                direction='row'
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Typography variant='h5'> {post?.title}</Typography>
                {user?.id === post?.authorId && (
                  <Stack direction='row' spacing={1}>
                    <IconButton
                      onClick={handleDeletePost}
                      sx={{ borderRadius: '5px' }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                )}
              </Stack>
              <Typography variant='body2'>{post?.content}</Typography>
              {post?.imageUrl && <img src={post.imageUrl} />}
              <Stack direction='row' spacing={1}>
                {post?.tags.length > 0 &&
                  post.tags.map((tag, i) => (
                    <Link
                      key={i}
                      to={`/tags/${tag}`}
                      className={
                        theme.palette.mode === 'light' ? 'light-mode-link' : ''
                      }
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <Typography variant='caption' sx={{ mr: 1 }}>
                        #{tag}
                      </Typography>
                    </Link>
                  ))}
              </Stack>
              <Divider sx={{ mb: 2 }} />
              <Stack
                direction='row'
                sx={{
                  mt: 2,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Link
                  to={`/communities/${post?.communityName}`}
                  className={
                    theme.palette.mode === 'light' ? 'light-mode-link' : ''
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <Typography variant='body2'>
                    c/{post?.communityName}
                  </Typography>
                </Link>
                <Typography variant='body2' sx={{ mx: 2 }}>
                  Posted by {''}
                  <Link
                    className={
                      theme.palette.mode === 'light' ? 'light-mode-link' : ''
                    }
                    to={`/users/${post?.authorName}`}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <b>{post?.authorName}</b>
                  </Link>
                </Typography>
                <Typography variant='body2'>
                  {formatDateDistance(post?.createdAt)}
                </Typography>
                <IconButton sx={{ ml: 'auto' }} onClick={handleSavePost}>
                  {isPostSaved ? (
                    <InsertDriveFileIcon sx={{ fontSize: '1.3rem' }} />
                  ) : (
                    <InsertDriveFileOutlinedIcon sx={{ fontSize: '1.3rem' }} />
                  )}
                </IconButton>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </Stack>
  );
};

export default Post;
