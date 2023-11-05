/* eslint-disable react/prop-types */
import { Stack, Typography } from '@mui/material';
import { formatDate } from '../lib/utils';

const AboutCommunityWidget = ({ theme, community, membersCount }) => {
  return (
    <Stack
      sx={{
        borderRadius: '5px',
        border:
          theme.palette.mode === 'dark'
            ? '1px solid #ffffff1f'
            : '1px solid #0000001f',
        p: 2,
      }}
    >
      <Typography variant='h5'>About c/{community?.name}</Typography>
      <Typography variant='subtitle2'>
        Created {formatDate(community?.createdAt)}
      </Typography>
      <Typography variant='subtitle2'>Members: {membersCount}</Typography>
    </Stack>
  );
};

export default AboutCommunityWidget;
