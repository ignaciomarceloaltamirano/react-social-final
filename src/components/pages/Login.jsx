import { useForm } from 'react-hook-form';
import { Button, FormLabel, Stack, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { useLogIn } from '../../lib/react-query/queries';
import { useEffect } from 'react';

const LoginPage = () => {
  const { register, handleSubmit, reset } = useForm();
  const theme = useTheme();
  const navigate = useNavigate();

  const { mutateAsync: login, isSuccess } = useLogIn();

  const onSubmit = async (data) => {
    login(data);
    reset();
  };

  useEffect(() => {
    if (isSuccess) {
      navigate('/');
    }
  }, [isSuccess, navigate]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2} width={400} sx={{ m: 'auto' }}>
        <Typography variant='h5' textAlign='center'>
          Log In
        </Typography>
        <FormLabel>Username</FormLabel>
        <TextField
          {...register('username')}
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
        <Button type='submit' variant='contained'>
          Log in
        </Button>
        <Stack direction='row' spacing={2}>
          <Typography variant='sub'>Not registered yet?</Typography>
          <Link
            to='/register'
            className={
              theme.palette.mode === 'dark'
                ? 'auth-form-link'
                : 'light-mode-link'
            }
          >
            Register
          </Link>
        </Stack>
      </Stack>
    </form>
  );
};

export default LoginPage;
