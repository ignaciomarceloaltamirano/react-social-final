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
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { useParams } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { useGetPost, useUpdatePost } from '../lib/react-query/queries';

const UpdatePostModal = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const fileRef = useRef(null);
  const params = useParams();
  const postId = params?.postId;
  const { data: post } = useGetPost(postId);
  const { register, handleSubmit, control, reset } = useForm();
  const { mutateAsync: updatePost, status, isPending } = useUpdatePost();

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

    await updatePost({
      formData,
      post: postBlob,
      image: data.image,
      postId,
    });

    if (status === 'success') {
      reset();
      handleClose();
    }
  };

  return (
    <>
      <IconButton
        sx={{ borderRadius: '5px' }}
        onClick={(e) => {
          e.stopPropagation();
          handleOpen();
        }}
      >
        <EditIcon />
      </IconButton>
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
              Update Post
            </Typography>
            <Divider />
            <FormLabel sx={{ my: 1 }}>Title</FormLabel>
            <TextField
              {...register('title')}
              size='small'
              fullWidth
              defaultValue={post?.title}
              onKeyDown={(e) => {
                if (e.key === 'a') {
                  e.stopPropagation();
                }
              }}
            />
            <FormLabel sx={{ my: 1 }}>Content</FormLabel>
            <TextField
              {...register('content')}
              size='small'
              fullWidth
              defaultValue={post?.content}
              onKeyDown={(e) => {
                if (e.key === 'a') {
                  e.stopPropagation();
                }
              }}
            />
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
            <FormLabel sx={{ my: 1 }}>Image (optional)</FormLabel>
            <Stack
              direction='row'
              spacing={1}
              onClick={() => {
                fileRef.current.click();
              }}
              sx={{
                cursor: 'pointer',
                p: 1,
                bgcolor: 'primary.main',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '6px',
                zIndex: 10,
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
            <Stack sx={{ mt: selectedFile || post?.imageUrl ? 2 : 0 }}>
              {selectedFile ? (
                <img
                  src={URL.createObjectURL(selectedFile)}
                  width={200}
                  height={200}
                />
              ) : (
                post?.imageUrl && (
                  <img src={post?.imageUrl} width={200} height={200} />
                )
              )}
            </Stack>
            <Button
              sx={{ alignSelf: 'start', mt: 2 }}
              type='submit'
              variant='contained'
            >
              {isPending ? 'Updating...' : 'Update'}
            </Button>
          </Stack>
        </form>
      </Modal>
    </>
  );
};

export default UpdatePostModal;
