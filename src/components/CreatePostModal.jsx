/* eslint-disable react/prop-types */
import {
  Button,
  Divider,
  FormLabel,
  IconButton,
  Modal,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useTheme } from '@emotion/react';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { useCreatePost, useGetCommunity } from '../lib/react-query/queries';
import { useParams } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { postSchema } from '../lib/zod/validations';

const CreatePostModal = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const theme = useTheme();
  const fileRef = useRef(null);
  const params = useParams();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(postSchema) });
  const { data: community } = useGetCommunity(params?.communityName);
  const { mutateAsync: createPost, isPending, isSuccess } = useCreatePost();

  const onSubmit = async (data) => {
    const formData = new FormData();
    const tagsArray = data.tags.split(',').map((tag) => tag.trim());
    const post = {
      title: data.title,
      content: data.content,
      tags: tagsArray,
    };

    const postBlob = new Blob([JSON.stringify(post)], {
      type: 'application/json',
    });

    formData.append('post', postBlob);

    if (data.image) {
      formData.append('image', data.image);
    }

    await createPost({
      formData,
      post: postBlob,
      image: data.image,
      communityId: community?.id,
    });

    if (isSuccess) {
      reset();
    }
    handleClose();
  };

  return (
    <>
      <Stack
        direction='row'
        sx={{
          display: 'flex',
          alignItems: 'center',
          bgcolor: theme.palette.mode === 'light' && '#fff',
          border:
            theme.palette.mode === 'dark'
              ? '1px solid #ffffff1f'
              : '1px solid #0000001f',
          width: '100%',
          cursor: 'pointer',
          borderRadius: '6px',
        }}
        onClick={handleOpen}
      >
        <Typography sx={{ ml: 2 }}>Create Post</Typography>
      </Stack>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 350,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              overflow: 'auto',
            }}
          >
            <IconButton sx={{ ml: 'auto' }} onClick={handleClose}>
              <CloseOutlinedIcon />
            </IconButton>
            <Typography sx={{ mb: 1 }} variant='h6' component='h2'>
              Create a post
            </Typography>
            <Divider />
            <FormLabel sx={{ my: 1 }}>Title</FormLabel>
            <TextField
              {...register('title')}
              size='small'
              fullWidth
              onKeyDown={(e) => {
                if (e.key === 'a') {
                  e.stopPropagation();
                }
              }}
            />
            {errors.title && (
              <Typography
                variant='subtitle2'
                sx={{ mt: 2, color: theme.palette.error.main }}
              >
                {errors.title.message}
              </Typography>
            )}
            <FormLabel sx={{ my: 1 }}>Content</FormLabel>
            <TextField
              {...register('content')}
              size='small'
              fullWidth
              onKeyDown={(e) => {
                if (e.key === 'a') {
                  e.stopPropagation();
                }
              }}
            />
            {errors.content && (
              <Typography
                variant='subtitle2'
                sx={{ mt: 2, color: theme.palette.error.main }}
              >
                {errors.content.message}
              </Typography>
            )}
            <FormLabel sx={{ my: 1 }}>Tags (separate by commas)</FormLabel>
            <TextField
              {...register('tags')}
              size='small'
              fullWidth
              onKeyDown={(e) => {
                if (e.key === 'a') {
                  e.stopPropagation();
                }
              }}
            />
            {errors.tags && (
              <Typography
                variant='subtitle2'
                sx={{ mt: 2, color: theme.palette.error.main }}
              >
                {errors.tags.message}
              </Typography>
            )}
            <FormLabel sx={{ my: 1 }}>Image (optional)</FormLabel>
            <Stack
              direction='row'
              spacing={1}
              onClick={() => fileRef.current.click()}
              sx={{
                cursor: 'pointer',
                p: 1,
                bgcolor: 'primary.main',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '6px',
              }}
            >
              <ImageOutlinedIcon />
              <Typography variant='subtitle2'>Select File</Typography>
            </Stack>
            <Controller
              control={control}
              name='image'
              render={({ field: { value, onChange, ref, ...field } }) => {
                return (
                  <input
                    {...field}
                    value={value?.fileName}
                    onChange={(e) => {
                      onChange(e.target.files[0]);
                      setSelectedFile(e.target.files[0]);
                    }}
                    ref={(e) => {
                      ref(e);
                      fileRef.current = e;
                    }}
                    hidden
                    type='file'
                  />
                );
              }}
            />
            {selectedFile && (
              <Stack sx={{ mt: 2 }}>
                <img
                  src={URL.createObjectURL(selectedFile)}
                  width={200}
                  height={200}
                />
              </Stack>
            )}
            <Button
              sx={{ alignSelf: 'start', mt: 2 }}
              type='submit'
              variant='contained'
              disabled={isPending}
            >
              {isPending ? 'Loading...' : 'Create'}
            </Button>
          </Stack>
        </form>
      </Modal>
    </>
  );
};

export default CreatePostModal;
