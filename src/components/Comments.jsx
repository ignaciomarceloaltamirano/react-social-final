/* eslint-disable react/prop-types */
import { Stack } from '@mui/material';
import { useGetPostComments } from '../lib/react-query/queries';
import Comment from './Comment';

const Comments = ({ post }) => {
  const { data: comments } = useGetPostComments(post?.id);

  const rootComments = comments?.filter((c) => c?.replyToId === null);

  const getReplies = (commentId) => {
    return comments
      ?.filter((comment) => comment?.replyToId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  };

  return (
    <Stack>
      {rootComments?.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          replies={getReplies(comment.id)}
          getReplies={getReplies}
        />
      ))}
    </Stack>
  );
};

export default Comments;
