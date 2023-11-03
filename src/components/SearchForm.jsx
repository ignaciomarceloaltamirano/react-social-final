import { Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

const SearchForm = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { handleSubmit, register, reset } = useForm();

  const onSubmit = (data) => {
    navigate(`/search?query=${data.query}`);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        {...register('query')}
        placeholder='Search posts...'
        variant='outlined'
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '25px',
            color: '#000000de',
            '& input': {
              height: '5px',
              bgcolor: '#fff',
              borderRadius: '25px',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              border:
                theme.palette.mode === 'dark'
                  ? '1px solid primary'
                  : '1px solid #000000de',
            },
          },
        }}
      />
      <Button sx={{ display: 'none' }} variant='contained' type='submit'>
        Submit
      </Button>
    </form>
  );
};

export default SearchForm;
