/* eslint-disable react/prop-types */
import { Stack } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import { TailSpin } from 'react-loader-spinner';
import Post from './Post';

const InfiniteScrollPosts = ({ data, fetchNextPage, hasNextPage }) => {
  return (
    <InfiniteScroll
      dataLength={data?.pages?.length || 6}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={
        <Stack
          sx={{
            display: 'flex',
            alignItems: 'center',
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
      }
      data-testid='infinite-scroll'
      scrollableTarget='scrollbar-target'
    >
      {data?.pages?.map((group, i) => (
        <div key={i}>
          {group?.content?.map((post) => (
            <Post key={post.id} post={post} community />
          ))}
        </div>
      ))}
    </InfiniteScroll>
  );
};

export default InfiniteScrollPosts;
