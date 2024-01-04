/* eslint-disable react/prop-types */
import { TabPanel } from '@mui/lab';
import { Stack, Typography } from '@mui/material';
import Loader from './Loader';
import InfiniteScrollPosts from './InfiniteScrollPosts';

const CustomTabPanel = ({
  value,
  isLoading,
  data,
  fetchNextPage,
  hasNextPage,
  children,
}) => {
  const arePostsFound =
    data?.pages.map((group) => group.content).flatMap((c) => c.length) > 0;
  return (
    <TabPanel value={value}>
      <Stack>
        {isLoading ? (
          <Loader />
        ) : !arePostsFound ? (
          <Typography sx={{ my: 2 }} variant='h5' align='center'>
            No posts found.
          </Typography>
        ) : (
          <InfiniteScrollPosts
            data={data}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
          />
        )}
        {children}
      </Stack>
    </TabPanel>
  );
};

export default CustomTabPanel;
