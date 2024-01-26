/* eslint-disable react/prop-types */
import { Avatar, IconButton, Link, Stack, Typography } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import CommentVotes from './CommentVotes';
import { Link as RouterLink } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { formatDateDistance } from '../lib/utils';

const Comment = ({ comment, replies, getReplies }) => {
  const theme = useTheme();

  return (
    <Stack
      direction='column'
      key={comment.id}
      spacing={1}
      sx={{
        mb: 2,
        p: comment.replyToId ? 2 : 0,
      }}
    >
      <Stack
        direction='row'
        sx={{ display: 'flex', alignItems: 'center' }}
        spacing={1}
      >
        <Link
          to={`/users/${comment?.authorName}`}
          sx={{
            textDecoration: 'none',
            color: theme.palette.text.primary,
          }}
          component={RouterLink}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <IconButton sx={{ p: 0 }} size='medium'>
            {comment.authorImageUrl !== null ? (
              <Avatar
                alt='Avatar'
                src={comment.authorImageUrl}
                sx={{ width: 50, height: 50 }}
              />
            ) : (
              <AccountCircle sx={{ fontSize: '3.125rem' }} />
            )}
          </IconButton>
        </Link>
        <Link
          to={`/users/${comment?.authorName}`}
          sx={{
            textDecoration: 'none',
            color: theme.palette.text.primary,
          }}
          component={RouterLink}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <b>{comment.authorName}</b>
        </Link>
        <Typography variant='caption'>
          {formatDateDistance(comment.createdAt)}
        </Typography>
      </Stack>
      <Typography>{comment.text}</Typography>
      <CommentVotes comment={comment} />
      {replies?.length > 0 &&
        replies.map((reply) => (
          <Comment
            key={reply.id}
            comment={reply}
            replies={getReplies(reply.id)}
            getReplies={getReplies}
          />
        ))}
    </Stack>
  );
};

export default Comment;
