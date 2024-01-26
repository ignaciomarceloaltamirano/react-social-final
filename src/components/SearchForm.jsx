import { Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const SearchForm = () => {
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
        sx={(theme) => ({
          '& .MuiOutlinedInput-root': {
            color: '#3c3c43',
            borderRadius: '5px',
            '& input': {
              height: '5px',
              bgcolor: '#fff',
              borderRadius: '8px',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              border:
                theme.palette.mode === 'dark'
                  ? '1px solid primary'
                  : '1px solid #3c3c43',
            },
          },
        })}
      />
      <Button sx={{ display: 'none' }} variant='contained' type='submit'>
        Submit
      </Button>
    </form>
  );
};

export default SearchForm;
