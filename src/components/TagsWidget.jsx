/* eslint-disable react/prop-types */

import { Divider, Paper, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const TagsWidget = ({ tags, theme }) => {
  return (
    <Paper>
      <Stack
        direction='column'
        spacing={1}
        sx={{
          p: 2,
        }}
      >
        <Typography>Tags</Typography>
        <Divider />
        {tags?.map((tag) => (
          <Link key={tag.id} to={`/tags/${tag.name}`}>
            <Typography sx={{ color: theme.palette.text.primary }}>
              #{tag.name}
            </Typography>
          </Link>
        ))}
      </Stack>
    </Paper>
  );
};

export default TagsWidget;
