/* eslint-disable react/prop-types */
import { Button, FormLabel, Stack, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useCreateComment, useUpdateComment } from '../lib/react-query/queries';
import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { commentSchema } from '../lib/zod/validations';
import { useTheme } from '@emotion/react';

const PostCommentForm = ({
  postId,
  replyToId,
  setIsReplying,
  setIsUpdating,
  updating,
  comment,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ resolver: zodResolver(commentSchema) });
  const { mutateAsync: createComment, isPending: isPendingCreate } =
    useCreateComment();
  const { mutateAsync: updateComment, isPending: isPendingUpdate } =
    useUpdateComment();
  const theme = useTheme();

  useEffect(() => {
    if (updating && comment) {
      setValue('text', comment.text);
    } else {
      setValue('text', '');
    }
  }, [updating, comment, setValue]);

  const onSubmit = async (data) => {
    if (updating) {
      await updateComment({ commentId: comment?.id, text: data.text });
      setIsReplying(false);
      setIsUpdating(false);
    } else {
      await createComment({ postId, text: data.text, replyToId });
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
          {errors.text && (
            <Typography
              variant='subtitle2'
              sx={{ color: theme.palette.error.main }}
            >
              {errors.text.message}
            </Typography>
          )}
          <Button
            sx={{ alignSelf: 'end' }}
            type='submit'
            variant='contained'
            disabled={isPendingCreate || isPendingUpdate}
          >
            {isPendingCreate || isPendingUpdate
              ? 'Loading...'
              : updating
              ? 'Update'
              : 'Submit'}
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default PostCommentForm;
