/* eslint-disable react/prop-types */
import { IconButton, Stack, Typography } from '@mui/material';
import {
  useDeleteComment,
  useGetCommentVotes,
  useGetCurrentCommentVote,
  useVoteComment,
} from '../lib/react-query/queries';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { useState } from 'react';
import PostCommentForm from './PostCommentForm';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getCurrentUser } from '../services/auth.service';

const CommentVotes = ({ comment }) => {
  const user = getCurrentUser();
  const [isReplying, setIsReplying] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const { data: currentVote } = useGetCurrentCommentVote(comment?.id);
  const { data: commentVotes } = useGetCommentVotes(comment?.id);
  const { mutateAsync: voteComment } = useVoteComment();
  const { mutateAsync: deleteComment } = useDeleteComment();

  const handleVoteComment = async (type) => {
    voteComment({ commentId: comment?.id, type });
  };

  const handleDeleteComment = async () => {
    deleteComment(comment?.id);
  };

  const totalVotes = commentVotes?.reduce(
    (a, c) => (c.type === 'UPVOTE' ? a + 1 : a - 1),
    0
  );

  return (
    <>
      <Stack
        direction='row'
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: '100%',
        }}
        spacing={1}
      >
        <IconButton
          onClick={() => {
            handleVoteComment('UPVOTE');
          }}
          sx={{
            color: currentVote?.type === 'UPVOTE' ? 'primary.main' : '',
          }}
        >
          <ArrowUpwardIcon />
        </IconButton>
        <Typography>{totalVotes}</Typography>
        <IconButton
          onClick={() => {
            handleVoteComment('DOWNVOTE');
          }}
          sx={{
            color: currentVote?.type === 'DOWNVOTE' ? 'error.main' : '',
          }}
        >
          <ArrowDownwardIcon />
        </IconButton>
        <IconButton
          sx={{ borderRadius: '0px' }}
          onClick={() => {
            setIsReplying((prevState) => !prevState);
            setIsUpdating(false);
          }}
        >
          <ChatBubbleOutlineOutlinedIcon />
          <Typography variant='body2' sx={{ ml: 1 }}>
            Reply
          </Typography>
        </IconButton>
        {user?.id === comment.authorId && (
          <IconButton
            onClick={() => {
              setIsUpdating((prevState) => !prevState);
              setIsReplying(false);
            }}
          >
            <EditIcon />
          </IconButton>
        )}
        {user?.id === comment.authorId && (
          <IconButton onClick={handleDeleteComment}>
            <DeleteIcon />
          </IconButton>
        )}
      </Stack>
      {isReplying ? (
        <PostCommentForm
          postId={comment?.postId}
          replyToId={comment?.id}
          setIsReplying={setIsReplying}
        />
      ) : isUpdating ? (
        <PostCommentForm
          postId={comment?.postId}
          replyToId={comment?.id}
          setIsReplying={setIsReplying}
          setIsUpdating={setIsUpdating}
          updating
          comment={comment}
        />
      ) : null}
    </>
  );
};

export default CommentVotes;
