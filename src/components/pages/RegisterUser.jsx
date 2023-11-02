import { Button, FormLabel, Stack, TextField, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTheme } from '@emotion/react';
import { Link, useNavigate } from 'react-router-dom';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { useRegisterUser } from '../../lib/react-query/queries';
import { useEffect } from 'react';

const RegisterUserPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const { register, handleSubmit, control } = useForm();
  const theme = useTheme();
  const fileRef = useRef(null);
  const navigate = useNavigate();

  const { mutateAsync: registerUser, isSuccess } = useRegisterUser();

  const onSubmit = async (data) => {
    const formData = new FormData();
    const user = {
      username: data.username,
      email: data.email,
      password: data.password,
    };

    const userBlob = new Blob([JSON.stringify(user)], {
      type: 'application/json',
    });

    formData.append('user', userBlob);

    if (data.image) {
      formData.append('image', data.image);
    }

    registerUser(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate('/login');
    }
  }, [isSuccess, navigate]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2} width={400} sx={{ m: 'auto' }}>
        <Typography variant='h5' textAlign='center'>
          Register
        </Typography>
        <FormLabel>Username</FormLabel>
        <TextField
          {...register('username')}
          size='small'
          fullWidth
          variant='outlined'
        />
        <FormLabel>Email</FormLabel>
        <TextField
          {...register('email')}
          size='small'
          fullWidth
          variant='outlined'
        />
        <FormLabel>Password</FormLabel>
        <TextField
          {...register('password')}
          size='small'
          fullWidth
          type='password'
          variant='outlined'
        />
        <FormLabel>Profile image (optional)</FormLabel>
        <Stack
          direction='row'
          spacing={1}
          onClick={() => fileRef.current.click()}
          sx={{
            cursor: 'pointer',
            p: 1,
            bgcolor: 'primary.main',
            color: theme.palette.mode === 'dark' && '#000000DE',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
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
          <img
            src={URL.createObjectURL(selectedFile)}
            width={200}
            height={200}
          />
        )}
        <Button type='submit' variant='contained'>
          Register
        </Button>
        <Stack direction='row' spacing={2}>
          <Typography variant='sub'>Already have an account?</Typography>
          <Link
            to='/login'
            className={
              theme.palette.mode === 'dark'
                ? 'auth-form-link'
                : 'light-mode-link'
            }
          >
            Log In
          </Link>
        </Stack>
      </Stack>
    </form>
  );
};

export default RegisterUserPage;
