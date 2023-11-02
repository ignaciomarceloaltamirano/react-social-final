/* eslint-disable react/prop-types */
import { Divider, IconButton, Paper, Stack, Typography } from '@mui/material';
import { formatDateDistance } from '../lib/utils';
import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Grid } from '@mui/material';
import {
  useGetPostVotes,
  useGetCurrentVote,
  useVotePost,
  useSavePost,
  useUnSavePost,
  useIsPostSaved,
} from '../lib/react-query/queries';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PostCommentForm from './PostCommentForm';
import Comments from './Comments';

const PostWithComment = ({ post }) => {
  const theme = useTheme();
  const { data: currentVote } = useGetCurrentVote(post?.id);
  const { data: postVotes } = useGetPostVotes(post?.id);
  const { mutateAsync: votePost } = useVotePost();
  const { mutateAsync: savePost } = useSavePost();
  const { mutateAsync: unSavePost } = useUnSavePost();
  const { data: isPostSaved } = useIsPostSaved(post?.id);

  const handleVotePost = async (type) => {
    votePost({ postId: post?.id, type });
  };

  const handleSavePost = async () => {
    isPostSaved ? unSavePost(post?.id) : savePost(post?.id);
  };

  const totalVotes = postVotes?.reduce(
    (a, c) => (c.type === 'UPVOTE' ? a + 1 : a - 1),
    0
  );

  return (
    <Stack sx={{ mb: 2 }}>
      <Paper sx={{ p: 2, borderRadius: '5px' }}>
        <Grid container spacing={2}>
          <Grid item xs={1}>
            <Stack
              direction='column'
              sx={{
                display: 'flex',
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
              <Typography>{totalVotes}</Typography>
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
              <Typography variant='h5'> {post?.title}</Typography>
              <Typography variant='body2'>{post?.content}</Typography>
              {post?.imageUrl && <img src={post.imageUrl} />}
              <Stack direction='row' spacing={2}>
                {post?.tags.length > 0 &&
                  post.tags.map((tag, i) => (
                    <Typography key={i} variant='caption' sx={{ mr: 1 }}>
                      #{tag}
                    </Typography>
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
              <Divider />
              <PostCommentForm postId={post?.id} />
            </Stack>
            <Comments post={post} />
          </Grid>
        </Grid>
      </Paper>
    </Stack>
  );
};

export default PostWithComment;
