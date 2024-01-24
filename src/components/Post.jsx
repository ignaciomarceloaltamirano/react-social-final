/* eslint-disable react/prop-types */
import {
  Divider,
  IconButton,
  Link,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
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
import { formatDate } from '../lib/utils';
import UpdatePostModal from './UpdatePostModal';
import Comments from './Comments';
import PostCommentForm from './PostCommentForm';

const Post = ({ post, withComment }) => {
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
  };

  console.log(post);

  return (
    <Stack sx={{ mb: 2, cursor: 'pointer' }} onClick={handleNavigate}>
      <Paper sx={{ p: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={1}>
            <Stack
              direction='column'
              sx={{
                display: 'flex',
                justifyContent: withComment ? '' : 'center',
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
                {withComment ? (
                  <Stack
                    spacing={1}
                    sx={{ display: 'flex', justifyContent: 'center' }}
                  >
                    <Typography variant='h5'> {post?.title}</Typography>
                    <Typography variant='body2'>{post?.content}</Typography>
                  </Stack>
                ) : (
                  <Typography variant='h5'> {post?.title}</Typography>
                )}
                {user?.id === post?.authorId && (
                  <Stack
                    direction='row'
                    spacing={1}
                    sx={{ alignItems: withComment ? '' : 'center' }}
                  >
                    {withComment && <UpdatePostModal />}
                    <IconButton
                      onClick={handleDeletePost}
                      sx={{ borderRadius: '5px' }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                )}
              </Stack>
              {withComment ? (
                post?.imageUrl && <img src={post.imageUrl} />
              ) : (
                <>
                  <Typography variant='body2'>{post?.content}</Typography>
                  {post?.imageUrl && <img src={post.imageUrl} />}
                </>
              )}
              <Stack direction='row' spacing={1}>
                {post?.tags.length > 0 &&
                  post.tags.map((tag, i) => (
                    <Link
                      key={i}
                      to={`/tags/${tag}`}
                      component={RouterLink}
                      sx={{
                        color: theme.palette.text.primary,
                        textDecoration: 'none',
                      }}
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
              <Divider />
              <Stack
                sx={(theme) => ({
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  [theme.breakpoints.down('sm')]: {
                    alignItems: 'start',
                    flexDirection: 'column',
                  },
                })}
              >
                <Stack direction='row'>
                  <Link
                    to={`/communities/${post?.communityName}`}
                    component={RouterLink}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    sx={(theme) => ({
                      textDecoration: 'none',
                      mr: 1,
                      color: theme.palette.text.primary,
                      [theme.breakpoints.down('sm')]: {
                        ml: 1,
                        mr: 0,
                        mb: 1,
                      },
                    })}
                  >
                    <Typography variant='body2'>
                      c/{post?.communityName}
                    </Typography>
                  </Link>
                </Stack>
                <Stack direction='row'>
                  <Typography
                    variant='body2'
                    sx={(theme) => ({
                      [theme.breakpoints.down('sm')]: {
                        ml: 1,
                      },
                    })}
                  >
                    Posted by
                  </Typography>
                  <Link
                    component={RouterLink}
                    to={`/users/${post?.authorName}`}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    sx={{ textDecoration: 'none' }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 600,
                        color: theme.palette.text.primary,
                        mx: 1,
                      }}
                      variant='body2'
                    >
                      {post?.authorName}
                    </Typography>
                  </Link>
                  <Typography variant='body2'>
                    {formatDate(post?.createdAt)}
                  </Typography>
                </Stack>
                <IconButton
                  sx={(theme) => ({
                    ml: 'auto',
                    [theme.breakpoints.down('sm')]: { ml: 0 },
                  })}
                  onClick={handleSavePost}
                >
                  {isPostSaved ? (
                    <InsertDriveFileIcon sx={{ fontSize: '1.3rem' }} />
                  ) : (
                    <InsertDriveFileOutlinedIcon sx={{ fontSize: '1.3rem' }} />
                  )}
                </IconButton>
              </Stack>
              <Divider />
              {withComment && <PostCommentForm postId={post?.id} />}
            </Stack>
            {withComment && <Comments post={post} />}
          </Grid>
        </Grid>
      </Paper>
    </Stack>
  );
};

export default Post;
