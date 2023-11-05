import { Link, useLocation } from 'react-router-dom';
import {
  useGetCommunities,
  useGetTags,
  useSearchPosts,
} from '../../lib/react-query/queries';
import { Container, Divider, Stack, Typography, Grid } from '@mui/material';
import Loader from '../Loader';
import InfiniteScrollPosts from '../InfiniteScrollPosts';
import RecommendedWidget from '../RecommendedWidget';
import { useTheme } from '@emotion/react';

const SearchPage = () => {
  const theme = useTheme();
  const location = useLocation();
  const queryParams = new URLSearchParams(location?.search);
  const query = queryParams.get('query');
  const { data: communities } = useGetCommunities();
  const { data: tags } = useGetTags();
  const {
    data: posts,
    hasNextPage,
    fetchNextPage,
    isLoading,
  } = useSearchPosts(query);

  const arePostsFound =
    posts?.pages.map((group) => group.content).flatMap((c) => c.length) > 0;
  return (
    <Container maxWidth='lg'>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Typography sx={{ mb: 2 }} variant='h4'>
            Search for {`"${query}"`}
          </Typography>
          {isLoading ? (
            <Loader />
          ) : !arePostsFound ? (
            <Typography sx={{ mt: 2 }} variant='h5' align='center'>
              No posts found.
            </Typography>
          ) : (
            <Stack>
              <InfiniteScrollPosts
                data={posts}
                hasNextPage={hasNextPage}
                fetchNextPage={fetchNextPage}
              />
            </Stack>
          )}
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack
            direction='column'
            spacing={1}
            sx={{
              p: 2,
              border:
                theme.palette.mode === 'dark'
                  ? '1px solid #ffffff1f'
                  : '1px solid #0000001f',
            }}
          >
            <Typography>Tags</Typography>
            <Divider />
            {tags?.map((tag) => (
              <Link
                className={
                  theme.palette.mode === 'light' ? 'light-mode-link' : ''
                }
                key={tag.id}
                to={`/tags/${tag.name}`}
              >
                <Typography>#{tag.name}</Typography>
              </Link>
            ))}
          </Stack>
          <RecommendedWidget communities={communities} theme={theme} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default SearchPage;
