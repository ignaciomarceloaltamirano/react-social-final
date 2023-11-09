import {
  Button,
  Container,
  FormLabel,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { useRegisterAdmin } from '../../lib/react-query/queries';
import { useNavigate } from 'react-router-dom';

const RegisterAdminPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileRef = useRef(null);
  const navigate = useNavigate();
  const { register, handleSubmit, control } = useForm();

  const { mutateAsync: registerAdmin, isSuccess } = useRegisterAdmin();

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
    registerAdmin(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate('/');
    }
  }, [isSuccess, navigate]);

  return (
    <Container maxWidth='lg'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} width={350} sx={{ m: 'auto', p: 2 }}>
          <h2>Register Admin</h2>
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
            <img
              src={URL.createObjectURL(selectedFile)}
              width={200}
              height={200}
            />
          )}
          <Button type='submit' variant='contained'>
            Register
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default RegisterAdminPage;
