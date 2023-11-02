/* eslint-disable react/prop-types */
import { Avatar, IconButton, Stack, Typography } from '@mui/material';
import { formatDateDistance } from '../lib/utils';
import { AccountCircle } from '@mui/icons-material';
import CommentVotes from './CommentVotes';

const Comment = ({ comment, replies, getReplies }) => {
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
        <IconButton sx={{ p: 0 }} size='medium'>
          {comment.authorImageUrl !== null ? (
            <Avatar alt='Avatar' src={comment.authorImageUrl} />
          ) : (
            <AccountCircle />
          )}
        </IconButton>
        <Typography>
          <b>{comment.authorName}</b>
        </Typography>
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
