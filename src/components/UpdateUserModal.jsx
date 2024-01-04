/* eslint-disable react/prop-types */
import {
  Button,
  FormLabel,
  Modal,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { getCurrentUser } from '../services/auth.service';
import { useUpdateUser } from '../lib/react-query/queries';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTheme } from '@emotion/react';
import { updateUserSchema } from '../lib/zod/validations';

const UpdateUserModal = ({ profileUser }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const user = getCurrentUser();
  const theme = useTheme();
  const fileRef = useRef(null);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: zodResolver(updateUserSchema) });
  const { mutateAsync: updateUser, isPending } = useUpdateUser();

  const onSubmit = async (data) => {
    const formData = new FormData();
    const user = {
      username: data?.username,
    };

    const userBlob = new Blob([JSON.stringify(user)], {
      type: 'application/json',
    });

    formData.append('user', userBlob);

    if (data?.image) {
      formData.append('image', data?.image);
    }

    updateUser(formData);
    handleClose();
  };

  return (
    <Stack sx={{ ml: 'auto' }}>
      {user?.id === profileUser?.id && (
        <Button variant='contained' onClick={handleOpen} disabled={isPending}>
          {isPending ? 'Updating...' : 'Update Info'}
        </Button>
      )}
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
              width: 400,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
            }}
            spacing={2}
          >
            <Typography variant='h5' textAlign='center'>
              Update your profile
            </Typography>
            <FormLabel>Username</FormLabel>
            <TextField
              {...register('username')}
              size='small'
              fullWidth
              variant='outlined'
              defaultValue={user?.username || ''}
            />
            {errors.username && (
              <Typography
                variant='subtitle2'
                sx={{ color: theme.palette.error.main }}
              >
                {errors.username.message}
              </Typography>
            )}
            <FormLabel>Profile image</FormLabel>
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
            {selectedFile ? (
              <img
                src={URL.createObjectURL(selectedFile)}
                width={200}
                height={200}
              />
            ) : (
              user?.imageUrl && (
                <img src={user?.imageUrl} width={200} height={200} />
              )
            )}
            {errors.image && (
              <Typography
                variant='subtitle2'
                sx={{ color: theme.palette.error.main }}
              >
                {errors.image.message}
              </Typography>
            )}
            <Button type='submit' variant='contained' disabled={isPending}>
              {isPending ? 'Updating...' : 'Update'}
            </Button>
          </Stack>
        </form>
      </Modal>
    </Stack>
  );
};

export default UpdateUserModal;
