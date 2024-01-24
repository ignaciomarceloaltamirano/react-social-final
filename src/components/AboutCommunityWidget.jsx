/* eslint-disable react/prop-types */
import { Paper, Stack, Typography } from '@mui/material';
import { formatDate } from '../lib/utils';

const AboutCommunityWidget = ({ community, membersCount }) => {
  return (
    <Paper>
      <Stack
        sx={{
          p: 2,
        }}
      >
        <Typography variant='h5'>About c/{community?.name}</Typography>
        <Typography variant='subtitle2'>
          Created {formatDate(community?.createdAt)}
        </Typography>
        <Typography variant='subtitle2'>Members: {membersCount}</Typography>
      </Stack>
    </Paper>
  );
};

export default AboutCommunityWidget;
