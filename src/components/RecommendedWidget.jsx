/* eslint-disable react/prop-types */
import { Divider, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const RecommendedWidget = ({ theme, communities }) => {
  return (
    <Stack
      direction='column'
      spacing={1}
      sx={{
        my: 2,
        p: 2,
        borderRadius: '5px',
        border:
          theme.palette.mode === 'dark'
            ? '1px solid #ffffff1f'
            : '1px solid #0000001f',
      }}
    >
      <Typography>Recommended</Typography>
      <Divider />
      {communities?.map((community) => (
        <Link
          to={`/communities/${community.name}`}
          key={community.id}
          className={theme.palette.mode === 'light' ? 'light-mode-link' : ''}
        >
          <Typography>c/{community.name}</Typography>
        </Link>
      ))}
    </Stack>
  );
};

export default RecommendedWidget;
