import { Stack } from '@mui/material';
import { TailSpin } from 'react-loader-spinner';

const Loader = () => {
  return (
    <Stack
      sx={{
        display: 'flex',
        alignItems: 'center',
        mb: 4,
      }}
    >
      <TailSpin
        height='80'
        width='80'
        color='#CDB4DB'
        ariaLabel='tail-spin-loading'
        radius='1'
        visible={true}
      />
    </Stack>
  );
};

export default Loader;
