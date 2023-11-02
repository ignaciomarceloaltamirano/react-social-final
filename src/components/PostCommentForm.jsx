/* eslint-disable react/prop-types */
import { Button, FormLabel, Stack, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useCreateComment, useUpdateComment } from '../lib/react-query/queries';

const PostCommentForm = ({
  postId,
  replyToId,
  setIsReplying,
  setIsUpdating,
  updating,
  comment,
}) => {
  const { control, handleSubmit, reset } = useForm();
  const { mutate: createComment } = useCreateComment();
  const { mutateAsync: updateComment } = useUpdateComment();

  const onSubmit = (data) => {
    if (updating) {
      updateComment({ commentId: comment?.id, text: data.text });
      setIsReplying(false);
      setIsUpdating(false);
    } else {
      createComment({ postId, text: data.text, replyToId });
      if (replyToId) setIsReplying(false);
    }
    reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack sx={{ mt: 2, display: 'flex' }} spacing={2}>
          <FormLabel>
            {updating ? 'Edit comment' : replyToId ? 'Reply' : 'Your comment'}
          </FormLabel>
          <Controller
            name='text'
            control={control}
            defaultValue={updating ? comment?.text : ''}
            render={({ field }) => (
              <TextField
                {...field}
                label='What are your thoughts?'
                multiline
                minRows={3}
                maxRows={6}
                fullWidth
              />
            )}
          />
          <Button sx={{ alignSelf: 'end' }} type='submit' variant='contained'>
            Submit
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default PostCommentForm;
